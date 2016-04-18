import React, {Component} from 'react';
import Instructions from './Instructions';
import TaskList from './TaskList';
import Comments from './Comments';
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
    this._commentsChanged = this._commentsChanged.bind(this);
    this._transmit = this._transmit.bind(this);
  }

  componentDidUpdate() {
    serialize(this.state);
  }

  render() {
    return (
      <div className={styles.root}>
        <Instructions/>
        <TaskList tasks={this.state.tasks} changed={this._tasksChanged} />
        <Comments comments={this.state.comments} changed={this._commentsChanged}/>
        <ThankYou transmit={this._transmit}/>
      </div>
    );
  }

  _tasksChanged(tasks) {
    this.setState({tasks});
    this._scrollToNext();
  }

  _commentsChanged(comments) {
    this.setState({comments});
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

  _transmit() {
    fetch('/responses', {
      method: 'post',
      body: JSON.stringify(this.state)
    }).then(response => response.ok && this._notifySuccess());
  }

  _notifySuccess() {
    alert('whee!');
  }
}
