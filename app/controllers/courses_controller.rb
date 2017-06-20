class CoursesController < ApplicationController
  def index
    @courses = load_course_by_category || load_by_search_word || load_course_default
    @course_categories = CourseCategory.all

    respond_to do |format|
      format.html
      format.js {render @courses, layout: false}
    end
  end

  def show
  end

  private

  def load_course_default
    Course.includes(:images, :course_category).newest.page(params[:page])
      .per Settings.courses.per_page
  end

  def load_course_by_category
    category = CourseCategory.find_by name: params[:course_category]
    return unless category
    category.courses.includes(:images)
  end

  def load_by_search_word
    Course.by_words(params[:words]) if params[:words]
  end
end
