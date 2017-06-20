class Feedback < ApplicationRecord
  VALID_PHONE_NUMBER_REGEX = /\A\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d/
  VALID_EMAIL_REGEX = /\b[A-Z0-9._%a-z\-]+@(?:[A-Z0-9a-z\-]+\.)+[A-Za-z]{2,3}\z/
  validates :name, presence: true,
    length: {maximum: Settings.feedbacks.max_name_length}
  validates :email, presence: true,
    length: {maximum: Settings.feedbacks.max_email_length},
    format: {with: VALID_EMAIL_REGEX}
  validates :subject, presence: true,
    length: {maximum: Settings.feedbacks.max_subject_length}
  validates :content, presence: true,
    length: {maximum: Settings.feedbacks.max_content_length}
  validates :phone, allow_blank: true, format: {with: VALID_PHONE_NUMBER_REGEX},
    length: {maximum: Settings.feedbacks.max_phone_length}
end
