import React, {Component} from 'react';
import Instructions from './Instructions';
import TaskList from './TaskList';
import Comments from './Comments';
import ThankYou from './ThankYou';
import TransmissionStatus, {TRANSMITTING, SUCCESS, FAILED} from './TransmissionStatus';
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
    this._transmissionStatusDismissed = this._transmissionStatusDismissed.bind(this);
  }

  componentWillMount() {
    if (this.state.transmissionStatus === TRANSMITTING) {
      this._transmissionStatusDismissed();
    }
  }

  componentDidUpdate() {
    serialize(this.state);
  }

  render() {
    const {transmissionStatus, comments, tasks} = this.state;
    return (
      <div className={styles.root}>
        <Instructions/>
        <TaskList tasks={tasks} changed={this._tasksChanged} />
        <Comments comments={comments} changed={this._commentsChanged}/>
        <ThankYou transmit={this._transmit}/>
        <TransmissionStatus status={transmissionStatus}
                            dismiss={this._transmissionStatusDismissed}
                            retry={this._transmit} />
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
    this.setState({transmissionStatus: TRANSMITTING});
    fetch('/responses', {
      method: 'post',
      body: JSON.stringify(this.state)
    }).then(({status}) => this.setState({transmissionStatus: status < 400 ? SUCCESS : FAILED}));
  }

  _transmissionStatusDismissed() {
    this.setState({transmissionStatus: null});
  }
}
