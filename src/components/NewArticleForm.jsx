import React, { Component } from 'react';
import { addNewArticle } from './Api';
import { Container } from 'react-bootstrap';

class NewArticleForm extends Component {
  state = { body: '', title: '', topic: '' };

  render() {
    return (
      <div>
        <Container>
          <form onSubmit={this.handleSubmit} className="form-inline">
            <input
              placeholder="type article title here"
              type="text"
              onChange={this.handleChange}
              name="title"
              required={true}
              className="form-control mr-sm-2"
            />
            <input
              placeholder="type article topic here"
              type="text"
              onChange={this.handleChange}
              name="topic"
              required={true}
              className="form-control mr-sm-2"
            />
            <input
              placeholder="type your article here"
              type="text"
              onChange={this.handleChange}
              name="body"
              required={true}
              className="form-control mr-sm-2"
            />
            <button type="button" className="btn btn-outline-success">
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
