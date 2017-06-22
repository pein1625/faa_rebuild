class Image < ApplicationRecord
  belongs_to :imageable, polymorphic: true, optional: true

  validates :url, presence: true
end
