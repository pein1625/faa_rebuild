namespace :db do
  desc "Seeding trainer"
  task trainer: :environment do
    puts "Create Certification"
    Certification.create! name: "Thạc sĩ công nghệ thông tin - Đại học Ritsumeikan, Kyoto"
    Certification.create! name: "Chứng chỉ hoàn thành chương trình đào tạo nhân lực lãnh đạo và quản lý toàn cầu - Đại học Ritsumeikan, Kyoto"
    Certification.create! name: "Tốt nghiệp đại học Công Nghệ, Đại Học Quốc Gia HN"

    puts "Create trainers"
    trainers = [
      {
        name: "Phan Lạc Phúc",
        quote: "Đầu tư cho học tập nâng cao kỹ năng là sự đầu tư đúng đắn nhất.",
        email: "phan.lac.phuc@framgia.com",
        phone: "0969696969"
      },
      {
        name: "Mai Tuấn Việt",
        quote: "",
        email: "mai.tuan.viet@framgia.com",
        phone: "0969696969"
      },
      {
        name: "Nguyễn Bỉnh Diệu",
        quote: "I am a Ruby trainer and have many years of experience
          in working for training and developing web programming. With continuous
          learning ability, effective problem solving and communication skills,
          I have been always trying to create better technical background
          knowledge and experiences in order to train many people in
          Vietnamese IT community",
        email: "nguyen.binh.dieu@framgia.com",
        phone: "0969696969"
      },
      {
        name: "Hoàng Nhạc Trung",
        quote: "",
        email: "hoang.nhac.trung@framgia.com",
        phone: "0969696969"
      }
    ]
    trainers.each do |trainer|
      User.create! name: trainer[:name], role: 1, quote: trainer[:quote],
        email: trainer[:email], phone: trainer[:phone]
    end

    UserCertification.create! user_id: 1, certification_id: 1
    UserCertification.create! user_id: 1, certification_id: 2
    UserCertification.create! user_id: 2, certification_id: 3
    UserCertification.create! user_id: 3, certification_id: 3

    puts "Create trainer's position"
    User.first.user_positions.create! start_time: "2/2013".to_date, end_time: "3/2013".to_date,
      position: "Web developer và Mobile developer tại Anysys Co,.Ltd (in Japan)"
    User.first.user_positions.create! start_time: "5/2013".to_date, end_time: "11/2013".to_date,
      position: "Embedded System tester tại Kyoto Software Research Co,.Ltd (in Japan)"
    User.first.user_positions.create! start_time: "4/2014".to_date, end_time: "6/2014".to_date,
      position: "Unity application developer tại Rikkei Soft"
    User.first.user_positions.create! start_time: "6/2014".to_date, end_time: "9/2014".to_date,
      position: "Mobile developer tại Framgia Vietnam"
    User.first.user_positions.create! start_time: "10/2014".to_date, end_time: "8/2016".to_date,
      position: "Kỹ sư cầu nối tại Framgia Japan (in Japan)"
    User.first.user_positions.create! start_time: "9/2016".to_date, end_time: "2/2017".to_date,
      position: "Trưởng nhóm tư vấn và đào tạo nguồn nhân lực tại Framgia Vietnam"
    User.first.user_positions.create! start_time: "3/2017".to_date,
      position: "Trưởng phòng điều hành học viện Framgia Awesome Academy - Framgia Vietnam"

    User.second.user_positions.create! start_time: "7/2007".to_date, end_time: "5/2009".to_date,
      position: "Web developer - FPT Information System"
    User.second.user_positions.create! start_time: "5/2009".to_date, end_time: "3/2013".to_date,
      position: "System developer - FPT Securities"
    User.second.user_positions.create! start_time: "3/2013".to_date, end_time: "12/2013".to_date,
      position: "Team lead - Dai Viet Software"
    User.second.user_positions.create! start_time: "1/2014".to_date, end_time: "2/2016".to_date,
      position: "R&D Department Manager - Vietnamnet ICom JSC."
    User.second.user_positions.create! start_time: "2/2016".to_date,
      position: "Ruby Trainer - Framgia Viet Nam"

    User.third.user_positions.create! start_time: "1/2010".to_date, end_time: "6/2012".to_date,
      position: "Web developer - Cty Anasport Viet Nam"
    User.third.user_positions.create! start_time: "6/2012".to_date, end_time: "6/2014".to_date,
      position: "Web and Mobile developer Cty Vinova Viet Nam"
    User.third.user_positions.create! start_time: "6/2014".to_date, end_time: "12/2014".to_date,
      position: "Web and Mobile developer Cty Zoytech Viet Nam"
    User.third.user_positions.create! start_time: "1/2015".to_date,
      position: "Ruby Trainer Cty Framgia Viet Nam "
  end
end
