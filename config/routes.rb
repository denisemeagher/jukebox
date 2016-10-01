Rails.application.routes.draw do
  get 'album/index'

  root 'album#index'
end
