class V1::CertificationsController < V1::ApiController
  def index
    # respond_with Certification.all
    response_success nil, Certification.all
  end
end
