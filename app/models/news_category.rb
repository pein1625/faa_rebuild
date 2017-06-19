class NewsCategory < ApplicationRecord
  has_many :news, dependent: :destroy
end
