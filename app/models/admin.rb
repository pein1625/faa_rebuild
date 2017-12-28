class Admin < ApplicationRecord
  acts_as_token_authenticatable
  acts_as_paranoid
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :news
  validates :name, presence: true
  validates :email, presence: true

  def generate_new_authentication_token
    self.update_attributes authentication_token: nil
  end
end
