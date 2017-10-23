/**
 * Created by Administrator on 2017/8/24.
 */
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 30,
    keyboardControl: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    autoplay : 1500,
    loop : true,
    autoplayDisableOnInteraction : false
});