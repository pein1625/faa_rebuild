class AddInfoToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :email, :string
    add_column :users, :phone, :string
    add_column :users, :office, :string
  end
end
