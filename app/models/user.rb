class User < ApplicationRecord
  has_many :user_certifications, dependent: :destroy
  has_many :certifications, through: :user_certifications
  has_one :image, as: :imageable, dependent: :destroy

  enum role: {trainer: 1, user: 2}

  scope :trainers, ->{where role: 1}
end
