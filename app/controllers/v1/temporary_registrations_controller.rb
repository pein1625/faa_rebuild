class V1::TemporaryRegistrationsController < V1::ApiController
  before_action :load_registration_course, only: [:destroy, :update]

  def index
    # if search_word = params[:query]
    #   registration_courses = TemporaryRegistration.search_by_course_name_phone(search_word.downcase)
    #     .page(page).per Settings.admin_page.per_page
    # else
    #   registration_courses = TemporaryRegistration.page(page)
    #     .per Settings.admin_page.per_page
    # end
    registration_courses = TemporaryRegistration.includes(:course).order(created_at: :desc)
    registration_serialize = ActiveModel::SerializableResource
      .new(registration_courses, each_serializer: TemporaryRegistrationsSerializer)
    # response_success nil, {registration_courses: registration_serialize,
    #   page: page, pages: registration_courses.total_pages}
    response_success nil, {registration_courses: registration_serialize}
  end

  def update
    if @registration_course.update(comment: params[:comment])
      response_success t(".delete_success"), @registration_course
    else
      response_error t(".delete_failed"), @registration_course.errors.full_messages
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
    return if @registration_course = TemporaryRegistration.find_by(id: params[:id])
    response_not_found t(".not_found"), nil
  end
end

