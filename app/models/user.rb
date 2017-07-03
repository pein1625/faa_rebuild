class User < ApplicationRecord
  has_one :image, as: :imageable, dependent: :destroy
  accepts_nested_attributes_for :image

  enum role: {trainer: 1, user: 2}

  scope :trainers, ->{where role: 1}

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  validates :name, presence: true, length: {
    minimum: Settings.users.min_name_length,
    maximum: Settings.users.max_name_length}
  validates :quote, length: {
    maximum: Settings.users.max_quote_length}
end
