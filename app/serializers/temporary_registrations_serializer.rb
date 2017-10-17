class TemporaryRegistrationsSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone, :address, :created_at
  belongs_to :course
end
