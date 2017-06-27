class CreateUserPositions < ActiveRecord::Migration[5.0]
  def change
    create_table :user_positions do |t|
      t.date :start_time
      t.date :end_time
      t.string :position
      t.references :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end
