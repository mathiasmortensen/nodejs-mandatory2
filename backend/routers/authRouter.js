import { Router } from 'express'
import db from '../db/connection.js'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'

const router = Router()

function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    return next()
  }
  return res.status(401).send({ errorMessage: 'Ingen adgang...' })
}

router.post('/signup', async (req, res) => {
  const { email, username, password } = req.body
  const saltRounds = 10

  if (!email || !username || !password) {
    return res.status(400).send('Alle felter skal udfyldes!!')
  }

  try {
    const hash = await bcrypt.hash(password, saltRounds)

    const result = db
      .prepare(
        `
INSERT INTO users (email, username, password_hash)
VALUES (?, ?, ?)
`
      )
      .run(email, username, hash)

    req.session.userId = Number(result.lastInsertRowid)
    return res.status(201).send('Bruger oprettet')
  } catch (error) {
    console.log(error)
    res.status(500).send('Der skete en fejl under oprettelsen af din bruger')
  }
})

router.post('/login', async (req, res) => {
  const { identifier, password } = req.body

  if (!identifier || !password) {
    return res.status(400).send('Alle felter skal udfyldes!!!')
  }

  try {
    const users = db
      .prepare(`SELECT * FROM users WHERE email = ? OR username = ?`)
      .all(identifier, identifier)

    if (users.length === 0) {
      return res.status(401).send('Forkert email/username eller password')
    }

    const user = users[0]
    const found = await bcrypt.compare(password, user.password_hash)

    if (!found) {
      return res.status(401).send('Forkert email/username eller password')
    }

    req.session.userId = user.id
    return res.status(200).send('Login successful')
  } catch (error) {
    console.log(error)
    return res.status(500).send('Der skete en fejl..')
  }
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err)
      return res.status(500).send('Der skete en fejl under logout')
    }
    res.clearCookie('connect.sid')
    return res.status(200).send('Logout successful')
  })
})

router.get('/me', isAuthenticated, async (req, res) => {
  try {
    const user = db
      .prepare(`SELECT id, email, username FROM users WHERE id = ?`)
      .get(req.session.userId)

    if (!user) {
      return res.status(404).send('Bruger ikke fundet')
    }

    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).send('Der skete desværre en fejl...')
  }
})

router.post('/forgot-password', async (req, res) => {
  const { identifier } = req.body

  if (!identifier) {
    return res.status(400).json({ besked: 'Alle felter skal udfyldes' })
  }

  try {
    const user = identifier.includes('@')
      ? db.prepare(`SELECT email FROM users WHERE email = ?`).get(identifier)
      : db.prepare(`SELECT email FROM users WHERE username = ?`).get(identifier)

    if (!user) {
      return res.status(200).json({ besked: 'Hvis brugeren findes, er der sendt en mail' })
    }

    const testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })

    await transporter.sendMail({
      from: 'Mandatory2 awesome siden',
      to: user.email,
      subject: 'Glemt kodeord!!',
      text: 'Reset link: (hint det virker ikke)...',
      html: 'Mail sendt💌',
    })

    return res.status(200).json({ besked: 'Hvis brugeren findes, er der sendt en mail' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ besked: 'En fejl opstod..' })
  }
})

export default router
