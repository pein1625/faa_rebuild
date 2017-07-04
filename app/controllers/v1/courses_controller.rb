class V1::CoursesController < V1::ApiController
  before_action :load_course, only: [:edit, :update, :destroy]

  def index
    response_success nil, Course.all
  end

  def create
    @course = Course.new course_params
    if @course.save
      response_success t(".save_success"), @course
    else
      response_error t(".save_failed"), @course.errors.full_messages
    end
  end

  def edit
    response_success nil, {course: @course, statuses: Course.statuses.keys,
      images: @course.images}
  end

  def update
    if @course.update_attributes(course_params)
      response_success t(".save_success"), @course
    else
      response_error t(".save_failed"), @course.errors.full_messages
    end
  end

  def destroy
    if @course.destroy
      response_success nil, @course
    else
      response_error t(".delete_failed"), nil
    end
  end

  private

  def course_params
    params.permit :name, :description, :start_date, :end_date, :status,
      :registration_deadline, :cost, :place, :content, :course_category_id,
      images_attributes: [:id, :url]
  end

  def load_course
    return if @course = Course.find_by(id: params[:id])
    response_not_found t(".not_found"), nil
  end
end
