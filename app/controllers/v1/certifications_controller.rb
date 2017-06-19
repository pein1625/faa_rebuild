class V1::CertificationsController < V1::ApiController
  def index
    respond_with Certification.all
  end
end
