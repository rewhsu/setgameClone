var React = require('react');
import Legacy from './Legacy';
import Card from './Card/Card.js'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <p>Set Game Goes Here</p>
        <Legacy />
        <Card />
      </div>
    );
  }
}