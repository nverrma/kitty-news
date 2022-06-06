import * as React from 'react';;
import gql from 'graphql-tag';
import { useQuery, useMutation } from 'react-apollo';
import renderComponent from './utils/renderComponent';

const ADD_VOTE = gql`
  mutation($postId: Int!) {
    VoteCreate(
      postId: $postId
    ) {
      postId,
      success
    }
  }`;

const DELETE_VOTE = gql`
  mutation($id: Int!) {
    VoteDelete(
      id: $id
    ) {
      id,
      success
    }
  }`;

function useVote() {
  const [addVote] = useMutation(ADD_VOTE)
  const [deleteVote] = useMutation(DELETE_VOTE)

  async function updateVote(post, user) {
    if(user){
      const voteExists = user && post.votes.filter(function(vote) { return vote.userId === user.id })[0]

      if(voteExists) {
        await deleteVote({variables: { id: Number(voteExists.id) }})
      }
      else {
        await addVote({ variables: { postId: Number(post.id) } })
      }
    }
    else {
      window.location.href = window.location.origin + '/users/sign_in';
    }
  }
  return updateVote;
}

export default useVote;
