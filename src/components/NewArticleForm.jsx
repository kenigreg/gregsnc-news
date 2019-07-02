import React, { Component } from 'react';
import { addNewArticle } from './Api';
import { Container } from 'react-bootstrap';
import Error from './Error';
import { navigate } from '@reach/router';

class NewArticleForm extends Component {
  state = { body: '', title: '', topic: '', errArticleForm: null };

  render() {
    const { errArticleForm, body, title } = this.state;
    const { topic } = this.props;

    const msg = errArticleForm && errArticleForm.response.data.msg;

    if (errArticleForm) return <Error msg={msg} />;

    return (
      <div className="d-flex justify-content-center">
        <Container>
          {topic ? (
            <h4>Add an article on {topic}</h4>
          ) : (
            <h4>Add an article on any topic</h4>
          )}
          <form className="form-inline">
            <input
              required
              placeholder="type article title here"
              value={title}
              type="text"
              onChange={this.handleChange}
              name="title"
              className="form-control mb-2 mr-sm-2"
            />

            {topic ? (
              <input
                required
                placeholder={topic}
                type="text"
                onChange={this.handleChange}
                name="topic"
                className="form-control mb-2 mr-sm-2"
                value={topic}
              />
            ) : (
              <select
                onChange={this.handleChange}
                name="topic"
                className="form-control mb-2 mr-sm-2 dropdown"
              >
                <option value="">-- Select a topic --</option>
                <option value={topic}>coding</option>
                <option value={topic}>football</option>
                <option value={topic}>cooking</option>
              </select>
            )}

            <input
              placeholder="type your article here"
              value={body}
              type="text"
              onChange={this.handleChange}
              name="body"
              className="form-control mb-2 mr-sm-2"
              required
            />
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </form>
        </Container>
      </div>
    );
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    const { loggedInUser, addArticle } = this.props;
    const { body, title, topic } = this.state;

    event.preventDefault();
    const articleToPost = {
      body: body,
      username: loggedInUser,
      title: title,
      topic: topic
    };
    this.setState({ body: '', title: '', topic: '' });
    addNewArticle(articleToPost)
      .then(article => {
        addArticle(article);
        navigate(`/articles/${article.article_id}`);
      })
      .catch(err => {
        this.setState({ err });
      });
  };
}

export default NewArticleForm;
