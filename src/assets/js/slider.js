
 setTimeout(function () {
      var swiper = new Swiper('.swiper-container1', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 250,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: '',
        },
        autoplay: {
          delay: 3000, 
        }, 
      });
    }, 3000);
