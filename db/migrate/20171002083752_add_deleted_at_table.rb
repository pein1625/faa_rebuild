class AddDeletedAtTable < ActiveRecord::Migration[5.0]
  def change
    add_column :courses, :deleted_at, :datetime
    add_index :courses, :deleted_at

    add_column :course_schedules, :deleted_at, :datetime
    add_index :course_schedules, :deleted_at

    add_column :registrations, :deleted_at, :datetime
    add_index :registrations, :deleted_at

    add_column :users, :deleted_at, :datetime
    add_index :users, :deleted_at

    add_column :admins, :deleted_at, :datetime
    add_index :admins, :deleted_at

    add_column :temporary_registrations, :deleted_at, :datetime
    add_index :temporary_registrations, :deleted_at
  end
end
