const tabs = document.querySelectorAll('.gallery__nav-list-item');
const contents = document.querySelectorAll('.gallery__images');

let activeTab = document.querySelector('.gallery__images.active');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const tabId = tab.dataset.tab;
    const nextTab = document.querySelector(`.gallery__images[data-tab="${tabId}"]`);

    if (tab.classList.contains('active') || nextTab === activeTab) return;

    // Перемикаємо активний таб у навігації
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Анімація приховування поточного
    if (activeTab) {
      anime({
        targets: activeTab,
        opacity: [1, 0],
        duration: 400,
        easing: 'easeInOutQuad',
        complete: () => {
          activeTab.style.display = 'none';
          activeTab.classList.remove('active');

          // Показуємо новий таб
          nextTab.style.display = 'grid';
          nextTab.style.opacity = 0;
          nextTab.classList.add('active');

          anime({
            targets: nextTab,
            opacity: [0, 1],
            duration: 400,
            easing: 'easeInOutQuad'
          });

          activeTab = nextTab;
        }
      });
    } else {
      // Якщо ще нічого не було відкрито
      nextTab.style.display = 'grid';
      nextTab.style.opacity = 0;
      nextTab.classList.add('active');

      anime({
        targets: nextTab,
        opacity: [0, 1],
        duration: 400,
        easing: 'easeInOutQuad'
      });

      activeTab = nextTab;
    }
  });
});
