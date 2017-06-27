class Admin::BaseController < ApplicationController
  layout "admin/layouts/application"
  before_action :authorize_admin

  private

  def authorize_admin
    unless current_admin
      flash[:danger] = t ".permission"
      redirect_to root_path
    end
  end
end
