class NewsController < ApplicationController
  before_action :load_news, only: :show
  before_action :load_news_categories, only: [:index, :show]
  before_action :popular_courses
  before_action :latest_news
  before_action :popular_tags

  def index
    @newses = load_news_by_category || load_news_by_tags
  end

  def show; end

  private

  def load_news
    @news = News.find_by id: params[:id]
    return if @news
    flash[:error] = t ".not_found"
    redirect_to news_index_path
  end

  def load_news_categories
    @news_categories = NewsCategory.all
  end

  def load_news_by_category
    category = NewsCategory.find_by name: params[:news_category]
    return unless category
    category.news.includes(:images).page(params[:page])
      .per Settings.news.per_page
  end

  def load_news_default
    News.includes(:images).newest.page(params[:page])
      .per Settings.news.per_page
  end

  def load_news_by_tags
    if params[:tag]
      News.includes(:images).tagged_with(params[:tag]).page(params[:page])
        .per Settings.news.per_page
    else
      load_news_default
    end
  end
end
