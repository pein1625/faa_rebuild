class CreateCourseSchedules < ActiveRecord::Migration[5.0]
  def change
    create_table :course_schedules do |t|
      t.date :start_date
      t.date :end_date
      t.date :deadline_date
      t.integer :day1
      t.time :start_time1
      t.time :end_time1
      t.integer :day2
      t.time :start_time2
      t.time :end_time2
      t.integer :day3
      t.time :start_time3
      t.time :end_time3
      t.references :course, foreign_key: true

      t.timestamps
    end
  end
end
