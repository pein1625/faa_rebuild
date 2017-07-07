$(document).ready(function(){
  setInterval(function() {
    $('.tp-rightarrow').click();
  }, 7000);

  scaleCourseItem();
});

function scaleCourseItem() {
  $('.lastest-courses-container').find('.index-detail-course').each(function() {
    var courseItemHeight = $(this).height();
    var imageHeight = $(this).find('.tt-cours-img').outerHeight();
    var footerHeight = $(this).find('.tt-cours-bottom').outerHeight();
    var infoHeight = courseItemHeight - imageHeight - footerHeight;
    $(this).find('.tt-cours-info').outerHeight(infoHeight);
  });
}
