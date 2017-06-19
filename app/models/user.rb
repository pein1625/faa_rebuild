class User < ApplicationRecord
  has_many :user_certifications, dependent: :destroy
  has_many :certifications, through: :user_certifications
end
