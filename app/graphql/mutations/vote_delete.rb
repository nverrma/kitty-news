module Mutations
  class VoteDelete < Mutations::BaseMutation
    null false

    argument :id, Int, required: true

    field :id, Int, null: true
    field :success, Boolean, null: true

    def resolve(id:)
      require_current_user!

      user = context[:current_user]
      vote = Vote.find_by(id: id)

      if vote && vote.destroy
        {
          success: true,
          errors: nil
        }
      else
        {
          success: false
        }
      end
    end
  end
end
