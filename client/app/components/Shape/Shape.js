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
      shape: props.shape,
      numObjects: props.numObjects,
    }
  }
  componentDidMount() {
    this.updateCanvas(this.state.width, this.state.height, this.state.numObjects);
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
    this.fitToContainer(this.refs.canvas);
    this.drawLines('triangle');
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
