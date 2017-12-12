class AddCategoryCourse < ActiveRecord::Migration[5.0]
  def change
    add_column :courses, :category, :string
  end
end
