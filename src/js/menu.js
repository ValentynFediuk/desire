import $ from "jquery";

const menu = $('.mobile-menu');
const menuBtn = $('.header__menu-btn');

menuBtn.on('click', () => {
    menu.stop(true, true).slideToggle();
});
