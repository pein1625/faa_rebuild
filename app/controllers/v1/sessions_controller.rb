class V1::SessionsController < Devise::SessionsController
  include ApplicationHelper

  respond_to :json
  skip_before_action :verify_signed_out_user, only: :destroy
  before_action :load_admin, only: :create
  before_action :valid_token, only: :destroy

  def create
    if @admin.valid_password? sign_in_params[:password]
      sign_in "admin", @admin
      data = {admin_info: {id: @admin.id, name: @admin.name, email: @admin.email},
        authen_token: @admin.authentication_token}
      render json: {status: 200, data: data }
    end
  end

  def destroy
    sign_out @admin
    @admin.generate_new_authentication_token
    render json: {status: I18n.t("devise.sessions.signed_out")}
  end

  private
  def load_admin
    @admin = Admin.find_for_database_authentication email: sign_in_params[:email]
    return if @admin
    render json: I18n.t("devise.failure.invalid", authentication_keys: "email")
  end

  def valid_token
    @admin = Admin.find_by authentication_token: request.headers["AUTHORIZATION"]
    return if @admin
    render json: I18n.t("api.invalid_token")
  end
end
