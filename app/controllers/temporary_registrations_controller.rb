class TemporaryRegistrationsController < ApplicationController
  before_action :find_course, only: :new

  def new
    @temporary_registration = @course.temporary_registrations.build
    respond_to do |format|
      format.js
    end
  end

  def create
    @temporary_registration = TemporaryRegistration.new registration_params
    if @temporary_registration.save
      flash.now[:success] = t ".success"
    else
      flash.now[:danger] = t ".fail"
    end
    respond_to do |format|
      format.js
    end
  end

  private

  def registration_params
    params.require(:temporary_registration).permit :course_id, :name, 
      :email, :address, :phone
  end

  def find_course
    return if @course = Course.find_by(id: params[:course])
    flash[:danger] = t ".not_found"
    redirect_to root_path
  end
end
