import React, {Component} from 'react';
import styles from './Task.css';

export default class Task extends Component {
  static propTypes = {
    url: React.PropTypes.string,
    name: React.PropTypes.string,
    instructions: React.PropTypes.string,
    onClick: React.PropTypes.func
  };

  componentDidMount() {
    // fix canvas aspect ratio
    // render into canvas
    const {canvas} = this.refs;
    const {url} = this.props;
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = this.props.url;

    // DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG
    window.canvas = canvas;
    // DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG

    const context = canvas.getContext('2d');

    image.addEventListener('load', event => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      context.save();
    });

    const RADIUS = 50;
    function handleClick(event) {
      console.debug('clicked on canvas', event);
      context.fillStyle = 'rgba(255, 0, 0, .5)';
      context.beginPath();
      context.arc(event.x - Math.ceil(RADIUS / 2), event.y - Math.ceil(RADIUS / 2), RADIUS, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
      canvas.removeEventListener('click', handleClick);
    }

    canvas.addEventListener('click', handleClick);
  }

  render() {
    return (
      <li className={styles.root}>
        <div className={styles.viewport}>
          <canvas ref="canvas"/>
        </div>
        <div className={styles.sidebar}>
          <h1 className={styles.name}>{this.props.name}</h1>
          <div dangerouslySetInnerHTML={{__html: this.props.instructions}}/>
        </div>
      </li>
    );
  }
}
