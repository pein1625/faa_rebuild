class CreateImages < ActiveRecord::Migration[5.0]
  def change
    create_table :images do |t|
      t.string :url
      t.integer :imageable_id
      t.references :imageable, polymorphic: true

      t.timestamps
    end
  end
end
