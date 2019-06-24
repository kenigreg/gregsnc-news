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

export const patchArticle = (article_id, direction) => {
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
