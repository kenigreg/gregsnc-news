import axios from 'axios';

export const getArticles = () => {
  const url = 'https://gregs-ncnews.herokuapp.com/api/articles';
  return axios.get(url).then(({ data: { articles } }) => {
    return articles;
  });
};

export const sortArticles = sortBy => {
  const url = 'https://gregs-ncnews.herokuapp.com/api/articles';
  return axios
    .get(url, {
      params: { sort_by: sortBy }
    })
    .then(({ data: { articles } }) => {
      return articles;
    });
};

export const getSingleArticle = article_id => {
  const url = `https://gregs-ncnews.herokuapp.com/api/articles/${article_id}`;
  return axios.get(url).then(({ data: { article } }) => {
    return article;
  });
};

export const getUsername = userInput => {
  const url = `https://gregs-ncnews.herokuapp.com/api/users/${userInput}`;
  return axios.get(url).then(({ data: { user } }) => {
    return user;
  });
};

export const addNewArticle = articleToPost => {
  const url = 'https://gregs-ncnews.herokuapp.com/api/articles';
  return axios.post(url, articleToPost).then(({ data: { article } }) => {
    return article;
  });
};

export const patchArticleVotes = (article_id, direction) => {
  const myUrl = `https://gregs-ncnews.herokuapp.com/api/articles/${article_id}`;

  return axios
    .patch(myUrl, { inc_votes: direction })
    .then(({ data: { article } }) => {
      return article;
    });
};

export const getUsers = loggedInUser => {
  const url = `https://gregs-ncnews.herokuapp.com/api/users/${loggedInUser}`;

  return axios.get(url).then(({ data: { user } }) => {
    return user;
  });
};

export const deleteComment = comment_id => {
  const dUrl = `https://gregs-ncnews.herokuapp.com/api/comments/${comment_id}`;
  return axios.delete(dUrl).then(({ data: { comment } }) => {
    return comment;
  });
};

export const patchComment = (comment_id, direction) => {
  const url = `https://gregs-ncnews.herokuapp.com/api/comments/${comment_id}`;

  return axios
    .patch(url, { inc_votes: direction })
    .then(({ data: { comment } }) => {
      return comment;
    });
};

export const addNewComment = (commentToPost, article_id) => {
  const url = `https://gregs-ncnews.herokuapp.com/api/articles/${article_id}/comments`;
  return axios.post(url, commentToPost).then(({ data: { comment } }) => {
    return comment;
  });
};

export const getCommentsByArticleId = articleId => {
  const url = `https://gregs-ncnews.herokuapp.com/api/articles/${articleId}/comments`;
  return axios.get(url).then(({ data: { comments } }) => {
    return comments;
  });
};

export const getTopics = () => {
  const url = 'https://gregs-ncnews.herokuapp.com/api/topics';
  return axios.get(url).then(({ data: { topics } }) => {
    return topics;
  });
};
