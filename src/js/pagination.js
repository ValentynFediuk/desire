const input = document.querySelector('input[name="search"]');
const postsPerPage = 4;
const allPosts = Array.from(document.querySelectorAll('.blog__post[data-kind]'));
const pagination = document.querySelector('.pagination');
const sidebarItems = document.querySelectorAll('.sidebar__categories-list-item');

let currentPage = 1;
let filteredPosts = [...allPosts]; // всі спочатку

// --- Функції showPage, createPagination, updateSidebarCounts, sidebarItems click — твої, без змін

function showPage(page, postsToShow = filteredPosts) {
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

function createPagination(postsToPaginate = filteredPosts) {
  pagination.innerHTML = '';
  const totalPages = Math.ceil(postsToPaginate.length / postsPerPage);

  if (totalPages <= 1) return;

  const prev = document.createElement('li');
  prev.innerHTML = `<a href="#prev">&laquo;</a>`;
  prev.addEventListener('click', e => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage, postsToPaginate);
    }
  });
  pagination.appendChild(prev);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${i}`;
    a.textContent = i;
    if (i === currentPage) a.classList.add('active');
    a.addEventListener('click', e => {
      e.preventDefault();
      currentPage = i;
      showPage(currentPage, postsToPaginate);
    });
    li.appendChild(a);
    pagination.appendChild(li);
  }

  const next = document.createElement('li');
  next.innerHTML = `<a href="#next">&raquo;</a>`;
  next.addEventListener('click', e => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage, postsToPaginate);
    }
  });
  pagination.appendChild(next);
}

function updateSidebarCounts() {
  const countMap = {};
  let totalCount = 0;

  allPosts.forEach(post => {
    const kind = post.dataset.kind;
    countMap[kind] = (countMap[kind] || 0) + 1;
    totalCount++;
  });

  const counters = document.querySelectorAll('.sidebar__categories-list-item-count');

  counters.forEach(counter => {
    const kind = counter.dataset.kind;
    if (kind === '') {
      counter.textContent = `(${totalCount})`;
    } else {
      const count = countMap[kind] || 0;
      counter.textContent = `(${count})`;
    }
  });
}

sidebarItems.forEach(item => {
  item.addEventListener('click', () => {
    const span = item.querySelector('.sidebar__categories-list-item-count');
    const kind = span?.dataset.kind;

    if (!kind) {
      filteredPosts = [...allPosts];
    } else {
      filteredPosts = allPosts.filter(post => post.dataset.kind === kind);
    }

    currentPage = 1;
    createPagination(filteredPosts);
    showPage(currentPage, filteredPosts);

    sidebarItems.forEach(el => el.classList.remove('active'));
    item.classList.add('active');

    // Очищуємо пошук, бо ми змінили категорію
    input.value = '';
  });
});

// ** Ось сюди в ланцюжок пошуку додаємо пагінацію **
input.addEventListener('input', () => {
  const filter = input.value.toLowerCase();

  // Фільтруємо за заголовком
  filteredPosts = allPosts.filter(post => {
    const title = post.querySelector('h2.blog__post-title');
    if (!title) return false;
    return title.textContent.toLowerCase().includes(filter);
  });

  currentPage = 1;
  createPagination(filteredPosts);
  showPage(currentPage, filteredPosts);

  // Якщо хочеш — можна скинути вибір категорії
  sidebarItems.forEach(el => el.classList.remove('active'));
  // Інакше, якщо хочеш, щоб категорія залишалась — треба поєднати фільтрацію категорії+пошуку
});

updateSidebarCounts();
createPagination();
showPage(currentPage);
