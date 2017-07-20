$(document).ready(function() {
  
  /** Slider Image **/
  $('.js-slide').slick({
    autoplay: true,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
  });

  /** Slider Class **/

  $('.js-class').slick({
    autoplay: false,
    arrows: true,
    dots: true,
    infinite: true,
    speed:700,
    slidesToShow: 4,
    slidesToScroll: 2,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  /** Slider Partner **/

  $('.js-partner').slick({
    autoplay: true,
    arrows: false,
    dots: false,
    infinite: true,
    speed:500,
    slidesToShow: 6,
    slidesToScroll: 2,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });

  $('.js-ontop').click(function(){
  	$('html, body').animate({scrollTop:0}, '2000');
  	return false;
  });
});