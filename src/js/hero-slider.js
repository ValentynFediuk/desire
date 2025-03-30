import $ from 'jquery';
import 'slick-carousel';

document.addEventListener('DOMContentLoaded', () => {
  $('.hero__slider').slick({
    // autoplay: true,
    // autoplaySpeed: 3000,
    dots: true,
    arrows: false,
    infinite: true,
  });
});