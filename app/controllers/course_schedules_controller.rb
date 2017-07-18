class CourseSchedulesController < ApplicationController
  before_action :popular_courses
  before_action :find_schedule, only: :show

  def index
    if course_id = params[:course_id]
      @course_schedules = CourseSchedule.load_by_course(course_id)
        .page(params[:page]).per Settings.course_schedules.per_page
    else
      @course_schedules = CourseSchedule.newest.page(params[:page])
        .per Settings.course_schedules.per_page
    end
  end

  def show
  end

  private

  def find_schedule
    return if @course_schedule = CourseSchedule.includes(:course).find_by(id: params[:id])
    flash[:danger] = t ".not_found"
    redirect_to root_path
  end
end
