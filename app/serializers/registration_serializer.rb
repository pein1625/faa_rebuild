class RegistrationSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone, :address, :status
  has_one :course
end
