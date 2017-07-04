class CreateCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :courses do |t|
      t.string :name
      t.text :description
      t.text :content
      t.float :cost

      t.timestamps
    end
  end
end
