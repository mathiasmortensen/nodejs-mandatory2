<script>
  const raccoonImages = [
    "raccoon1.jpg",
    "raccoon2.jpg",
    "raccoon3.jpg",
    "raccoon4.jpg",
    "raccoon5.jpg",
    "raccoon6.jpg",
    "raccoon7.webp",
    "raccoon8.jpg",
    "raccoon9.webp",
    "raccoon10.JPG",
  ];
</script>

<svelte:head>
  <title>Vaskebjørn</title>
</svelte:head>

<div class="profile-page">
  <div class="profile-card">
    <h1>Vaskebjørnen</h1>

    <p>
      I Europa er det ulovligt at eje en vaskebjørn. Vaskebjørne bliver set som
      pesten selv...
    </p>

    {#each raccoonImages as image, index}
      <img src={`/${image}`} alt={`Raccoon ${index + 1}`} />
    {/each}
  </div>
</div>
