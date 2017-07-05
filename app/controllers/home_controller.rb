class HomeController < ApplicationController
  def index
    @courses = Course.newest.limit Settings.home.courses_limit
    @trainers = User.trainers.limit Settings.home.trainers_limit
  end
end
