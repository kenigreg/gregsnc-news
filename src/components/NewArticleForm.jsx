import React, { Component } from 'react';
import { addNewArticle } from './Api';
import { Container } from 'react-bootstrap';

class NewArticleForm extends Component {
  state = { body: '', title: '', topic: '' };

  render() {
    return (
      <div>
        <Container>
          <h4>Add an article</h4>
          <form className="form-inline">
            <input
              placeholder="type article title here"
              type="text"
              onChange={this.handleChange}
              name="title"
              className="form-control mr-sm-2"
              required
            />
            <input
              placeholder="type article topic here"
              type="text"
              onChange={this.handleChange}
              name="topic"
              className="form-control mr-sm-2"
              required
            />
            <input
              placeholder="type your article here"
              type="text"
              onChange={this.handleChange}
              name="body"
              className="form-control mr-sm-2"
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
    addNewArticle(articleToPost).then(article => {
      addArticle(article);
    });
  };
}

export default NewArticleForm;
