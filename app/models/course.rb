class Course < ApplicationRecord
  has_many :images, as: :imageable, dependent: :destroy
  has_many :registrations, dependent: :destroy
  has_many :course_techniques, dependent: :destroy
  has_many :techniques, through: :course_techniques
  belongs_to :course_category
end
