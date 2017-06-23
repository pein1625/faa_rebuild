class V1::NewsCategoriesController < V1::ApiController
  before_action :load_news_category, only: [:edit, :update, :destroy]

  def index
    response_success nil, NewsCategory.all
  end

  def edit
    response_success nil, @news_category
  end

  def update
    if @news_category.update_attributes(news_category_params)
      response_success t(".save_success"), @news_category
    else
      response_error t(".save_failed"), @news_category.errors.full_messages
    end
  end

  def create
    @news_category = NewsCategory.new news_category_params
    if @news_category.save
      response_success t(".add_success"), @news_category
    else
      response_error t(".add_failed"), @news_category.errors.full_messages
    end
  end

  def destroy
    if @news_category.destroy
      response_success t(".delete_success"), @news_category
    else
      response_error t(".delete_failed"), nil
    end
  end

  private

  def load_news_category
    return if @news_category = NewsCategory.find_by(id: params[:id])
    response_not_found t(".not_found"), nil    
  end

  def news_category_params
    params.permit :name, :description
  end
end
