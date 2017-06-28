class CoursesController < ApplicationController
  before_action :load_course, only: :show
  before_action :load_all_course_category
  before_action :popular_courses
  before_action :latest_news
  before_action :popular_tags

  def index
    @courses = load_course_by_category || load_by_search_word || load_course_default

    respond_to do |format|
      format.html
      format.js {render @courses, layout: false}
    end
  end

  def show; end

  private

  def load_course
    @course = Course.includes(:course_category, :images).find_by id: params[:id]
    return if @course
    flash[:error] = t ".not_found"
    redirect_to courses_path
  end

  def load_all_course_category
    @course_categories = CourseCategory.all
  end

  def load_course_default
    Course.includes(:images, :course_category).newest.page(params[:page])
      .per Settings.courses.per_page
  end

  def load_course_by_category
    category = CourseCategory.find_by name: params[:course_category]
    return unless category
    category.courses.includes(:images).page(params[:page])
      .per Settings.courses.per_page
  end

  def load_by_search_word
    Course.by_words(params[:words]).page(params[:page])
      .per Settings.courses.per_page if params[:words]
  end
end
