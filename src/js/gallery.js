const tabs = document.querySelectorAll('.gallery__nav-list-item');
const contents = document.querySelectorAll('.gallery__images');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const tabId = tab.dataset.tab;

    // знімаємо активність з усіх
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    // активуємо обране
    tab.classList.add('active');
    document.querySelector(`.gallery__images[data-tab="${tabId}"]`).classList.add('active');
  });
});
