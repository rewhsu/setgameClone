var React = require('react');
var path = require('path');
import createDeck from '../../utils/createDeck';


export default class Legacy extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    createDeck();
  }
  render() {
    return (
      <div>
        <h1>Digital Set</h1>
      </div>
    );
  }
}