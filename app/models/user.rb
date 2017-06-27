class User < ApplicationRecord
  has_many :user_certifications, autosave: true, dependent: :destroy
  has_many :certifications, through: :user_certifications
  has_many :user_positions, dependent: :destroy
  has_one :image, as: :imageable, dependent: :destroy
  accepts_nested_attributes_for :image
  accepts_nested_attributes_for :user_certifications

  enum role: {trainer: 1, user: 2}

  scope :trainers, ->{where role: 1}

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  validates :name, presence: true, length: {
    minimum: Settings.users.min_name_length,
    maximum: Settings.users.max_name_length}
  validates :quote, length: {
    maximum: Settings.users.max_quote_length}
  validates :email, presence: true,
    format: { with: VALID_EMAIL_REGEX },
    uniqueness: { case_sensitive: false }
  validates :phone, presence: true,
    numericality: true,
    length: { minimum: 10, maximum: 15 }
end
