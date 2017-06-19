class Certification < ApplicationRecord
  has_one :image, as: :imageable, dependent: :destroy
  has_many :user_certifications, dependent: :destroy
end
