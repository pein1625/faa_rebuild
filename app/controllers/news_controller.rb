class NewsController < ApplicationController
  before_action :load_news, only: :show
  before_action :popular_courses

  def index
    @newses = News.includes(:image).newest.page(params[:page])
      .per Settings.news.per_page
  end

  def show; end

  private

  def load_news
    @news = News.friendly.find params[:id]
  rescue ActiveRecord::RecordNotFound
    handle_record_not_found
  end
end
