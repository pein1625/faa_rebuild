class User < ApplicationRecord
  has_one :image, as: :imageable, dependent: :destroy

  extend FriendlyId
  friendly_id :slug_candidates, use: [:slugged, :finders]

  def slug_candidates
    [:name]
  end

  def should_generate_new_friendly_id?
    name_changed?
  end

  accepts_nested_attributes_for :image

  enum role: {trainer: 1, user: 2}

  scope :trainers, ->{where role: 1}
  scope :order_to_display, ->{where("display_order > 0").order(display_order: :asc)}
  scope :not_display, ->{where(display_order: 0).order(created_at: :desc)}

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  validates :name, presence: true, length: {
    minimum: Settings.users.min_name_length,
    maximum: Settings.users.max_name_length}
  validates :quote, length: {
    maximum: Settings.users.max_quote_length}
end
