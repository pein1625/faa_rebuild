class News < ApplicationRecord
  has_one :image, as: :imageable, dependent: :destroy
  belongs_to :admin

  delegate :name, to: :admin, prefix: true, allow_nil: true

  accepts_nested_attributes_for :image

  validates :title, presence: true,
    length: {maximum: Settings.news.max_title_length}
  validates :content, presence: true
  validates :admin_id, presence: true

  scope :newest, ->{order created_at: :desc}
end
