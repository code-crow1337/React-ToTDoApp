import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ToDoInput.css';

export default class ToDoInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      message: 'Add Item',
    };

    this.validateValue = this.validateValue.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  validateValue() {
    const { value } = this.state;
    return !!value;
  }

  handleAddItem(e) {
    e.preventDefault();
    const { value } = this.state;
    const { handleItem } = this.props;
    if (!this.validateValue()) return this.setState({ message: 'An item must be specified' });
    handleItem(value);
    this.setState({ value: '' });
    return '';
  }

  render() {
    const { value, message } = this.state;
    return (
      <>
        <form className="toDo__form" onSubmit={this.handleAddItem} id="addItemForm">
          <input
            className="todo__form__input"
            id="addItem"
            placeholder={message}
            type="text"
            value={value}
            onChange={e => this.setState({ value: e.target.value })}
          />
          <button className="todo__form__btn" type="submit" form="addItemForm">Add</button>
        </form>
      </>
    );
  }
}
ToDoInput.propTypes = {
  handleItem: PropTypes.func.isRequired,
};
