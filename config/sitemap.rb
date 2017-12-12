# Set the host name for URL creation
SitemapGenerator::Sitemap.default_host = "https://awesome-academy.com/"

SitemapGenerator::Sitemap.create do
  # Put links creation logic here.
  #
  # The root path '/' and sitemap index file are added automatically for you.
  # Links are added to the Sitemap in the order they are specified.
  #
  # Usage: add(path, options={})
  #        (default options are used if you don't specify)
  #
  # Defaults: :priority => 0.5, :changefreq => 'weekly',
  #           :lastmod => Time.now, :host => default_host
  #
  # Examples:
  #
  # Add '/articles'
  #
  #   add articles_path, :priority => 0.7, :changefreq => 'daily'
  #
  # Add all articles:
  #
  #   Article.find_each do |article|
  #     add article_path(article), :lastmod => article.updated_at
  #   end

  add root_path, changefreq: "weekly"
  add courses_path, changefreq: "weekly"
  add new_feedback_path, changefreq: "weekly"
  add trainers_path, changefreq: "weekly"
  add course_schedules_path, changefreq: "weekly"

  Course.find_each do |course|
    add course_path(course), changefreq: "weekly", lastmod: course.updated_at

    course.course_schedules.each do |course_schedule|
      add course_schedule_path(course_schedule), changefreq: "monthly", lastmod: course_schedule.updated_at
    end
  end
end
