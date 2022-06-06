import * as React from 'react';
import renderComponent from './utils/renderComponent';

function PostsShow(props) {
  const post = props ? props.post : null
  const user = props ? props.user : null

  return (
    <>
      <div className="box">
        <strong>{post.title} with id {post.id}.</strong>
        <br />
        <em>{post.tagline}</em>
      </div>
      <div className="box">
        <article className="post">
          <h2>
            <a href={`/posts/${post.id}`}>{post.title}</a>
          </h2>
          <div className="url">
            <a href={post.url} target="_blank">
              {post.url}
            </a>
          </div>
          <div className="tagline">{post.tagline}</div>
          <footer>
            {post.votes.length}<button>🔼</button> comments: {post.comments.length} | author: {user.name}
          </footer>
        </article>
      </div>
      <div className="box">
        {post.comments.length > 0 ? 
          <h2>Comments</h2> : null
        }
        {post.comments.map((comment) => {
          return (
            <>
              <strong key={comment.id}>{comment.text}</strong><br/><br/>
            </>
          )
        })}
      </div>
    </>
  );
}

renderComponent(PostsShow);
