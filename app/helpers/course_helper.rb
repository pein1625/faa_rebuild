module CourseHelper
  def load_link course
    if course.newest_schedule
      course_schedule_path course.newest_schedule
    else
      course_path course
    end
  end

  def load_register_time schedule
    if schedule.present? && schedule.is_opening?
      l(schedule.start_date, format: :day_month_year) + " - " +
      l(schedule.end_date, format: :day_month_year)
    else
      t "course_schedules.index.coming_soon"
    end
  end

  def load_schedule_time_inline day, start_time, end_time
    t("day_of_week.#{CourseSchedule::DAY_OF_WEEK[day]}") + ": " +
    l(start_time, format: :hour_minute) + " - " +
    l(end_time, format: :hour_minute)
  end

  def load_schedule_time_in_list day, start_time, end_time
    day_tag = content_tag :label, t("day_of_week.#{CourseSchedule::DAY_OF_WEEK[day]}")
    time_tag = content_tag :span do
                  l(start_time, format: :hour_minute) + " - " +
                  l(end_time, format: :hour_minute)
                end
    content_tag :li, day_tag + time_tag
  end

  def set_class_active course_schedule, schedule
    "schedule-active" if course_schedule && (course_schedule == schedule)
  end

  def appear_cost course
    if course.cost && course.display_cost
      content_tag :p, class: "price" do
        concat number_to_currency course.cost, precision: 0, delimiter: ".", format: "%n "
        concat content_tag :span, Settings.courses.money_unit, class: "currency"
      end
    else
      content_tag :p, class: "price" do
        t "courses.not_cost"
      end
    end
  end

  def appear_cost_schedule course
    if course.cost && course.display_cost
      content_tag :p do
         concat number_to_currency course.cost, precision: 0, delimiter: ".", format: "%n "
         concat content_tag :span, Settings.courses.money_unit, class: "currency"
       end
    else
      content_tag :p do
        t "courses.not_cost"
      end
    end
  end

  def load_schedule_time_without_day start_time, end_time
    l(start_time, format: :hour_minute) + " - " + l(end_time, format: :hour_minute)
  end

  def number_of_temporary_registration course
    course.temporary_registrations.count
  end

  def load_course_image course, attribute, css_class = ""
    if course.send(attribute)
      image_tag course.send(attribute).url, class: "img wth-100 #{css_class}"
    else
      image_tag Settings.image_default.default, class: "img wth-100 #{css_class}"
    end
  end
end
