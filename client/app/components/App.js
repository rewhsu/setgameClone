var React = require('react');
import Legacy from './Legacy';
import CardsContainer from '../containers/CardsContainer'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <p>Set Game Goes Here</p>
        <Legacy />
        <CardsContainer />
      </div>
    );
  }
}