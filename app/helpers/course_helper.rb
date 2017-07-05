module CourseHelper
  def load_link course
    if course.course_schedules.any? && course.course_schedules.first.is_opening?
      course_schedule_path course.course_schedules.first
    else
      course_path course
    end
  end

  def load_register_time schedule
    if schedule.present? && schedule.is_opening?
      l(schedule.start_date, format: :day_month_year) + " - " +
      l(schedule.end_date, format: :day_month_year)
    else
      t ".coming_soon"
    end
  end

  def load_schedule_time day, start_time, end_time
    t("day_of_week.#{CourseSchedule::DAY_OF_WEEK[day]}") + ": " +
    l(start_time, format: :hour_minute) + " - " +
    l(end_time, format: :hour_minute)
  end
end
