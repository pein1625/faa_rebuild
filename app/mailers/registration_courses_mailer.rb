class RegistrationCoursesMailer < ApplicationMailer
  def send_result_register_course registration, email_content, status
    @registration = registration
    @email_content = email_content
    @status = status
    subject = t ".mail_subject"
    mail to: registration.email, subject: subject
  end
end
