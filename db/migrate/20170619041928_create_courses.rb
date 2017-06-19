class CreateCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :courses do |t|
      t.string :name
      t.text :description
      t.date :start_date
      t.date :end_date
      t.date :registration_deadline
      t.float :cost
      t.text :place
      t.text :schedule
      t.integer :status
      t.references :course_category, index: true, foreign_key: true

      t.timestamps
    end
  end
end
