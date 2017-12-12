class SitemapsController < ApplicationController
  def new
    redirect_to "#{sitemap_host}sitemaps/sitemap.xml.gz"
  end

  private
  def sitemap_host
    Rails.env.production? ? Settings.cloudfront_url : Settings.local_cloudfront_url
  end
end
