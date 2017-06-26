class Feedback < ApplicationRecord
  VALID_PHONE_NUMBER_REGEX = /\A\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d/
  VALID_EMAIL_REGEX = /\A([A-Za-z0-9_.]+)@((?:[-a-z0-9]+\.)+[a-z]{2,4})\Z/
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
