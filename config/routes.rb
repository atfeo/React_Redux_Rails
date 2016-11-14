Rails.application.routes.draw do
  root 'top#index'

  namespace :api, format: 'json' do
    resources :tasks
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
