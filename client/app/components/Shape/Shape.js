import React from 'react';
import styles from './Shape.css';

export default class Shape extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasWidth: 98,
      canvasHeight: 98,
      radius: 10,
      rectangleWidth: 20,
      rectangleHeight: 10,
      triangleWidth: 20,
      triangleHeight: 20,
      gradOffsetX: 5,
      color: props.data.color,
      shape: props.data.shape,
      fill: props.data.fill,
      numObjects: props.data.numObjects,
    }
  }
  componentDidMount() {
    this.updateCanvas();
  }
  findYCenter(index) {
    return index * (this.state.canvasHeight/(this.state.numObjects + 1));
  }
  drawLines(shape) {
    var width, height;
    const ctx = this.refs.canvas.getContext('2d');
    if (shape === 'circle') {
      ctx.beginPath();
      for (var i = 1; i <= this.state.numObjects; i++) {
        ctx.arc(this.state.canvasWidth/2, this.findYCenter(i), this.state.radius, 0, 2 * Math.PI);
      }
      ctx.fill();
    } else if (shape === 'rectangle') {
      width = this.state.rectangleWidth;
      height = this.state.rectangleHeight;
      for (var i = 1; i <= this.state.numObjects; i++) {
        ctx.fillRect(this.state.canvasWidth/2 - width/2, this.findYCenter(i) - height/2, width, height);
      }
    } else if (shape === 'triangle') {
      width = this.state.triangleWidth;
      height = this.state.triangleHeight;
      ctx.beginPath();
      for (var i = 1; i <= this.state.numObjects; i++) {
        ctx.moveTo(this.state.canvasWidth/2 - width/2, this.findYCenter(i) + height/2);
        ctx.lineTo(this.state.canvasWidth/2 + width/2, this.findYCenter(i) + height/2);
        ctx.lineTo(this.state.canvasWidth/2, this.findYCenter(i) - height/2);
      }
      ctx.closePath();
      ctx.fill();
    }
  }
  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.strokeStyle = this.state.color;
    if (this.state.fill === 'solid') {
      ctx.fillStyle = this.state.color;
    } 
    else if (this.state.fill === 'none') {
      ctx.fillStyle = 'white';
    }
    else if (this.state.fill === 'hatched') {
      var gradOffsetX = 20;
      for (var i = 1; i <= this.state.numObjects; i++) {
        var my_gradient = ctx.createLinearGradient(this.state.canvasWidth/2 - this.state.gradOffsetX, this.findYCenter(i), this.state.canvasWidth + this.state.gradOffsetX, this.state.canvasHeight);
        my_gradient.addColorStop(0.5, this.state.color);
        my_gradient.addColorStop(1, "white");
        ctx.fillStyle = my_gradient;
      }
    }
    this.fitToContainer(this.refs.canvas);
    this.drawLines(this.state.shape);
  }
  fitToContainer(canvas) {
    canvas.style.width='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  render() {
    return (
      <canvas ref="canvas" className={styles.canvas}/>
    );
  }
}
