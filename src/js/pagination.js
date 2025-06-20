const postsPerPage = 4; // Скільки постів на 1 сторінці
const posts = document.querySelectorAll('.blog__post');
const pagination = document.querySelector('.pagination');

let currentPage = 1;
const totalPages = Math.ceil(posts.length / postsPerPage);

function showPage(page) {
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;

  posts.forEach((post, i) => {
    post.style.display = (i >= start && i < end) ? 'block' : 'none';
  });

  const links = pagination.querySelectorAll('a');
  links.forEach(link => link.classList.remove('active'));
  links.forEach(link => {
    if (parseInt(link.textContent) === page) {
      link.classList.add('active');
    }
  });
}

function createPagination() {
  pagination.innerHTML = ''; // очищаємо старе

  // Створюємо "назад"
  const prev = document.createElement('li');
  prev.innerHTML = `<a href="#prev">&laquo;</a>`;
  prev.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  });
  pagination.appendChild(prev);

  // Створюємо сторінки
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${i}`;
    a.textContent = i;
    if (i === currentPage) a.classList.add('active');
    a.addEventListener('click', (e) => {
      e.preventDefault();
      currentPage = i;
      showPage(currentPage);
    });
    li.appendChild(a);
    pagination.appendChild(li);
  }

  // Створюємо "вперед"
  const next = document.createElement('li');
  next.innerHTML = `<a href="#next">&raquo;</a>`;
  next.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  });
  pagination.appendChild(next);
}

// Ініціалізація
createPagination();
showPage(currentPage);
