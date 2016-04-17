import React, {Component} from 'react';
import Instructions from './Instructions';
import TaskList from './TaskList';
import ThankYou from './ThankYou';
import styles from './Application.css';
import {serialize, deserialize}  from '../utils/store';
import {generateSlug} from '../utils/generate-slug';
import {animateScroll} from '../utils/animate-scroll';

export default class Application extends Component {
  constructor() {
    super();
    this.state = deserialize();
    this._tasksChanged = this._tasksChanged.bind(this);
  }

  componentDidUpdate() {
    serialize(this.state);
  }

  render() {
    return (
      <div className={styles.root}>
        <Instructions/>
        <TaskList tasks={this.state.tasks} changed={this._tasksChanged} />
      </div>
    );
  }

  _tasksChanged(tasks) {
    this.setState({tasks});
    this._scrollToNext();
  }

  _scrollToNext() {
    const next = this.state.tasks.find(t => !t.click);
    if (next) {
      const hash = '#' + generateSlug(next.id);
      history.pushState(null, next.name, hash);
      if (this._cancelScroll) {this._cancelScroll();}
      this._cancelScroll = animateScroll(document.querySelector(hash));
    }
  }
}
