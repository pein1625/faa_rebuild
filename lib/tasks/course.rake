namespace :db do
  desc "Seeding data"
  task course: :environment do
    Course.last.update on_slider_index: true
  end
end
