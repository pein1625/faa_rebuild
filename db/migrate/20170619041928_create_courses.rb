class CreateCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :courses do |t|
      t.string :name
      t.text :description
      t.text :content
      t.float :cost
      t.string :slug, null: false

      t.timestamps
    end

    add_index :courses, :slug, unique: true
  end
end
