require "sshkit/sudo"

# Load DSL and set up stages
require "capistrano/setup"

# Include default deployment tasks
require "capistrano/deploy"

# Include capistrano-rails
require "capistrano/rails"
require "capistrano/rvm"
require "capistrano/bundler"
require "capistrano/rails/migrations"
require "capistrano/rails/assets"
require "capistrano/puma"
require "capistrano/puma/nginx"
# require "capistrano/nginx"
require "capistrano/upload-config"
install_plugin Capistrano::Puma  # Default puma tasks
install_plugin Capistrano::Puma::Nginx  # if you want to upload a nginx site template

# Load DSL and set up stages
require "capistrano/setup"

# Include default deployment tasks
require "capistrano/deploy"

require "capistrano/scm/git"
require "capistrano/sitemap_generator"

install_plugin Capistrano::SCM::Git

# Load custom tasks from `lib/capistrano/tasks` if you have any defined
Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }
