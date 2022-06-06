module Types
  class VoteType < Types::BaseObject
    field :id, ID, null: false
    field :post_id, Int, null: false
    field :user_id, Int, null: false
  end
end
