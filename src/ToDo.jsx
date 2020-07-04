import React, { Component } from 'react';
import ToDoInput from './ToDoInput';
import PropTypes from 'prop-types';
import Card from './Card';
import './ToDo.css';

export default class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onGoing: [],
      done: [],
      uniqKey: 0,
    };
    this.addItemToList = this.addItemToList.bind(this);
    this.switchList = this.switchList.bind(this);
  }

  addItemToList(item) {
    const { onGoing } = this.state;
    const newItemAdded = onGoing.concat({ activity: item });
    this.setState({ onGoing: newItemAdded });
  }

  addToList(list, activity) {
    console.log('acitivity dosent exist');
    console.log(list);
    const { [list]: value } = this.state;
    this.setState({ [list]: activity });
  }

  findItemInList(list, activity) {
    const checkIndex = list.findIndex(item => item.activity === activity);
    console.log('index in find item', checkIndex);
    return checkIndex || checkIndex === 0 ? checkIndex : this.addToList(list, activity);
  }

  switchList(activity, finished) {
    const { onGoing, done } = this.state;
    let itemToSwitch = {};
    let updatedDone = [];
    let updatedOngoing = [];
    let activityIndex = 0;
    console.log(activity);
    console.log(finished);
    console.log(onGoing);
    if (!finished) {
      activityIndex = this.findItemInList(onGoing, activity);
      console.log('org ong change to done aka true', activityIndex);
      itemToSwitch = onGoing[activityIndex];
      updatedDone = [...done, itemToSwitch];
      updatedOngoing = onGoing.filter(item => item !== onGoing[activityIndex]);
      console.log('updated', updatedOngoing);
    } else {
      activityIndex = this.findItemInList(done, activity);
      console.log('org done change to ongoing aka false', activityIndex);
      itemToSwitch = done[activityIndex];
      updatedOngoing = [...onGoing, itemToSwitch];
      updatedDone = done.filter(item => item !== done[activityIndex]);
    }
    this.setState({ onGoing: updatedOngoing, done: updatedDone });
  }

  checkValidationRender(list) {
    if (!list) return '';
    return (
      list.map((item, index) => (
        <Card
          key={index.toString()}
          todoItem={item.activity}
          handleItemClick={this.switchList}
        />
      )));
  }

  render() {
    const { onGoing, done } = this.state;
    console.log('rrender');
    return (
      <main className="toDo__board">
        <h1>Iam to do </h1>
        <ToDoInput handleItem={this.addItemToList} />
        <h2>OnGoing</h2>
        {this.checkValidationRender(onGoing)}
        <h2>Done</h2>
        {this.checkValidationRender(done)}

      </main>
    );
  }
}
