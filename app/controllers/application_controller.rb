class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  layout :layout_by_resource
  before_action :load_courses

  def popular_courses
    @popular_courses = CourseSchedule.popular
  end

  def latest_news
    @latest_news = News.newest.first Settings.news.latest_news
  end

  def popular_tags
    @popular_tags = News.popular_tags
  end

  def load_courses
    @courses = Course.all
  end

  private

  def layout_by_resource
    if devise_controller?
      "application_devise"
    else
      "application"
    end
  end
end
