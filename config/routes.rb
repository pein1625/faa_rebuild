Rails.application.routes.draw do
  root "home#index"
  get "tags/:tag", to: "news#index", as: :tag

  api_version(module: "V1", path: {value: "v1"}, default: true) do
    resources :certifications
    resources :news_categories
    resources :feedbacks, only: [:index, :destroy]
  end

  namespace :admin do
    get "(*all)", to: "certifications#index"
  end

  resources :courses, only: [:index, :show]
  resources :feedbacks, only: [:new, :create]
  resources :trainers, only: [:show, :index]
  resources :registrations, only: [:new, :create]
  resources :news, only: [:index, :show]
end
