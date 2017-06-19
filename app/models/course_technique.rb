class CourseTechnique < ApplicationRecord
  belongs_to :course
  belongs_to :technique
end
