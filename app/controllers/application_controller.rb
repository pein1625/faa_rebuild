class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  layout :layout_by_resource
  before_action :load_courses
  before_action :latest_news

  before_action :set_locale

  def set_locale
    I18n.locale = params[:locale] || session[:locale] || I18n.default_locale
    session[:locale] = I18n.locale
  end

  def popular_courses
    @popular_courses = Course.popular
  end

  def latest_news
    @latest_news = News.newest.first Settings.news.latest_news
  end

  def load_courses
    @courses = Course.all
  end

  def handle_record_not_found
    flash[:danger] = t ".not_found"
    redirect_to root_path
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
