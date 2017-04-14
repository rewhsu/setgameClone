var React = require('react');
import Legacy from './Legacy';
import Cards from './Cards/Cards.js'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <p>Set Game Goes Here</p>
        <Legacy />
        <Cards />
      </div>
    );
  }
}