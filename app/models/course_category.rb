class CourseCategory < ApplicationRecord
  has_many :courses, dependent: :destroy

  validates :name, presence: true,
    length: {maximum: Settings.course_category.max_name_length}
end
