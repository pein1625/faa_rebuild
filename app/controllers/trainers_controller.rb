class TrainersController < ApplicationController
  before_action :find_trainer, only: :show

  def index
    @trainers = User.trainers.page(params[:page])
      .per Settings.trainers.per_page
  end

  def show
  end

  private

  def find_trainer
    return if @trainer = User.trainers.find_by(id: params[:id])
    flash[:danger] = t ".not_found"
    redirect_to root_path
  end
end
