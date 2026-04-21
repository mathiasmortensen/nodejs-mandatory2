import db from './connection.js'
import bcrypt from 'bcryptjs'

const deleteMode = process.argv.includes('--delete')

if (deleteMode) {
  await db.exec(`DROP TABLE IF EXISTS users`)
}

await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`)

const testEmail = process.env.testEmail
const testUsername = process.env.testUsername
const testPassword = process.env.testPassword

const hash = await bcrypt.hash(testPassword, 10)

db.prepare(
  `
  INSERT OR IGNORE INTO users (email, username, password_hash)
  VALUES (?, ?, ?)
`
).run(testEmail, testUsername, hash)

console.log('Seeding er kørt er kørt..')
