var React = require('react');
import styles from './App.css';
import StageContainer from '../../containers/StageContainer';
import SidebarContainer from '../../containers/SidebarContainer';
import LogContainer from '../../containers/LogContainer.js'

export default class App extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        <StageContainer />
        <SidebarContainer />
        <LogContainer />
      </div>
    );
  }
}