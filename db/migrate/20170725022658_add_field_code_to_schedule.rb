class AddFieldCodeToSchedule < ActiveRecord::Migration[5.0]
  def change
    add_column :course_schedules, :code, :string
  end
end
