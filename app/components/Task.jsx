import React, {Component} from 'react';
import styles from './Task.css';

const MARKER_RADIUS = 25;

export default class Task extends Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    instructions: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
  };

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }

  componentDidMount() {
    this._loadImage();
    this._activateEventHandlers();
  }

  render() {
    /* eslint-disable react/no-danger */
    return (
      <li className={styles.root}>
        <section className={styles.viewport}>
          <canvas ref="canvas"/>
        </section>
        <section className={styles.sidebar}>
          <h1 className={styles.name}>{this.props.name}</h1>
          <div dangerouslySetInnerHTML={{__html: this.props.instructions}}/>
        </section>
      </li>
    );
  }

  _activateEventHandlers() {
    this.refs.canvas.addEventListener('click', this._onClick);
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

  //
  // Events
  //

  _onClick(event) {
    const {canvas} = this.refs;
    const aspectRatio = (canvas.width / canvas.offsetWidth);
    const scaledX = Math.floor(event.layerX * aspectRatio);
    const scaledY = Math.floor(event.layerY * aspectRatio);
    const scaledRadius = Math.floor(MARKER_RADIUS * (aspectRatio / 2));
    this._drawMarker(scaledX, scaledY, scaledRadius);
    this.props.onClick(scaledX, scaledY);
    // canvas.removeEventListener('click', this._onClick);
  }
}
