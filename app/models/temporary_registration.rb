class TemporaryRegistration < ApplicationRecord
  belongs_to :course

  delegate :name, to: :course, prefix: true, allow_nil: true
end
