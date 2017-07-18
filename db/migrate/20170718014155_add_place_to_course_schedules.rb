class AddPlaceToCourseSchedules < ActiveRecord::Migration[5.0]
  def change
    add_column :course_schedules, :place, :text
  end
end
