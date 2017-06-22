class V1::UsersController < V1::ApiController
  before_action :load_user, only: [:edit, :update, :destroy]

  def index
    response_success nil, User.all
  end

  def new
    response_success nil, {roles: User.roles.keys, certifications: Certification.all}
  end

  def create
    @user = User.new user_params
    if @user.save
      response_success t(".save_success"), @user
    else
      response_error t(".save_failed"), @user.errors.full_messages
    end
  end

  def edit
    response_success nil, {user: @user, image: @user.image, user_certifications: @user.certifications.map(&:id)}
  end

  def update
    @user.certifications.destroy_all
    if @user.update_attributes(user_params)
      response_success t(".save_success"), @user
    else
      response_error t(".save_failed"), @user.errors.full_messages
    end
  end

  def destroy
    if @user.destroy
      response_success nil, @user
    else
      response_error t(".delete_failed"), nil
    end
  end

  private

  def user_params
    params.permit :name, :role, :quote, :email, :phone, :office, image_attributes: [:id, :url],
      user_certifications_attributes: [:id, :certification_id]
  end

  def load_user
    return if @user = User.find_by(id: params[:id])
    response_not_found t(".not_found"), nil
  end
end
