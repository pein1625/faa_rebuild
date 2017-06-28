class SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_to_on_destroy
    respond_to do |format|
      format.json {render json: {status: 200, message: t(".logout_success")}}
      format.html
    end
  end

  def after_sign_in_path_for resource
    admin_path
  end
end
