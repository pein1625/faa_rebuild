class FeedbacksController < ApplicationController
  def new
    @feedback = Feedback.new
  end

  def create
    @feedback = Feedback.new feedback_params
    if @feedback.save
      flash[:success] = t ".success"
    else
      flash.now[:danger] = t ".fail"
    end
    respond_to do |format|
      format.js
    end
  end

  private

  def feedback_params
    params.require(:feedback).permit :name, :phone, :email, :subject, :content
  end
end
