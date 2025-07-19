const sidebar = document.querySelector('.sidebar');
const menuBtn = document.querySelector('.header__menu-btn');
const body = document.querySelector('body');
menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  body.classList.toggle('lock-scroll');
})