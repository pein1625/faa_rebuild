class TrainersController < ApplicationController
  before_action :find_trainer, only: :show

  def index
    trainers = User.order_to_display.includes(:image) + User.not_display.includes(:image)
    @trainers = Kaminari.paginate_array(trainers).page(params[:page])
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
