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

    const RADIUS = 25;
    function handleClick(event) {
      const aspectRatio = (canvas.width / canvas.offsetWidth);
      const scaledX = event.layerX * aspectRatio;
      const scaledY = event.layerY * aspectRatio;
      context.fillStyle = 'hsla(335, 75%, 50%, .3)';

      context.lineWidth = 2;
      context.strokeStyle = 'hsla(335, 75%, 50%, .7)';
      context.beginPath();
      context.arc(scaledX, scaledY, RADIUS, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
      context.stroke();

      context.lineWidth = 4;
      context.strokeStyle = 'lime';
      context.beginPath();
      context.arc(scaledX, scaledY, Math.ceil(RADIUS * 1.4), 0, 2 * Math.PI);
      context.closePath();
      context.stroke();
    }

    canvas.addEventListener('click', handleClick);
  }

  render() {
    return (
      <li className={styles.root}>
        <section className={styles.viewport}>
          <div className={styles.frame}><canvas ref="canvas"/></div>
        </section>
        <section className={styles.sidebar}>
          <h1 className={styles.name}>{this.props.name}</h1>
          <div dangerouslySetInnerHTML={{__html: this.props.instructions}}/>
        </section>
      </li>
    );
  }
}
