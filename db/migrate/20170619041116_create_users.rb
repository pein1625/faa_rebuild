class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name
      t.integer :role
      t.text :quote
      t.string :slug, null: false

      t.timestamps
    end

    add_index :users, :slug, unique: true
  end
end
