// 1. Збираємо всі пости з data-kind
const posts = document.querySelectorAll('.blog__post[data-kind]');
// 2. Рахуємо скільки яких kind
const countMap = {};

posts.forEach(post => {
  const kind = post.dataset.kind;
  if (countMap[kind]) {
    countMap[kind]++;
  } else {
    countMap[kind] = 1;
  }
});

// 3. Вставляємо кількість у відповідні елементи лічильників
const counters = document.querySelectorAll('.sidebar__categories-list-item-count');

counters.forEach(counter => {
  const kind = counter.dataset.kind;
  const count = countMap[kind] || 0;
  counter.textContent = `(${count})`;
});


// 2. Всі елементи в сайдбарі
const sidebarItems = document.querySelectorAll('.sidebar__categories-list-item');

// 3. Вішаємо слухачів на кожен пункт сайдбару
sidebarItems.forEach(item => {
  item.addEventListener('click', () => {
    // Беремо span з data-kind всередині
    const span = item.querySelector('.sidebar__categories-list-item-count');
    const kind = span?.dataset.kind;

    if (!kind) return;

    // 🔄 Фільтрація постів
    posts.forEach(post => {
      if (post.dataset.kind === kind) {
        post.style.display = 'block'; // показуємо
      } else {
        post.style.display = 'none'; // ховаємо
      }
    });

    // 🎯 Виділяємо активний пункт в сайдбарі
    sidebarItems.forEach(el => el.classList.remove('active'));
    item.classList.add('active');
  });
});

const allCount = document.querySelector('.sidebar__categories-list-item-count-all').textContent = `(${posts.length})`

