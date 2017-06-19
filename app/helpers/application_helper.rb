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

  def load_image object
    image = object.images
    if image.any?
      image_tag(image.first.url, class: "img wth-100")
    else
      image_tag(ImageUploader.new.default_url, class: "img wth-100")
    end
  end
end
