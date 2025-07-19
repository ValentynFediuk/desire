// This file now only handles counting the number of posts for each category
// The filtering functionality is handled by pagination.js

// 1. Збираємо всі пости з data-tags
const posts = document.querySelectorAll('.blog__post[data-tags]');
// 2. Рахуємо скільки яких tags (using first tag as primary category)
const countMap = {};

posts.forEach(post => {
  const tags = post.dataset.tags;
  // Use the first tag as the primary category
  const primaryTag = tags ? tags.split(',')[0].trim() : '';
  if (countMap[primaryTag]) {
    countMap[primaryTag]++;
  } else {
    countMap[primaryTag] = 1;
  }
});

// 3. Вставляємо кількість у відповідні елементи лічильників
const counters = document.querySelectorAll('.sidebar__categories-list-item-count');

counters.forEach(counter => {
  const category = counter.dataset.kind; // Keep using dataset.kind for backward compatibility
  const count = countMap[category] || 0;
  counter.textContent = `(${count})`;
});

// Set the count for "All" category
const allCount = document.querySelector('.sidebar__categories-list-item-count-all');
if (allCount) {
  allCount.textContent = `(${posts.length})`;
}

// The filtering functionality has been moved to pagination.js
// to avoid conflicts and ensure proper integration with pagination
