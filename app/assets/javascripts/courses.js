$(document).ready(function() {
  filterByCategory();
  scaleCourseItem();
  searchCourse();
  $('.tt-searchbar-view[data-view="list"').on('click', function() {
    $('.tt-cours-info').css({'width':'', 'height':'', 'top': '', 'left':''});
  });
});

function filterByCategory() {
  $('.course-category').on('click', function() {
    var category_name = $(this).text();
    $.ajax({
      url: '/courses',
      type:'GET',
      dataType:'json',
      data: {course_category: category_name},
      complete: function(xhr){
        var html_text = xhr.responseText;
        $('.contain-courses').html(html_text);
        scaleCourseItem();
      }
    });    
  });
}

function scaleCourseItem() {
  $('.contain-courses').find('.tt-cours').each(function() {
    var courseItemHeight = $(this).height();
    var imageHeight = $(this).find('.tt-cours-img').outerHeight();
    var footerHeight = $(this).find('.tt-cours-bottom').outerHeight();
    var infoHeight = courseItemHeight - imageHeight - footerHeight;
    $(this).find('.tt-cours-info').outerHeight(infoHeight);
  });
}

function searchCourse() {
  $('#search-input').keyup(function(){
    var textSearch = $(this).val();
    if(textSearch.length > 0 && textSearch.length < 255) {
      $.ajax({
        url: '/courses',
        type:'GET',
        dataType:'json',
        data: {words: textSearch},
        complete: function(xhr){
          var html_text = xhr.responseText;
          $('.contain-courses').html(html_text);
          resetCourseCss();
        }
      });  
    }
  });
}

function resetCourseCss() {
  var option = $('.tt-seachbar-content').data('view');
  if(option == "grid") {
    scaleCourseItem();
  } else {
    $('.tt-cours-info').css({'width':'', 'height':'', 'top': '', 'left':''});
  }
}
