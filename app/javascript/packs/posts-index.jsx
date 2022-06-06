import * as React from 'react';;
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import renderComponent from './utils/renderComponent';
import useVote from './useVote';

const QUERY = gql`
  query PostsPage {
    viewer {
      id
    }
    postsAll {
      id
      title
      tagline
      url
      commentsCount
      comments {
        id
        text
        userId
        postId
      }
      votes {
        id
        userId
        postId
      }
    }
  }
`;

function PostsIndex({ user }) {
  const { data, loading, success, error, refetch } = useQuery(QUERY, {
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true
  });

  const posts = data ? data.postsAll : []
  const updateVote = useVote()

  async function handleVote(post, user) {
    await updateVote(post, user);
    refetch();
  }

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  function highlightPost(post, user){
    const voteExists = checkUserVote(post, user)
    return voteExists ? 'highlight' : 'no-highlight'   
  }

  function checkUserVote(post, user){
    return user && post.votes.filter(function(vote) { return vote.userId === user.id })[0]
  }

  return (
    <div className="box">
      {posts.map((post) => (
        <article className="post" key={post.id}>
          <h2 className={highlightPost(post, user)}>
            <a href={`/posts/${post.id}`}>{post.title}</a>
          </h2>
          <div className="url">
            <a href={post.url}>{post.url}</a>
          </div>
          <div className="tagline">{post.tagline}</div>
          <footer>
            <button onClick={() => handleVote(post, user)}>🔼 {post.votes.length}</button>
            <button>💬 {post.comments.length}</button>
          </footer>
        </article>
      ))}
    </div>
  );
}

renderComponent(PostsIndex);
