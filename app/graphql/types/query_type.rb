module Types
  class QueryType < Types::BaseObject
    field :posts_all, [PostType], null: false

    field :viewer, ViewerType, null: true

    def posts_all
      Post.reverse_chronological.all.as_json(include: [:comments, :votes])
    end

    def viewer
      context.current_user
    end
  end
end
