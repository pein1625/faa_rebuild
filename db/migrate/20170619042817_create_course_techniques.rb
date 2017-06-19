class CreateCourseTechniques < ActiveRecord::Migration[5.0]
  def change
    create_table :course_techniques do |t|
      t.references :course, index: true, foreign_key: true
      t.references :technique, index: true, foreign_key: true

      t.timestamps
    end
  end
end
