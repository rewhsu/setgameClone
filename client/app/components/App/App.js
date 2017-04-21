var React = require('react');
import styles from './App.css';
import StageContainer from '../../containers/StageContainer'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <StageContainer />
      </div>
    );
  }
}