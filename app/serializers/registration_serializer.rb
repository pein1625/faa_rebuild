class RegistrationSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone, :address, :course_name, :comment, :course_schedule_code, :created_at
  has_one :course
  has_one :course_schedule

  def course_name
    object.course.name
  end

  def course_schedule_code
    object.course_schedule.code
  end
end
