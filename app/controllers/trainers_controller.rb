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
    @trainer = User.trainers.friendly.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    handle_record_not_found
  end
end
