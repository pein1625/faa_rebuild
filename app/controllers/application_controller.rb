class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def popular_courses
    @popular_courses = Course.popular
  end

  def latest_news
    @latest_news = News.newest.first Settings.news.latest_news
  end

  def popular_tags
    @popular_tags = News.popular_tags
  end
end
