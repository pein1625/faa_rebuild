Rails.application.routes.draw do
  devise_for :admins, controllers: {sessions: "sessions"}, skip: :registrations
  root "home#index"
  get "tags/:tag", to: "news#index", as: :tag

  namespace :v1 do
    devise_scope :admin do
      post "sign_up", :to => "registrations#create"
      post "sign_in", :to => "sessions#create"
      delete "sign_out", :to => "sessions#destroy"
    end
    resources :news_categories
    resources :feedbacks, only: [:index, :destroy]
    resources :courses
    resources :course_schedules
    resources :users
    resources :newses
    resources :registration_courses
    resources :temporary_registrations, only: [:index, :destroy, :update]
  end

  namespace :admin do
    get "(*all)", to: "courses#index"
  end

  resources :educations, only: :index, path: "quan-ly-dao-tao"
  resources :courses, only: [:index, :show], path: "khoa-hoc"
  resources :feedbacks, only: :create
  get "lien-he", to: "feedbacks#new", as: :new_feedback
  resources :trainers, only: [:show, :index], path: "giang-vien"
  resources :registrations, only: :create
  get "dang-ky-lop-hoc", to: "registrations#new", as: :new_registration
  resources :news, only: [:index, :show], path: "tin-tuc"
  resources :course_schedules, only: [:index, :show], path: "lich-khai-giang"
  resources :temporary_registrations, only: :create
  get "dang-ky-khoa-hoc", to: "temporary_registrations#new", as: :new_temporary_registration

  devise_scope :admin do
    get "/sign_up" => "devise/registrations#new", as: "new_user_registration"
  end
end
