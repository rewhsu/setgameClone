var React = require('react');

export default class Legacy extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var style = {
      position: 'absolute',
    }
    return (
      <div>
        <header>
          <h1>Digital Set</h1>
        </header>
        <nav>
          <p>
            High Score
          </p>
          <p id = "high_score">0</p>
          <p>
            &copy; Copyright  by Andrew Hsu
          </p>
          {/*<!-- <div>Game ends in: <span id="time"></span> mm:ss!</div> -->
          <p>
            <!-- Remaining Cards
          </p>
          <p id = "cards_left">81</p>
          <p>
            Points
          </p>
          <p id = "points"></p>
          <p> -->
            <!-- High Score
            <button id = "b3" onclick="resetHighScore()">Reset High Score</button>
          </p>
          <p id = "high_score">0</p> -->
          */}
        </nav>
        <div id = "buttons" className="btnsDiv">
            <button id = "b2" className='btn' onClick="setUserTime()">Set Duration</button>
            <button id = "b3" className='btn200' onClick="resetHighScore()">Reset High Score</button>
          </div>
        <div id = "canvases" style={style}></div>
        <div id = "gameButtons" className="btnDivH">
          <button id ="b4" className="btnStart" onClick="startGame()">Start</button>
          <div className='txtDivH'>
            <span id="time" className="spn"></span>
          </div> 
          <div className='txtDivH'>
            <p className="txtDisp" id = "points"></p>
          </div> 
        </div>
        <br />
        <br />
        <div id = "gameStage" style={style}></div>
        <div id = "gameButtons1" className="btnCheckDivH" style={style}>
          <button id ="b4" className="btnCheck" onClick="compare()">Check</button>
          <div className="btnHintDiv">
            <button id ="b5" className="btnHint" onClick="checkIfSetAlert()">Hint</button>
          </div>
        </div>
      </div>
    );
  }
}