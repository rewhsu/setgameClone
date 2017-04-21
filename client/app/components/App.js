var React = require('react');
import Legacy from './Legacy';
import StageContainer from '../containers/StageContainer'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <StageContainer />
      </div>
    );
  }
}