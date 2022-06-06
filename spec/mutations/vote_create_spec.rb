require 'rails_helper'

describe Mutations::VoteCreate do
  let(:object) { :not_used }
  let(:user) { create :user, name: 'name' }
  let(:post) { create :post }

  def call(current_user:, context: {}, **args)
    context = Utils::Context.new(
      query: OpenStruct.new(schema: KittynewsSchema),
      values: context.merge(current_user: current_user),
      object: nil,
    )
    described_class.new(object: nil, context: context, field: nil).resolve(args)
  end

  it 'created the vote' do
    result = call(current_user: user, postId: post.id)

    expect(result[:errors]).to eq []
    expect(result[:success]).to eq true
    expect(result[:vote].post_id).to eq (post.id)
    expect(result[:vote].user_id).to eq (user.id)
  end

  it 'requires post' do
    result = call(current_user: user, postId: nil)

    expect(result).to eq errors: ["Post must exist"], success: false
  end

  it 'requires a logged in user' do
    expect { call(current_user: nil, postId: post.id) }.to raise_error GraphQL::ExecutionError, 'current user is missing'
  end
end
