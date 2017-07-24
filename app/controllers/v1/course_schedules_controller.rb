class V1::CourseSchedulesController < V1::ApiController
  before_action :load_course_schedule, only: [:destroy, :edit, :update]

  def index
    course_schedules = CourseSchedule.page(page).per Settings.admin_page.per_page
    schedule_serialize = ActiveModel::SerializableResource
      .new(course_schedules, each_serializer: CourseScheduleSerializer)
    response_success nil, {course_schedules: schedule_serialize, page: page,
      pages: course_schedules.total_pages}
  end

  def destroy
    if @course_schedule.destroy
      response_success nil, @course_schedule
    else
      response_error t(".delete_failed"), nil
    end
  end

  def edit
    response_success nil, {course_schedule: @course_schedule, courses: Course.all,
      day_of_week: day_of_week}
  end

  def update
    if @course_schedule.update_attributes(course_schedule_params)
      response_success t(".save_success"), @course_schedule
    else
      response_error t(".save_failed"), @course_schedule.errors.full_messages
    end
  end

  def new
    response_success nil, {courses: Course.all, day_of_week: day_of_week}
  end

  def create
    @course_schedule = CourseSchedule.new course_schedule_params
    if @course_schedule.save
      response_success t(".save_success"), @course_schedule
    else
      response_error t(".save_failed"), @course_schedule.errors.full_messages
    end
  end

  private

  def course_schedule_params
    params.permit :start_date, :end_date, :deadline_date, :course_id, :start_time1,
      :end_time1, :day1, :start_time2, :end_time2, :day2, :start_time3, :end_time3,
      :day3
  end

  def load_course_schedule
    return if @course_schedule = CourseSchedule.find_by(id: params[:id])
    response_not_found t(".not_found"), nil
  end

  def day_of_week
    CourseSchedule::DAY_OF_WEEK.map.with_index do |x, i|
      [i, I18n.t("day_of_week.#{x}")]
    end.to_h
  end
end
