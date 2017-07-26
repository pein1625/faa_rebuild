class V1::RegistrationCoursesController < V1::ApiController
  before_action :load_registration_course, only: [:destroy, :update]
  before_action :peding_registration_filter, only: :update

  def index
    search_word = params[:query] || ""
    courses = Course.all
    course_id = params[:course_id].to_i
    course_schedules = CourseSchedule.where(course_id: course_id)
    course_schedule_id = params[:course_schedule_id].to_i

    q_ransack = Registration.ransack set_params_q search_word, course_id, course_schedule_id
    registration_courses = q_ransack.result.includes(:course, :course_schedule)
      .page(page).per Settings.admin_page.per_page

    registration_serialize = ActiveModel::SerializableResource
      .new(registration_courses, each_serializer: RegistrationSerializer)
    response_success nil, {registration_courses: registration_serialize,
      page: page, pages: registration_courses.total_pages, courses: Course.all,
      course_schedules: course_schedules}
  end

  def update
    if @registration_course.update_attribute(:status, params[:status])
      SendEmailJob.perform_later @registration_course, params[:email_content],
        params[:status]
      response_success t(".save_success"),
        RegistrationSerializer.new(@registration_course)
    else
      response_error t(".save_failed"),
        @registration_course.errors.full_messages
    end
  end

  def destroy
    if @registration_course.destroy
      response_success t(".delete_success"), @registration_course
    else
      response_error t(".delete_failed"), nil
    end
  end

  private

  def load_registration_course
    return if @registration_course = Registration.find_by(id: params[:id])
    response_not_found t(".not_found"), nil
  end

  def peding_registration_filter
    unless @registration_course.status_pending?
      response_error t(".status_error"), nil
    end
  end

  def set_params_q search_word, course_id, course_schedule_id
    params[:q] = {
      name_or_phone_or_email_cont: search_word,
      course_id_eq: course_id.zero? ? nil : course_id,
      course_schedule_id_eq: course_schedule_id.zero? ? nil : course_schedule_id
    }
  end
end
