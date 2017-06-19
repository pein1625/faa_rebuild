class CreateFeedbacks < ActiveRecord::Migration[5.0]
  def change
    create_table :feedbacks do |t|
      t.string :name
      t.string :email
      t.string :phone
      t.string :subject
      t.text :content

      t.timestamps
    end
  end
end
