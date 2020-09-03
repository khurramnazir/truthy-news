import React, { Component } from "react";
import * as api from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

class Voter extends Component {
  state = {
    optimisticVotes: 0,
  };
  render() {
    const { votes } = this.props;
    const { optimisticVotes } = this.state;
    return (
      <section>
        Votes:
        {votes + optimisticVotes}
        <br />
        <button
          onClick={(event) => this.updateVote(1)}
          disabled={optimisticVotes === 1}
        >
          {" "}
          <FontAwesomeIcon
            color="rgb(51, 102, 153)"
            size="2x"
            icon={faChevronUp}
          />
        </button>
        <button
          onClick={(event) => this.updateVote(-1)}
          disabled={optimisticVotes === -1}
        >
          <FontAwesomeIcon
            color="rgb(51, 102, 153)"
            size="2x"
            icon={faChevronDown}
          />
        </button>
      </section>
    );
  }

  updateVote = (vote) => {
    api.patchVotes(this.props.id, vote, this.props.type);
    this.setState((currentState) => {
      return { optimisticVotes: currentState.optimisticVotes + vote };
    });
  };
}

export default Voter;
