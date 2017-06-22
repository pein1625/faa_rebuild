class RegistrationsController < ApplicationController
  def new
    @registration = Registration.new
    respond_to do |format|
      format.js
    end
  end

  def create
    @registration = Registration.new registration_params
    if @registration.save
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
    params.require(:registration).permit :course_id, :name, :email, :address, :phone
  end
end
