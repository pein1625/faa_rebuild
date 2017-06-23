class NewsCategory < ApplicationRecord
  has_many :news, dependent: :destroy

  validates :name, presence: true, length: {
    minimum: Settings.news_category.min_name_length,
    maximum: Settings.news_category.max_name_length}
  validates :description, length: {
    maximum: Settings.news_category.max_description_length}
end
