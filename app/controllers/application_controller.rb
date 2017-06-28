class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  before_action :list_course_categories
  layout :layout_by_resource

  def popular_courses
    @popular_courses = Course.popular
  end

  def latest_news
    @latest_news = News.newest.first Settings.news.latest_news
  end

  def popular_tags
    @popular_tags = News.popular_tags
  end

  private

  def list_course_categories
    @course_categories = CourseCategory.all
  end

  def layout_by_resource
    if devise_controller?
      "application_devise"
    else
      "application"
    end
  end
end
