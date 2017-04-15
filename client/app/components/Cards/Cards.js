import React from 'react';
import styles from './Cards.css';
import Card from '../Card/Card.js';
import { randomCard } from '../../../utils/utils';

export default class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      stage: props.stage,
      deck: props.deck,
    }
    this.setCard = props.setCard;
    this.toggleCard = props.toggleCard.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.stage !== this.state.stage) {
      this.setState({stage: nextProps.stage});
      this.forceUpdate();
      console.log('receiving props for Cards', nextProps.stage);
    }
  }
  renderCard(data) {
    return (
      <div className={styles.cardContainer}>
        <Card data={data} toggleCard={this.toggleCard} />
      </div>
    )
  }
  dealCard(index) {
    var deck = this.state.deck;
    var rand = deck[Math.floor(Math.random() * deck.length)];
    this.setCard(index, rand);
  }
  dealCards() {
    for (var i = 0; i < 9; i++) {
      this.dealCard(i);
    }
  }
  componentWillMount() {
    this.dealCards();
  }
  render() {
    console.log('rendering Cards', this.state);
    return (
      <div className={styles.stage}>
        {this.state.stage.map(cell => (
          this.renderCard(cell)
        ))}
      </div>
    );
  }
}