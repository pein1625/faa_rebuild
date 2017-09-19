# config valid only for current version of Capistrano
lock "3.9.0"

set :application, "faa"
set :repo_url, "git@github.com:framgia/faa_rebuild.git"
set :branch, "deploy"

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/usr/local/rails_apps/faa_production"

# Default value for :pty is false
set :pty, true

# Default value for :linked_files is []
set :linked_files, fetch(:linked_files, []).push("config/database.yml", "config/secrets.yml", "config/puma.rb")
# Default value for linked_dirs is []
set :linked_dirs, fetch(:linked_dirs, []).push("log", "tmp/pids", "tmp/cache", "tmp/sockets", "vendor/bundle", "public/system", "public/uploads")
set :config_files, %w{config/database.yml config/secrets.yml}

# Default value for keep_releases is 5
set :keep_releases, 3

# Puma:
set :puma_conf, "#{shared_path}/config/puma.rb"

namespace :deploy do
  before "check:linked_files", "puma:config"
  # before "check:linked_files", "puma:nginx_config"
  # after "puma:smart_restart", "nginx:restart"

  desc "Copy files from application to shared directory"
  ## copy the files to the shared directories
  task :copy_config_files do
    on roles(:app) do
      fetch(:config_files).each do |filename|
        remote_path = File.join shared_path, filename
        upload! filename, remote_path
      end
    end
  end

 # desc "create database"
 #  task :create_database do
 #    on roles(:db) do |host|
 #      within "#{release_path}" do
 #        with rails_env: ENV["RAILS_ENV"] do
 #          execute :rake, "db:create"
 #        end
 #      end
 #    end
 #  end
 #  before :migrate, :create_database
end

