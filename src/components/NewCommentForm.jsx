import React from 'react';
import { addNewComment } from './Api';
import Error from './Error';

class NewCommentForm extends React.Component {
  state = { body: '', errComment: null };

  render() {
    const { errComment, body } = this.state;
    const msg = errComment && errComment.response.data.msg;

    if (errComment) return <Error msg={msg} />;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label className="mr-sm-2">Add a comment</label>
          <textarea
            placeholder="post a comment"
            type="text"
            value={body}
            onChange={this.handleChange}
            name="body"
            className="form-control"
            rows="3"
            required
          />
          <br />
          <button className="btn btn-success float-right">Submit</button>
        </form>
      </div>
    );
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const commentToPost = {
      body: this.state.body,
      username: this.props.loggedInUser
    };

    addNewComment(commentToPost, this.props.article_id)
      .then(comment => {
        this.props.addComment(comment);
      })
      .catch(err => {
        this.setState({ err });
      });
    this.setState({ body: '' });
  };
}

export default NewCommentForm;
