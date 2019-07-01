import React, { Component } from 'react';
import { patchArticleVotes, patchComment } from './Api';

class Voter extends Component {
  state = { voteChange: 0 };

  render() {
    const { voteChange } = this.state;
    const { votes, loggedInUser, handleDelete, id, author } = this.props;
    return (
      <div>
        <h6>Likes: {votes + voteChange}</h6>
        <br />
        <div className="d-flex justify-content-around">
          <button
            disabled={voteChange === 1}
            onClick={() => this.handleVote(1)}
            className="btn btn-outline-primary order-1"
          >
            Like
          </button>
          <button
            disabled={voteChange === -1}
            onClick={() => this.handleVote(-1)}
            className="btn btn-outline-warning order-3"
          >
            Unlike
          </button>
          {loggedInUser === author && (
            <button
              type="submit"
              onClick={() => handleDelete(id)}
              className="btn btn-danger order-2"
            >
              delete
            </button>
          )}
        </div>
      </div>
    );
  }
  handleVote = direction => {
    const { id, type } = this.props;
    this.setState(prevState => {
      return { voteChange: prevState.voteChange + direction };
    });
    if (type === 'article') {
      patchArticleVotes(id, direction);
    } else if (type === 'comments') {
      patchComment(id, direction);
    }
  };
}

export default Voter;
