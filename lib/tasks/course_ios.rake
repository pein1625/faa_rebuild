namespace :db do
  desc "Seeding course android"
  task course_ios: :environment do
    Course.create! name: "Lập trình iOS",
      description: "Tự hào là đơn vị đứng thứ 11 trong bản đồ xếp hạng các " \
      "công ty phát triển mạnh về ngôn ngữ Ruby trên thế giới, với .... " \
      "chuyên gia về Ruby có chứng chỉ Ruby Silver được cấp bởi Ruby Association, " \
      "Framgia Viet Nam đang ngày càng khẳng định được vị thế của mình trong cộng đồng Ruby " \
      "tại Việt Nam nói riêng và quốc tế nói chung. Đến với khóa học này, " \
      "các học viên sẽ được chính những chuyên gia về lập trình Ruby với hơn 05 kinh nghiệm, " \
      "đã nhận được chứng chỉ coach Agile của tổ chức IC Agile trực tiếp giảng dạy " \
      "và chia sẻ những bài học bổ ích và thú vị",
      technique: "iOS",
      content: "#### Nội dung khóa học\n" \
        "* Tổng quan và thực hành về GIT\n" \
        "* Tổng quan về Swift\n" \
        "* Lập trình IOS chi tiết qua IOS Basic, Advance 1, Advance 2\n" \
        "* Design parttern MVC, MVVM\n" \
        "* Apply Reactive Programming\n\n" \
        "#### Bạn sẽ làm được gì sau khóa học này?\n" \
        "* Học viên sẽ được trang bị kiến thức vững chắc để tự thiết kế ra một ứng dụng iOS & tự vận hành, kiếm tiền thông qua AppStore.\n" \
        "* Nắm được những kiến thức thực tế theo đúng yêu cầu của doanh nghiệp.\n" \
        "* Hoàn toàn đủ khả năng để ứng tuyển vào các vị trí lập trình iOS tại các công ty trong & ngoài nước.\n" \
        "* Nếu chăm chỉ rèn luyện, bạn sẽ đủ khả năng tự thành lập công ty, hoặc nhóm chuyên nhận dự án iOS từ khách hàng\n\n" \
        "#### Khóa học sẽ diễn ra trong bao lâu?\n"\
        "Thời gian học tập linh hoạt, phù hợp với từng đối tượng học:\n"\
        "Tổng thời gian đào tạo: 06 tháng\n" \
        "Thời lượng: 03 buổi/tuần, 03 tiếng/buổi\n\n" \
        "* Ca 1: 08:30 - 11:30\n" \
        "* Ca 2: 14:00 - 17:00\n"\
        "* Ca 3: 18:00 - 21:00.\n\n"\
        "#### Ai có thể  tham gia khóa học?\n"\
        "Hãy đăng ký ngay nếu bạn:\n\n"\
        "* Là sinh viên đang theo học chuyên ngành Công nghệ thông tin (từ năm 2 trở lên)\n" \
        "* Đã và đang làm việc trong lĩnh vực công nghệ thông tin, mong muốn học thêm ngôn ngữ lập trình mới."
  end
end
