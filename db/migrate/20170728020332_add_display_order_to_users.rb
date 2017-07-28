class AddDisplayOrderToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :display_order, :integer, default: 0
  end
end
