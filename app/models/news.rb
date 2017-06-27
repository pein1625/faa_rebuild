class News < ApplicationRecord
  acts_as_taggable

  has_one :image, as: :imageable, dependent: :destroy
  belongs_to :news_category
  belongs_to :admin

  delegate :name, to: :admin, prefix: true, allow_nil: true
  accepts_nested_attributes_for :image

  scope :newest, ->{order created_at: :desc}
  scope :popular_tags, ->{tag_counts.order(taggings_count: :desc)
    .first(Settings.news.popular_tags)}
end
