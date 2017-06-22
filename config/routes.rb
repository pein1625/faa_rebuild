Rails.application.routes.draw do
  root "home#index"

  api_version(module: "V1", path: {value: "v1"}, default: true) do
    resources :certifications
  end

  namespace :admin do
    get "certifications/(*all)", to: "certifications#index"
  end

  resources :courses, only: [:index, :show]
  resources :feedbacks, only: [:new, :create]
  resources :trainers, only: [:show, :index]
end
