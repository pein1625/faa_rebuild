Rails.application.routes.draw do
  root "home#index"

  api_version(module: "V1", path: {value: "v1"}, default: true) do
    resources :certifications
  end

  namespace :admin do
    resources :certifications
  end

  resources :courses, only: [:index, :show]
  resources :feedbacks, only: [:new, :create]
end
