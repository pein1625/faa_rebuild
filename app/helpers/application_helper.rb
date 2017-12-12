module ApplicationHelper
  # def full_title page_title = ""
  #   base_title = t ".title"
  #   page_title.empty? ? base_title : page_title + " | " + base_title
  # end

  def meta_title(page_title)
    base_title = t "layouts.application.title"
    title = page_title.empty? ? base_title : page_title + " | " + base_title
    content_for(:title, title)
  end

  def meta_description(description)
    content_for(:meta_description, description)
  end

  def meta_keywords(keywords)
    content_for(:meta_keywords, keywords)
  end

  def meta_author(author)
    content_for(:meta_author, author)
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

  def load_image object, css_class = "", image = nil
    images = object.try(:images) || [object.try(:image)]
    if images.any?
      image_tag images.first.url, class: "img wth-100 #{css_class}"
    else
      object_image_default = Settings.image_default["#{object.class.name.downcase}"]
      image_tag (image || object_image_default || Settings.image_default.default),
        class: "img wth-100 #{css_class}"
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
