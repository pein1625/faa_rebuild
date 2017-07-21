class V1::ApiController < ApplicationController
  skip_before_action :load_courses
  skip_before_action :latest_news
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
end
