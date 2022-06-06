module Types
  class CommentType < Types::BaseObject
    field :id, ID, null: false
    field :text, String
    field :user_id, Int, null: false
    field :post_id, Int, null: false
  end
end
