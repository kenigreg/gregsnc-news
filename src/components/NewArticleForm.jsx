import React, { Component } from 'react';
import { addNewArticle } from './Api';
import { Container } from 'react-bootstrap';
import Error from './Error';

class NewArticleForm extends Component {
  state = { body: '', title: '', topic: '', err: null };

  render() {
    const { err } = this.state;
    const { topic } = this.props;

    const msg = err && err.response.data.msg;

    if (err) return <Error msg={msg} />;

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
              placeholder="type article title here"
              type="text"
              onChange={this.handleChange}
              name="title"
              className="form-control mb-2 mr-sm-2"
              required
            />

            <input
              placeholder={topic ? topic : 'type article topic here'}
              type="text"
              onChange={this.handleChange}
              name="topic"
              className="form-control mb-2 mr-sm-2"
              value={topic ? topic : topic}
              required
            />

            <input
              placeholder="type your article here"
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
    addNewArticle(articleToPost)
      .then(article => {
        addArticle(article);
      })
      .catch(err => {
        this.setState({ err });
      });
  };
}

export default NewArticleForm;
