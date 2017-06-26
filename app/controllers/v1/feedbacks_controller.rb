class V1::FeedbacksController < V1::ApiController
  before_action :find_feedback, only: :destroy

  def index
    response_success nil, Feedback.newest
  end

  def destroy
    if @feedback.destroy
      response_success nil, @feedback
    else
      response_error t("admin.feedbacks.delete_failed"), nil
    end
  end

  private

  def find_feedback
    return if @feedback = Feedback.find_by(id: params[:id])
    response_not_found t("admin.feedbacks.not_found"), nil
  end
end
