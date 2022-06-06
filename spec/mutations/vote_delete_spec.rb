require 'rails_helper'

describe Mutations::VoteDelete do
  let(:object) { :not_used }
  let(:user) { create :user, name: 'name' }
  let(:post) { create :post }
  let(:vote) { create(:vote, user_id: user.id, post_id: post.id)}

  def call(current_user:, context: {}, **args)
    context = Utils::Context.new(
      query: OpenStruct.new(schema: KittynewsSchema),
      values: context.merge(current_user: current_user),
      object: nil,
    )
    described_class.new(object: nil, context: context, field: nil).resolve(args)
  end

  it 'deletes the vote' do
    result = call(current_user: user, id: vote.id)

    expect(result[:errors]).to eq nil
    expect(result[:success]).to eq true
  end

  it 'requires vote id' do
    result = call(current_user: user, id: nil)

    expect(result).to eq success: false
  end

  it 'requires a logged in user' do
    expect { call(current_user: nil, id: 1) }.to raise_error GraphQL::ExecutionError, 'current user is missing'
  end
end
