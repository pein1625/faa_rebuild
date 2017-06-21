class News < ApplicationRecord
  acts_as_taggable

  has_many :images, as: :imageable, dependent: :destroy
  belongs_to :news_category
  belongs_to :admin

  delegate :name, to: :admin, prefix: true, allow_nil: true

  scope :newest, ->{order created_at: :desc}
end
