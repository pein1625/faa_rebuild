class News < ApplicationRecord
  has_one :image, as: :imageable, dependent: :destroy
  belongs_to :news_category
end
