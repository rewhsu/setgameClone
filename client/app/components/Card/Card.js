import React from 'react';
import styles from './Card.css';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.cell}>
        {this.props.id}
      </div>
    );
  }
}