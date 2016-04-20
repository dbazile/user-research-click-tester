import React, {Component} from 'react';
import styles from './TransmissionStatus.css';

export const TRANSMITTING = 'transmitting';
export const SUCCESS = 'success';
export const FAILED = 'failed';

export default class TransmissionStatus extends Component {
  static propTypes = {
    dismiss: React.PropTypes.func,
    retry: React.PropTypes.func,
    status: React.PropTypes.string
  };

  render() {
    const {status} = this.props;
    return (
      <div className={`${styles.root} ${styles[status]}`}>
        {status === TRANSMITTING && <div><p>Transmitting...</p></div>}
        {status === SUCCESS && <div><p>Success!  You can close the window now.</p></div>}
        {status === FAILED && <div>
          <p>Oh no, it failed...</p>
          <button onClick={this.props.retry}>Try again?</button>
          <button onClick={this.props.dismiss}>Nevermind...</button>
        </div>}
      </div>
    );
  }
}
