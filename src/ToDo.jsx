import React, { Component } from 'react';
import ToDoInput from './ToDoInput';
import Card from './Card';
import './ToDo.css';

export default class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onGoing: [],
      done: [],
      id: 0,
    };
    this.addItemToList = this.addItemToList.bind(this);
    this.switchList = this.switchList.bind(this);
    this.removeItemFromState = this.removeItemFromState.bind(this);
  }

  addItemToList(item) {
    const { onGoing } = this.state;
    const newItemAdded = onGoing.concat({
      activity: item,
      completed: false,
      id: this.generateID(),
    });
    this.setState({ onGoing: newItemAdded });
  }

  generateID() {
    let { id } = this.state;
    this.setState({ id: id += 1 });
    return id.toString();
  }

  findItemInList(nameOfList, activity) {
    const { [nameOfList]: list } = this.state;
    const checkIndex = list.findIndex(item => item.activity === activity);
    if (!checkIndex && checkIndex !== 0) return '';
    return checkIndex;
  }

  updateList(prevListName, newListName, prevIndex) {
    const { [prevListName]: prevList, [newListName]: newList } = this.state;
    prevList[prevIndex].completed = !prevList[prevIndex].completed;
    const addItemToNewList = [...newList, prevList[prevIndex]];
    const updatePrevList = prevList.filter(item => item !== prevList[prevIndex]);
    return { updatedPrev: updatePrevList, updatedNew: addItemToNewList };
  }

  switchList(activity, finished) {
    let activityIndex = 0;
    let prevList = '';
    let newList = '';
    if (!finished) {
      prevList = 'onGoing';
      newList = 'done';
      activityIndex = this.findItemInList('onGoing', activity);
      const { updatedPrev, updatedNew } = this.updateList(prevList, newList, activityIndex);
      this.setState({ [prevList]: updatedPrev, [newList]: updatedNew });
    } else {
      prevList = 'done';
      newList = 'onGoing';
      activityIndex = this.findItemInList('done', activity);
      const { updatedPrev, updatedNew } = this.updateList(prevList, newList, activityIndex);
      updatedNew.sort((a, b) => a.id - b.id);
      this.setState({ [prevList]: updatedPrev, [newList]: updatedNew });
    }
  }

  removeItemFromState(activity) {
    const { done } = this.state;
    const itemRemoved = done.filter(item => item.activity !== activity);
    this.setState({ done: itemRemoved });
  }

  checkValidationRender(list, itemDone) {
    if (!list) return '';
    return (
      list.map(item => (
        <Card
          key={item.id.toString()}
          todoItem={item.activity}
          handleItemClick={this.switchList}
          itemDone={itemDone}
          removeItemHandler={this.removeItemFromState}
        />
      )));
  }

  render() {
    const { onGoing, done } = this.state;
    return (
      <main className="toDo__board">
        <h1 className="toDo__title">
          ToDo App React version
          <span role="img" aria-label="watermelon emoji">🍉</span>
        </h1>
        <ToDoInput handleItem={this.addItemToList} />
        <h2 className="todo__board--onGoing">OnGoing</h2>
        {this.checkValidationRender(onGoing, false)}
        <h2 className="todo__board--done">Done</h2>
        {this.checkValidationRender(done, true)}

      </main>
    );
  }
}
