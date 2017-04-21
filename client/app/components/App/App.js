var React = require('react');
import styles from './App.css';
import StageContainer from '../../containers/StageContainer';
import SidebarContainer from '../../containers/SidebarContainer';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <StageContainer />
        <SidebarContainer />
      </div>
    );
  }
}