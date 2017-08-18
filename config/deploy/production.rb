set :nginx_server_name, "awesome-academy.com"
set :puma_threads, [5, 16]
set :puma_workers, 3
set :branch, "deploy"
set :rails_env, "production"
set :bundle_flags, "--no-deployment"

role :app, ["deploy@172.104.163.72"]
role :web, ["deploy@172.104.163.72"]
role :db, ["deploy@172.104.163.72"]

server "172.104.163.72", user: "deploy", roles: %w{web app db}, primary: true
