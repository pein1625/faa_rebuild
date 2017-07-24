class CourseScheduleSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :deadline_date, :day1, :start_time1,
    :end_time1, :day2, :start_time2, :end_time2, :day3, :start_time3,
    :end_time3, :place
  belongs_to :course
end
