class Registration < ApplicationRecord
  belongs_to :course_schedule
  has_one :course, through: :course_schedule

  enum status: {pending: 0, contacted: 1, rejected: 2}, _prefix: true

  VALID_EMAIL_REGEX = /\A([A-Za-z0-9_.]+)@((?:[-a-z0-9]+\.)+[a-z]{2,4})\Z/
  VALID_PHONE_NUMBER_REGEX = /\A\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d/
  validates :name, presence: true,
    length: {maximum: Settings.registrations.max_name_length}
  validates :email, presence: true,
    length: {maximum: Settings.registrations.max_email_length},
    format: {with: VALID_EMAIL_REGEX}
  validates :phone, presence: true,
    length: {maximum: Settings.registrations.max_phone_length},
    format: {with: VALID_PHONE_NUMBER_REGEX}
  validates :address, length:
    {maximum: Settings.registrations.max_address_length}, allow_blank: true
  validates :course_schedule_id, presence: true

  scope :search, -> word{
    joins(:course).where("LOWER(courses.name) LIKE ? OR LOWER(registrations.name) LIKE ?" \
      "OR registrations.phone LIKE ?",
      "%#{word}%", "%#{word}%", "%#{word}%")
  }
  def course_name
    self.course_schedule.course_name
  end
end
