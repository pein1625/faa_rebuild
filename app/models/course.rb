class Course < ApplicationRecord
  has_many :images, as: :imageable, dependent: :destroy
  has_many :registrations, dependent: :destroy
  has_many :course_techniques, dependent: :destroy
  has_many :techniques, through: :course_techniques
  belongs_to :course_category

  delegate :name, to: :course_category, prefix: true, allow_nil: true

  scope :newest, ->{order created_at: :desc}
  scope :by_words, -> words{where("name LIKE ?", "%#{words}%")}
  scope :popular, ->{left_joins(:registrations).group(:id)
    .order("COUNT(registrations.id) DESC").first(Settings.courses.popular)}

  def enrolled_count
    self.registrations.count
  end
end
