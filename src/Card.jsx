import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export default class Card extends Component {
  handleClick(e) {
    if (e.target.innerHTML === 'Delete') return this.handleDelete();
    const { todoItem } = this.props;
    const { handleItemClick, itemDone } = this.props;
    return handleItemClick(todoItem, itemDone);
  }

  handleKeyPress(e) {
    if (!e.keyCode === 13) return '';
    return this.handleClick(e);
  }

  handleDelete() {
    const { todoItem, removeItemHandler, itemDone } = this.props;
    if (itemDone) removeItemHandler(todoItem);
  }

  render() {
    const { todoItem, itemDone } = this.props;
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={e => this.handleClick(e)}
        onKeyPress={e => this.handleKeyPress(e)}
      >
        <article className="toDo__card">
          <h2 className="toDo__card__activity">{todoItem}</h2>
          {itemDone ? (
            <button type="button" className="toDo__btn--delete" onClick={e => this.handleDelete(e)}>
              Delete
            </button>
          )
            : ''}
        </article>
      </div>
    );
  }
}
Card.propTypes = {
  todoItem: PropTypes.string,
  itemDone: PropTypes.bool,
  handleItemClick: PropTypes.func.isRequired,
  removeItemHandler: PropTypes.func.isRequired,
};
Card.defaultProps = {
  todoItem: '',
  itemDone: false,
};
