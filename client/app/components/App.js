var React = require('react');
import Legacy from './Legacy';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <p>Set Game Goes Here</p>;
        <Legacy />
      </div>
    );
  }
}