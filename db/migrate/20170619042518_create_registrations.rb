class CreateRegistrations < ActiveRecord::Migration[5.0]
  def change
    create_table :registrations do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.text :address
      t.references :course, index: true, foreign_key: true

      t.timestamps
    end
  end
end
