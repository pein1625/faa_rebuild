class Course < ApplicationRecord
  has_many :images, as: :imageable, dependent: :destroy
  has_many :registrations, dependent: :destroy
  has_many :course_techniques, dependent: :destroy
  has_many :techniques, through: :course_techniques
  belongs_to :course_category

  accepts_nested_attributes_for :images, allow_destroy: true

  delegate :name, to: :course_category, prefix: true, allow_nil: true

  scope :newest, ->{order created_at: :desc}
  scope :by_words, -> words{where("LOWER(name) LIKE ?", "%#{words.downcase}%")}
  scope :popular, ->{left_joins(:registrations).group(:id)
    .order("COUNT(registrations.id) DESC").first(Settings.courses.popular)}

  enum status: {opening: 0, closed: 1}

  validates :name, presence: true, length: {
    maximum: Settings.courses.max_name_length,
    minimum: Settings.courses.min_name_length}
  validates :description, presence: true, length: {
    maximum: Settings.courses.max_description_length,
    minimum: Settings.courses.min_description_length}
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :registration_deadline, presence: true
  validates :cost, presence: true, numericality: {greater_than_or_equal_to: 0}
  validates :course_category_id, presence: true
  validates :content, presence: true

  def enrolled_count
    self.registrations.count
  end

  def images_attributes= attributes
    self.images.delete_all
    super
  end
end
