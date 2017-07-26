class CourseSchedulesController < ApplicationController
  before_action :popular_courses
  before_action :find_schedule, only: :show

  def index
    find_course && return if params[:course]
    @course_schedules = CourseSchedule.newest.page(params[:page])
      .per Settings.course_schedules.per_page
  end

  def show
  end

  private

  def find_schedule
    @course_schedule = CourseSchedule.includes(:course).friendly.find params[:id]
  rescue ActiveRecord::RecordNotFound
    handle_record_not_found
  end

  def find_course
    course = Course.friendly.find params[:course]
    @course_schedules = CourseSchedule.load_by_course(course.id)
      .page(params[:page]).per Settings.course_schedules.per_page
  rescue ActiveRecord::RecordNotFound
    handle_record_not_found
  end
end
