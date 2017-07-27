namespace :db do
  desc "Seeding trainer"
  task trainer: :environment do
    puts "Create trainers"
    trainers = [
      {
        name: "Phan Lạc Phúc",
        quote: "Đầu tư cho học tập nâng cao kỹ năng là sự đầu tư đúng đắn nhất.",
        introduction: "* 2/2013 - 3/2014: Web developer và Mobile developer tại Anysys Co,.Ltd (in Japan)\n"\
          "* 5/2013 - 11/2013: Embedded System tester tại Kyoto Software Research Co,.Ltd (in Japan)\n"\
          "* 4/2014 - 6/2014: Unity application developer tại Rikkei Soft\n"\
          "* 6/2014 - 9/2014: Mobile developer tại Framgia Vietnam\n"\
          "* 10/2014 - 8/2016: Kỹ sư cầu nối tại Framgia Japan (in Japan)\n"\
          "* 9/2016 - 2/2017: Trưởng nhóm tư vấn và đào tạo nguồn nhân lực tại Framgia Vietnam\n"\
          "* 3/2017 - hiện tại: Trưởng phòng điều hành học viện Framgia Awesome Academy - Framgia Vietnam"
      },
      {
        name: "Mai Tuấn Việt",
        quote: "",
        introduction: "* 07/2007 - 05/2009: Web developer - FPT Information System\n"\
          "* 05/2009 - 03/2013: System developer - FPT Securities\n"\
          "* 03/2013 - 12/2013: Team lead - Dai Viet Software\n"\
          "* 01/2014 - 02/2016: R&D Department Manager - Vietnamnet ICom JSC.\n"\
          "* 02/2016 - hiện tại: Ruby Trainer - Framgia Viet Nam"
      },
      {
        name: "Nguyễn Bỉnh Diệu",
        quote: "I am a Ruby trainer and have many years of experience
          in working for training and developing web programming. With continuous
          learning ability, effective problem solving and communication skills,
          I have been always trying to create better technical background
          knowledge and experiences in order to train many people in
          Vietnamese IT community",
        introduction: "* 2010 - 2013: Web developer - Cty Anasport Viet Nam\n"\
          "* 6/2012 - 6/2014: Web and Mobile developer Cty Vinova Viet Nam\n"\
          "* 6/2014 - 12/2014: Web and Mobile developer Cty Zoytech Viet Nam\n"\
          "* 1/2015 - hiện tại: Ruby Trainer Cty Framgia Viet Nam"
      },
      {
        name: "Hoàng Nhạc Trung",
        quote: "",
        introduction: "* 2005 - 2011: working as a developer, analyst, bridge system engineer, project manager\n"\
          "* 2011 - now: working as an Agile Coach/Trainer, Product Manager, IT Lecturer\n\n"\
          "My professional career of a software developer started in 2005 when I was a 3rd year student. "\
          "After graduated, I have worked mostly for larger companies on enterprise-level "\
          "software and have experienced various roles from developer to analyst, "\
          "bridge system engineer, project manager and then, becoming an IT trainer.\n"\
          "I believe three things are necessary to be successful in our industry these days:\n"\
          "* empowered and motivated teams,\n"\
          "* strong technical skills, and\n"\
          "* a simple and transparent process."
      }
    ]
    trainers.each do |trainer|
      User.create! name: trainer[:name], role: 1, quote: trainer[:quote],
        introduction: trainer[:introduction]
    end
    User.update_all position: "Giảng viên Ruby"
  end
end
