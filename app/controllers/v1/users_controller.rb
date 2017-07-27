class V1::UsersController < V1::ApiController
  before_action :load_user, only: [:edit, :update, :destroy]

  def index
    users = User.order_to_display + User.not_display
    response_success nil, users
  end

  def new
    response_success nil, {roles: User.roles.keys}
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
    response_success nil, {user: @user, image: @user.image}
  end

  def update
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
    params.permit :name, :role, :quote, :position, :introduction, :display_order,
      image_attributes: [:id, :url]
  end

  def load_user
    return if @user = User.find_by(id: params[:id])
    response_not_found t(".not_found"), nil
  end
end
