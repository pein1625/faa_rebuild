module RegistrationsHelper
  def courses_select_options
    Course.newest.map{|course| [course.name, course.id]}
  end
end
