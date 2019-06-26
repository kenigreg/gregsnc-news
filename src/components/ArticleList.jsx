import React from 'react';
import { Link } from '@reach/router';
import Moment from 'react-moment';

const ArticleList = props => {
  const { articles } = props;

  return (
    <div>
      {articles.map(article => {
        return (
          <div
            key={`article${article.article_id}`}
            className="card border-dark mb-3"
          >
            <div className="card-body">
              <Link to={`/articles/${article.article_id}`}>
                <h4>Title: {article.title}</h4>
              </Link>
              <p>
                written by: {article.author} <br /> created:{' '}
                <Moment fromNow>{article.created_at}</Moment>
              </p>
              <p>Topic: {article.topic}</p>
            </div>
            <div className="card-footer">
              <p>Votes: {article.votes}</p>
              <p>Comments: {article.comment_count}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleList;
