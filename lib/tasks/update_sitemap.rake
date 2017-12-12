namespace :update_sitemap do
  task refresh: :environment do
    puts "Start update sitemap"
    %x[DEPLOY_REF=master bundle exec cap #{Rails.env} sitemap:refresh]
    SitemapGenerator::Sitemap.ping_search_engines("https://awesome-academy.com/sitemap.xml.gz")
    puts "Finished update sitemap"
  end
end
