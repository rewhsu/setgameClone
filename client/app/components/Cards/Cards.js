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
      console.log('receiving props', this.state.stage);
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
    this.setCard(index, rand.id);
  }
  dealCards() {
    for (var i = 0; i < 9; i++) {
      this.dealCard(i);
    }
  }
  componentDidMount() {
    this.dealCards();
  }
  render() {
    console.log('rendering', this.state);
    return (
      <div className={styles.stage}>
        {this.state.stage.map(cell => (
          this.renderCard(cell)
        ))}
      </div>
    );
  }
}