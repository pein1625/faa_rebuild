class CourseSchedule < ApplicationRecord
  before_save :set_unique_code_schedule, if: ->(obj){obj.new_record? || obj.course_id_changed?}

  has_many :registrations, dependent: :destroy
  belongs_to :course

  DAY_OF_WEEK = [:monday, :tuesday, :wednesday, :thursday, :friday, :saturday, :sunday]

  validates :start_date, presence: true
  validates :end_date, presence: true

  scope :newest, ->{order start_date: :desc}
  scope :load_by_course, -> course_id{newest.where course_id: course_id}

  delegate :name, to: :course, prefix: true, allow_nil: true
  delegate :cost, to: :course, prefix: true, allow_nil: true
  delegate :technique, to: :course, prefix: true, allow_nil: true

  def is_opening?
    self.start_date >= Date.today
  end

  private

  def set_unique_code_schedule
    if last_schedule = CourseSchedule.where(course_id: self.course_id).order(:id).last
      last_code_number = last_schedule.code.scan(/\d+$/).first.to_i
      new_code_number = last_code_number + 1
    else
      new_code_number = 1
    end
    self.code = "#{self.course_technique}" + "_" + "#{sprintf("%03d", new_code_number)}"
  end
end
