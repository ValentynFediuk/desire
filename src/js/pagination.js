const input = document.querySelector('input[name="search"]');
const postsPerPage = 4;
const allPosts = Array.from(document.querySelectorAll('.blog__post[data-tags]'));
const pagination = document.querySelector('.pagination');
const sidebarItems = document.querySelectorAll('.sidebar__categories-list-item');

// Make these variables global so they can be accessed by tags.js
window.currentPage = 1;
window.filteredPosts = [...allPosts]; // всі спочатку

// --- Функції showPage, createPagination, updateSidebarCounts, sidebarItems click — твої, без змін

// Make showPage function global so it can be accessed by tags.js
window.showPage = function(page, postsToShow = window.filteredPosts) {
  const start = (page - 1) * postsToShow.length > 0 ? (page - 1) * postsPerPage : 0;
  const end = start + postsPerPage;

  allPosts.forEach(post => (post.style.display = 'none'));
  postsToShow.slice(start, end).forEach(post => (post.style.display = 'block'));

  const links = pagination.querySelectorAll('a');
  links.forEach(link => link.classList.remove('active'));
  links.forEach(link => {
    if (parseInt(link.textContent) === page) {
      link.classList.add('active');
    }
  });
}

// Make createPagination function global so it can be accessed by tags.js
window.createPagination = function(postsToPaginate = window.filteredPosts) {
  pagination.innerHTML = '';
  const totalPages = Math.ceil(postsToPaginate.length / postsPerPage);

  if (totalPages <= 1) return;

  const prev = document.createElement('li');
  prev.innerHTML = `<a href="#prev">&laquo;</a>`;
  prev.addEventListener('click', e => {
    e.preventDefault();
    if (window.currentPage > 1) {
      window.currentPage--;
      window.showPage(window.currentPage, postsToPaginate);
    }
  });
  pagination.appendChild(prev);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${i}`;
    a.textContent = i;
    if (i === window.currentPage) a.classList.add('active');
    a.addEventListener('click', e => {
      e.preventDefault();
      window.currentPage = i;
      window.showPage(window.currentPage, postsToPaginate);
    });
    li.appendChild(a);
    pagination.appendChild(li);
  }

  const next = document.createElement('li');
  next.innerHTML = `<a href="#next">&raquo;</a>`;
  next.addEventListener('click', e => {
    e.preventDefault();
    if (window.currentPage < totalPages) {
      window.currentPage++;
      window.showPage(window.currentPage, postsToPaginate);
    }
  });
  pagination.appendChild(next);
}

function updateSidebarCounts() {
  const countMap = {};
  let totalCount = 0;

  allPosts.forEach(post => {
    const tags = post.dataset.tags;
    // Use the first tag as the primary category
    const primaryTag = tags ? tags.split(',')[0].trim() : '';
    countMap[primaryTag] = (countMap[primaryTag] || 0) + 1;
    totalCount++;
  });

  const counters = document.querySelectorAll('.sidebar__categories-list-item-count');

  counters.forEach(counter => {
    const tag = counter.dataset.kind; // Keep using dataset.kind for backward compatibility
    if (tag === '') {
      counter.textContent = `(${totalCount})`;
    } else {
      const count = countMap[tag] || 0;
      counter.textContent = `(${count})`;
    }
  });
}

sidebarItems.forEach(item => {
  item.addEventListener('click', () => {
    const span = item.querySelector('.sidebar__categories-list-item-count');
    const category = span?.dataset.kind; // Keep using dataset.kind for backward compatibility

    if (!category) {
      window.filteredPosts = [...allPosts];
    } else {
      window.filteredPosts = allPosts.filter(post => {
        // Check if the category is included in the comma-separated tags
        const tags = post.dataset.tags ? post.dataset.tags.toLowerCase().split(',').map(t => t.trim()) : [];
        return tags.includes(category.toLowerCase());
      });
    }

    window.currentPage = 1;
    window.createPagination(window.filteredPosts);
    window.showPage(window.currentPage, window.filteredPosts);

    sidebarItems.forEach(el => el.classList.remove('active'));
    item.classList.add('active');

    // Очищуємо пошук, бо ми змінили категорію
    input.value = '';

    // Clear tag selection
    const tagItems = document.querySelectorAll('.sidebar__tags-list-item');
    tagItems.forEach(el => el.classList.remove('active'));
  });
});

// ** Ось сюди в ланцюжок пошуку додаємо пагінацію **
input.addEventListener('input', () => {
  const filter = input.value.toLowerCase();

  // Фільтруємо за заголовком
  window.filteredPosts = allPosts.filter(post => {
    const title = post.querySelector('h2.blog__post-title');
    if (!title) return false;
    return title.textContent.toLowerCase().includes(filter);
  });

  window.currentPage = 1;
  window.createPagination(window.filteredPosts);
  window.showPage(window.currentPage, window.filteredPosts);

  // Якщо хочеш — можна скинути вибір категорії
  sidebarItems.forEach(el => el.classList.remove('active'));

  // Clear tag selection
  const tagItems = document.querySelectorAll('.sidebar__tags-list-item');
  tagItems.forEach(el => el.classList.remove('active'));
  // Інакше, якщо хочеш, щоб категорія залишалась — треба поєднати фільтрацію категорії+пошуку
});

updateSidebarCounts();
window.createPagination();
window.showPage(window.currentPage);
