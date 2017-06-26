class V1::CourseCategoriesController < V1::ApiController
  before_action :load_course_category, only: [:edit, :update, :destroy]

  def index
    response_success nil, CourseCategory.all
  end

  def edit
    response_success nil, @course_category
  end

  def update
    if @course_category.update_attributes course_category_params
      response_success t("admin.course_categories.save_success"), @course_category
    else
      response_error t("admin.course_categories.save_failed"), @course_category.errors.full_messages
    end
  end

  def create
    @course_category = CourseCategory.new course_category_params
    if @course_category.save
      response_success t("admin.course_categories.add_success"), @course_category
    else
      response_error t("admin.course_categories.add_failed"), @course_category.errors.full_messages
    end
  end

  def destroy
    if @course_category.destroy
      response_success t("admin.course_categories.delete_success"), @course_category
    else
      response_error t("admin.course_categories.delete_failed"), nil
    end
  end

  private

  def load_course_category
    return if @course_category = CourseCategory.find_by(id: params[:id])
    response_not_found t("admin.course_categories.not_found"), nil
  end

  def course_category_params
    params.permit :name, :description
  end
end
