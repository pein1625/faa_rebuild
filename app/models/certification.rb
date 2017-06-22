class Certification < ApplicationRecord
  has_one :image, as: :imageable, class_name: Image.name,
    dependent: :destroy
  has_many :user_certifications, dependent: :destroy

  accepts_nested_attributes_for :image
  validates :name, presence: true, length: {
    minimum: Settings.certifications.min_name_length,
    maximum: Settings.certifications.max_name_length}
  validates :description, length: {
    maximum: Settings.certifications.max_description_length}
end
