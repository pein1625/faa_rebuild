class News < ApplicationRecord
  has_one :image, as: :imageable, dependent: :destroy
  belongs_to :admin

  extend FriendlyId
  friendly_id :slug_candidates, use: [:slugged, :finders]

  def slug_candidates
    [:title]
  end

  def should_generate_new_friendly_id?
    title_changed?
  end

  delegate :name, to: :admin, prefix: true, allow_nil: true

  accepts_nested_attributes_for :image

  validates :title, presence: true,
    length: {maximum: Settings.news.max_title_length}
  validates :content, presence: true
  validates :admin_id, presence: true

  scope :newest, ->{order created_at: :desc}
end
