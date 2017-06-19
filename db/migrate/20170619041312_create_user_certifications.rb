class CreateUserCertifications < ActiveRecord::Migration[5.0]
  def change
    create_table :user_certifications do |t|
      t.references :certification, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
      t.date :issued_date

      t.timestamps
    end
  end
end
