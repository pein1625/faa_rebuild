class RegistrationSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone, :address, :created_at
  has_one :course
  has_one :course_schedule
end
