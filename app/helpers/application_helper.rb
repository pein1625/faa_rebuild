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

  def load_image object, css_class = ""
    image = object.images || object.image
    if image.any?
      image_tag image.first.url, class: "img wth-100 #{css_class}"
    else
      image_tag Settings.image_default, class: "img wth-100 #{css_class}"
    end
  end


  def markdown text
    renderer = Redcarpet::Render::HTML.new(hard_wrap: true, filter_html: true)
    options = {
      autolink: true,
      no_intra_emphasis: true,
      disable_indented_code_blocks: true,
      fenced_code_blocks: true,
      lax_html_blocks: true,
      strikethrough: true,
      superscript: true
    }

    Redcarpet::Markdown.new(renderer, options).render(text).html_safe
  end
end
