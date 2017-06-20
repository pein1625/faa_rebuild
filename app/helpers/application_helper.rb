module ApplicationHelper
  def full_title page_title = ""
    base_title = t ".title"
    page_title.empty? ? base_title : page_title + " | " + base_title
  end

  def view_object name
    if name.is_a?(Symbol)
      class_name = name.to_s.titleize.split(" ").join("")
    else
      class_name = name.split("/")
        .map{|name_split| name_split.titleize.sub(" ", "")}.join("::")
    end
    class_name.constantize.new(self)
  end
end
