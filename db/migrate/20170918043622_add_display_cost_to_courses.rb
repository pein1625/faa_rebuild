class AddDisplayCostToCourses < ActiveRecord::Migration[5.0]
  def change
    add_column :courses, :display_cost, :boolean, default: false
  end
end
