import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: '',
      done: false,
    };

  }

  componentDidMount() {
    const { todoItem } = this.props;
    this.setState({ activity: todoItem, done: false });
  }

  handleClick() {
    this.setState({ done: true });
    const { activity, done } = this.state;
    const { handleItemClick } = this.props;
    handleItemClick(activity, done);
  }

  handleKeyPress(e) {
    if (!e.keyCode === 13) return '';
    return this.handleClick(e);
  }

  render() {
    const { activity } = this.state;
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={e => this.handleClick(e)}
        onKeyPress={e => this.handleKeyPress(e)}
      >
        <article className="toDo__card">
          <h2>{activity}</h2>
        </article>
      </div>
    );
  }
}
Card.propTypes = {
  todoItem: PropTypes.string,
  handleItemClick: PropTypes.func.isRequired,
};
Card.defaultProps = {
  todoItem: '',
};
