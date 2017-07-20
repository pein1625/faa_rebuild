class TemporaryRegistrationsSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone, :address
  belongs_to :course
end
