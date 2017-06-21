namespace :db do
  desc "Seeding data"
  task seeding: :environment do
    %w[db:drop db:create db:migrate db:seed].each do |task|
      Rake::Task[task].invoke
    end

    puts "Create Course Category"
    8.times do
      CourseCategory.create! name: Faker::Pokemon.name
    end

    puts "Create Course"
    CourseCategory.all.each do |cate|
      8.times do
        Course.create! name: Faker::Educator.course,
          description: Faker::Lorem.paragraph,
          start_date: Date.yesterday,
          end_date: Date.today,
          registration_deadline: Date.today,
          place: Faker::Address.street_address + " " + Faker::Address.city,
          cost: Faker::Number.number(10),
          course_category_id: cate.id
      end
    end

    puts "Create Certification"
    Certification.create! name: "Agile"
    Certification.create! name: "Enflish"

    puts "Create trainers"
    quote = "Git Push and Go Home"
    trainers = ["Pham Van Chien", "Nguyen Van Tran Anh", "Tran Duc Quoc",
      "Do Thi Diem Thao", "Hoang Thi Nhung"]
    trainers.each do |trainer|
      User.create! name: trainer, role: 1, quote: quote
    end
  end
end
