import React, { Component } from 'react';
import ToDoInput from './ToDoInput';
import Card from './Card';
import './ToDo.css';

export default class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      id: 0,
    };
    this.addItemToList = this.addItemToList.bind(this);
    this.switchList = this.switchList.bind(this);
    this.removeItemFromState = this.removeItemFromState.bind(this);
  }

  addItemToList(item) {
    const { items } = this.state;
    const newItemAdded = items.concat({
      activity: item,
      completed: false,
      id: this.generateID(),
    });
    this.setState({ items: newItemAdded });
  }

  generateID() {
    let { id } = this.state;
    this.setState({ id: id += 1 });
    return id.toString();
  }

  switchList(idOfClickedItem) {
    const { items } = this.state;
    const updatedList = items.map(item => {
      if (item.id === idOfClickedItem) {
        item.completed = !item.completed;
      }
      return item;
    });
    this.setState({ items: updatedList });
  }

  removeItemFromState(id) {
    console.log(id);
    const { items } = this.state;
    const itemRemoved = items.filter(item => item.id !== id);
    console.log('filter', itemRemoved);
    this.setState({ items: itemRemoved });
  }

  checkValidationRender() {
    const { items } = this.state;
    if (!items) return '';

    const done = items.filter(item => item.completed).map(item => (
      <Card
        key={item.id.toString()}
        todoItem={item.activity}
        handleItemClick={this.switchList}
        itemDone={item.completed}
        id={item.id}
        removeItemHandler={this.removeItemFromState}
      />
    ));
    const onGoing = items.filter(item => !item.completed).map(item => (
      <Card
        key={item.id.toString()}
        todoItem={item.activity}
        id={item.id}
        handleItemClick={this.switchList}
        itemDone={item.completed}
        removeItemHandler={this.removeItemFromState}
      />
    ));
    return { done, onGoing };
  }

  render() {
    const { done, onGoing } = this.checkValidationRender();
    return (
      <main className="toDo__board">
        <h1 className="toDo__title">
          ToDo App
          <br />
          React version
          <span role="img" aria-label="watermelon emoji">🍉</span>
        </h1>
        <ToDoInput handleItem={this.addItemToList} />
        <h2 className="todo__board--onGoing">OnGoing</h2>
        {onGoing}
        <h2 className="todo__board--done">Done</h2>
        {done}
      </main>
    );
  }
}
