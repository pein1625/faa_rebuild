class UserCertification < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :certification
end
