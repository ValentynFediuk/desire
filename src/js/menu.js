import $ from "jquery";

const menu = $('.mobile-menu');
const menuBtn = $('.header__menu-btn');

menuBtn.on('click', () => {
    menu.stop(true, true).slideToggle();
});

const menuItems  = $('.header nav a');
const currentPage = window.location.href.split("/")[window.location.href.split("/").length - 1]
menuItems.each((index, item) => {
    $(item).removeClass('active');
    if (currentPage ===  $(item).attr("href")) {
        $(item).addClass('active');
    };
})

