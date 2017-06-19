class Technique < ApplicationRecord
  has_one :image, as: :imageable, dependent: :destroy
  has_many :course_techniques, dependent: :destroy
  has_many :courses, through: :course_techniques
end
