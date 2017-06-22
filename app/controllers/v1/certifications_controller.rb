class V1::CertificationsController < V1::ApiController
  before_action :load_certification, only: [:edit, :update, :destroy]

  def index
    response_success nil, Certification.all
  end

  def create
    @certification = Certification.new certification_params
    if @certification.save
      response_success t(".save_success"), @certification
    else
      response_error t(".save_failed"), @certification.errors.full_messages
    end
  end

  def edit
    response_success nil, {certification: @certification, image: @certification.image}
  end

  def update
    if @certification.update_attributes(certification_params)
      response_success t(".save_success"), @certification
    else
      response_error t(".save_failed"), @certification.errors.full_messages
    end
  end

  def destroy
    if @certification.destroy
      response_success nil, @certification
    else
      response_error t(".delete_failed"), nil
    end
  end

  private

  def certification_params
    params.permit :name, :description, image_attributes: [:id, :url]
  end

  def load_certification
    return if @certification = Certification.find_by(id: params[:id])
    response_not_found t(".not_found"), nil
  end
end
