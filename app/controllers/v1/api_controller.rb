class V1::ApiController < ApplicationController
  skip_before_action :load_courses
  skip_before_action :latest_news
  before_action :authenticate_user_from_token
  protect_from_forgery with: :null_session
  respond_to :json

  JsonResponse::STATUS_CODE.keys.each do |status|
    define_method "response_#{status}" do |message = "", content = {}|
      render json: JsonResponse.send(status, message, content)
    end
  end

  def page
    params[:page] || Settings.admin_page.page_default
  end

  private
  def current_admin
    @current_admin ||= Admin.find_by authentication_token: request.headers["AUTHORIZATION"]
  end

  def authenticate_user_from_token
    render json: {message: I18n.t("api.not_authenticated")},
      status: 401 if current_admin.nil?
  end
end
