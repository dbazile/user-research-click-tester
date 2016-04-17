import React, {Component} from 'react';
import {generateSlug} from '../utils/generate-slug';
import styles from './Task.css';

const MARKER_RADIUS = 25;

export default class Task extends Component {
  static propTypes = {
    click: React.PropTypes.object,
    clicked: React.PropTypes.func.isRequired,
    id: React.PropTypes.string.isRequired,
    instructions: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired
  };

  constructor() {
    super();
    this.state = {gratuitousClicks: 0};
    this._clicked = this._clicked.bind(this);
  }

  componentDidMount() {
    this._loadImage();
    this._activateEventHandlers();
  }

  render() {
    /* eslint-disable react/no-danger */
    const {gratuitousClicks} = this.state;
    const clicked = !!this.props.click;
    return (
      <li id={this._slug} className={`${styles.root} ${clicked ? styles.clicked : ''} ${gratuitousClicks ? styles.abused : ''}`}>
        <div className={styles.viewport}>
          <canvas ref="canvas"/>
        </div>
        <div className={styles.description}>
          <h1 className={styles.name}>{this.props.name}</h1>
          <div dangerouslySetInnerHTML={{__html: this.props.instructions}}/>
        </div>
        <div className={styles.clickedMessage}>
          <svg className={styles.thumbsUp} viewBox="-10 -10 220 220">
            <path fillRule="evenodd" d="M100,200 C155.228475,200 200,155.228475 200,100 C200,44.771525 155.228475,-4.26325641e-14 100,-4.26325641e-14 C44.771525,-4.26325641e-14 1.42108547e-14,44.771525 1.42108547e-14,100 C1.42108547e-14,155.228475 44.771525,200 100,200 Z M115.625,37.5 L101.041667,81.25 L80.2083333,94.7916667 L39.5833333,97.9166667 L39.5833333,141.666667 L83.3333333,143.75 L154.166667,147.916667 L160.416667,105.208333 L151.041667,89.5833333 L129.980135,87.5 L132.063466,40.626196 L115.625,37.5 Z"/>
          </svg>
        </div>
        <div className={styles.abuseMessage}>{this._abuseMessage}</div>
      </li>
    );
  }

  //
  // Internals
  //

  get _slug() {
    return generateSlug(this.props.id);
  }

  get _abuseMessage() {
    const clicks = this.state.gratuitousClicks;
    switch (clicks) {
      case 1: return 'Yup, we got it.';
      case 2: return 'Dude, we got it.';
      case 3: return '...';
      case 4: return 'Dude.';
      case 5: return 'Ok dude.';
      case 6: return 'Go. To. The. Next. Task.';
      case 7: return 'Dude...';
      case 8: return '...Dude...';
      case 9: return 'DUDE!';
      default: return 'ಠ_ಠ';
    }
  }

  _activateEventHandlers() {
    this.refs.canvas.addEventListener('click', this._clicked);
  }

  _loadImage() {
    const {canvas} = this.refs;
    const context = canvas.getContext('2d');
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = this.props.url;
    image.addEventListener('load', () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      this._restoreMarkerIfClicked();
      context.save();
    });
  }

  _drawMarker(x, y, radius) {
    const {canvas} = this.refs;
    const context = canvas.getContext('2d');

    // Inside
    context.fillStyle = 'hsla(335, 75%, 50%, .3)';
    context.lineWidth = Math.ceil(radius * .12);
    context.strokeStyle = 'hsla(335, 75%, 50%, .7)';
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.stroke();

    // Outside
    context.lineWidth = Math.ceil(radius * .18);
    context.strokeStyle = 'lime';
    context.beginPath();
    context.arc(x, y, Math.ceil(radius * 1.4), 0, 2 * Math.PI);
    context.closePath();
    context.stroke();
  }

  _restoreMarkerIfClicked() {
    const {click} = this.props;
    if (click) {
      const {radius} = this._scale(0, 0, MARKER_RADIUS);
      const [x, y] = click;
      this._drawMarker(x, y, radius);
    }
  }

  _scale(offsetX, offsetY, radius) {
    const {canvas} = this.refs;
    const ratio = (canvas.width / canvas.offsetWidth);
    return {
      x: Math.floor(offsetX * ratio),
      y: Math.floor(offsetY * ratio),
      radius: Math.floor(radius * (ratio / 2))
    };
  }

  //
  // Events
  //

  _clicked(event) {
    if (this.props.click) {
      this.setState({gratuitousClicks: this.state.gratuitousClicks + 1});
      return;
    }
    const {x, y, radius} = this._scale(event.offsetX, event.offsetY, MARKER_RADIUS);
    this._drawMarker(x, y, radius);
    this.props.clicked(x, y);
  }
}
