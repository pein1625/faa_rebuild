namespace :db do
  desc "Seeding course android"
  task course_java: :environment do
    Course.create! name: "Lập trình Java",
      description: "Tự hào là đơn vị đứng thứ 11 trong bản đồ xếp hạng các " \
      "công ty phát triển mạnh về ngôn ngữ Ruby trên thế giới, với .... " \
      "chuyên gia về Ruby có chứng chỉ Ruby Silver được cấp bởi Ruby Association, " \
      "Framgia Viet Nam đang ngày càng khẳng định được vị thế của mình trong cộng đồng Ruby " \
      "tại Việt Nam nói riêng và quốc tế nói chung. Đến với khóa học này, " \
      "các học viên sẽ được chính những chuyên gia về lập trình Ruby với hơn 05 kinh nghiệm, " \
      "đã nhận được chứng chỉ coach Agile của tổ chức IC Agile trực tiếp giảng dạy " \
      "và chia sẻ những bài học bổ ích và thú vị",
      technique: "Java",
      content: "#### Nội dung khóa học\n" \
        "* Tổng quan và thực hành về GIT\n" \
        "* Lập trình hướng đối tượng với Java\n"\
        "* Xây dựng ứng dụng web với các framework phổ biến: Spring MVC, Hibernate,...\n" \
        "* Lập trình nâng cao với các framework trên trong 02 dự án thực tế.\n\n" \
        "#### Bạn sẽ làm được gì sau khóa học này?\n" \
        "* Nắm vững kiến thức về lập trình hướng đối tượng với ngôn ngữ java\n" \
        "* Xây dựng và triển khai các ứng dụng dành cho doanh nghiệp tuân thủ chuẩn công nghệ Java(TM) Platform, các tiêu chuẩn công nghệ của Enterprise Edition\n"\
        "* Thiết kế các ứng dụng Web an toàn dựa trên mô hình MVC\n" \
        "* Phát triển các ứng dụng Web phía Server\n" \
        "* Tạo các ứng dụng Web Service\n" \
        "* Hiểu được lỗ hổng bảo mật quan trọng nhất của các ứng dụng Web cũng như các nguyên tắt về mã hóa an toàn và giải pháp khác phục những lỗ hổng đó.\n\n"\
        "#### Khóa học sẽ diễn ra trong bao lâu?\n" \
        "Tổng thời gian đào tạo: 06 tháng.\n"\
        "Một tuần 03 buổi, mỗi buổi 3 tiếng.\n\n"\
        "* Ca 1: 08:30 ~ 11:30;\n" \
        "* Ca 2: 14:00 ~ 17:00;\n" \
        "* Ca 3: 18:00 – 21:00;\n" \
        "Thời gian học tập linh hoạt, phù hợp với từng đối tượng học\n\n" \
        "#### Ai có thể  tham gia khóa học?\n" \
        "Hãy đăng ký ngay nếu bạn:\n\n" \
        "* Là sinh viên đang theo học chuyên ngành Công nghệ thông tin (từ năm 2 trở lên)\n"\
        "* Đã và đang làm việc trong lĩnh vực công nghệ thông tin, mong muốn học thêm ngôn ngữ lập trình mới.\n\n" \
        "#### Học phí khóa học JAVA tại Framgia Awesome Academy\n" \
        "Chỉ với (XXX VNĐ) cho một khóa học Java (XX tháng) tại Framgia Awesome Academy, bạn sẽ được nhận kèm:\n\n" \
        "* Khóa học Agile theo chuẩn quốc tế của ICAgile (tương đương 4.000.000 VNĐ)\n"\
        "* Khóa học kỹ năng mềm dành cho lập trình viên: Problem Solving, Brainstorming, Professionalism (tương đương 2.500.000 VNĐ)"
  end
end
