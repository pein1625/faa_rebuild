class CourseSchedule < ApplicationRecord
  has_many :registrations, dependent: :destroy
  belongs_to :course

  scope :popular, ->{left_joins(:registrations).group(:id)
    .order("COUNT(registrations.id) DESC").first(Settings.courses.popular)}
  scope :newest, ->{order created_at: :desc}

  delegate :name, to: :course, prefix: true, allow_nil: true

  def enrolled_count
    self.registrations.count
  end
end
