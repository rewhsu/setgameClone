import React from 'react';
import styles from './Shape.css';

export default class Shape extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasWidth: 98,
      canvasHeight: 98,
      radius: 9,
      rectangleWidth: 20,
      rectangleHeight: 10,
      triangleWidth: 20,
      triangleHeight: 20,
      gradOffsetX: 5,
    }
  }
  findYCenter(index) {
    return index * (this.state.canvasHeight/(this.props.data.card.number + 1));
  }
  drawLinesAndFill() {
    var width, height;
    var ctx = this.refs.canvas.getContext('2d');
    ctx.lineWidth = 3;
    // Set Color
    ctx.strokeStyle = this.props.data.card.color;
    // Set Fill
    if (this.props.data.card.fill === 'solid') {
      ctx.fillStyle = this.props.data.card.color;
    } 
    else if (this.props.data.card.fill === 'none') {
      ctx.fillStyle = 'white';
    }
    else if (this.props.data.card.fill === 'hatched') {
      var gradOffsetX = 20;
      for (var i = 1; i <= this.props.data.card.number; i++) {
        // var my_gradient = ctx.createLinearGradient(this.state.canvasWidth/2 - this.state.gradOffsetX, this.findYCenter(i), this.state.canvasWidth/2 + this.state.gradOffsetX, this.state.canvasHeight);
        var my_gradient = ctx.createLinearGradient(0, 0, 52, 0);
        my_gradient.addColorStop(.8, this.props.data.card.color);
        my_gradient.addColorStop(1, "white");
        ctx.fillStyle = my_gradient;
      }
    }
    // Shape A is Circle
    if (this.props.data.card.shape === 'A') {
      for (var i = 1; i <= this.props.data.card.number; i++) {
        ctx.beginPath();
        ctx.arc(this.state.canvasWidth/2, this.findYCenter(i), this.state.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
      }
    } else if (this.props.data.card.shape === 'B') {
      // Shape B is Rect
      width = this.state.rectangleWidth;
      height = this.state.rectangleHeight - 1;
      for (var i = 1; i <= this.props.data.card.number; i++) {
        ctx.strokeRect(this.state.canvasWidth/2 - width/2, this.findYCenter(i) - height/2, width, height);
        ctx.fillRect(this.state.canvasWidth/2 - width/2, this.findYCenter(i) - height/2, width, height);
      }
    } else if (this.props.data.card.shape === 'C') {
      // Shape C is Triangle
      width = this.state.triangleWidth - 2;
      height = this.state.triangleHeight - 4;
      for (var i = 1; i <= this.props.data.card.number; i++) {
        ctx.beginPath();
        ctx.moveTo(this.state.canvasWidth/2 - width/2, this.findYCenter(i) + height/2);
        ctx.lineTo(this.state.canvasWidth/2 + width/2, this.findYCenter(i) + height/2);
        ctx.lineTo(this.state.canvasWidth/2, this.findYCenter(i) - height/2);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
      }
    }
  }
  drawSelector(isSelected) {
    if (isSelected) {    
      var color = 'blue';
      var offset = 6;
      var width = this.state.canvasWidth - offset;
      var height = this.state.canvasHeight - offset;
      var ctx = this.refs.canvas.getContext('2d');
      ctx.strokeStyle = color;
      ctx.strokeRect(this.state.canvasWidth/2 - width/2, this.state.canvasHeight/2 - height/2, width, height);
    }
  }
  updateCanvas() {
    console.log('updating canvas', this.state);
    this.fitToContainer();
    this.drawLinesAndFill();
    this.drawSelector(this.props.data.isSelected);
  }
  fitToContainer() {
    var canvas = this.refs.canvas;
    canvas.style.width='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  render() {
    if (this.props.data.card) {
      setTimeout(() => this.updateCanvas(), 10);
      return (
        <canvas ref="canvas" className={styles.canvas}/>
      );
    }
    return (
      <div>Loading!</div>
    );
  }
}
