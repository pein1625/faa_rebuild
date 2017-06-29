class SendEmailJob < ApplicationJob
  queue_as :default

  def perform registration, email_content, status
    RegistrationCoursesMailer
      .send_result_register_course(registration, email_content, status)
      .deliver_later
  end
end
