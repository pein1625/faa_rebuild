class TemporaryRegistrationsSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone, :address, :comment, :created_at, :course_name
  belongs_to :course

   def course_name
    object.course.name
  end
end
