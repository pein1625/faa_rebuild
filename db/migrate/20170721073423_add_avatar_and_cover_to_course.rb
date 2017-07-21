class AddAvatarAndCoverToCourse < ActiveRecord::Migration[5.0]
  def change
    add_column :courses, :avatar_id, :integer
    add_column :courses, :cover_id, :integer
  end
end
