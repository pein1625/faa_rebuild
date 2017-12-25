class AddCommentRegistrations < ActiveRecord::Migration[5.0]
  def change
    add_column :registrations, :comment, :string
    add_column :temporary_registrations, :comment, :string
  end
end
