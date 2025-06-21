const allPosts = Array.from(document.querySelectorAll('.blog__post'));
let filteredPosts = [...allPosts];
let currentPage = 1; // стартуємо з першої сторінки

const tagItems = document.querySelectorAll('.sidebar__tags-list-item');

tagItems.forEach(tagItem => {
  tagItem.style.cursor = 'pointer';

  tagItem.addEventListener('click', () => {
    const tagTextRaw = tagItem.textContent.trim();
    const normalizedTag = tagTextRaw.toLowerCase().replace(/\s+/g, '-');

    filteredPosts = allPosts.filter(post => {
      const tags = post.dataset.tags ? post.dataset.tags.toLowerCase().split(',').map(t => t.trim()) : [];
      return tags.includes(normalizedTag);
    });

    currentPage = 1; // скидаємо на 1 сторінку
    createPagination(filteredPosts);
    showPage(currentPage, filteredPosts);

    tagItems.forEach(el => el.classList.remove('active'));
    tagItem.classList.add('active');

    input.value = '';
    sidebarItems.forEach(el => el.classList.remove('active'));
  });
});
