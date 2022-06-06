module Mutations
  class VoteCreate < Mutations::BaseMutation
    null false

    argument :postId, Int, required: true

    field :postId, Int, null: true
    field :success, Boolean, null: true

    def resolve(postId:)
      require_current_user!

      user = context[:current_user]
      vote = user.votes.new(post_id: postId)

      if vote.save
        {
          vote: vote,
          success: true,
          errors: [],
        }
      else
        {
          success: false,
          errors: vote.errors.full_messages
        }
      end
    end
  end
end
