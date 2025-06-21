const input = document.querySelector('input[name="search"]');

input.addEventListener("input", () => {
  const filter = input.value.toLowerCase();

  document.querySelectorAll(".blog__post-list .blog__post").forEach(post => {
    const titleElement = post.querySelector("h2.blog__post-title");

    // Якщо нема заголовка — ну нафіг, ховаєм
    if (!titleElement) {
      post.style.display = "none";
      return;
    }

    const titleText = titleElement.textContent.toLowerCase();
    post.style.display = titleText.includes(filter) ? "" : "none";
  });
});
