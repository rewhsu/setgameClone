import React from 'react';
import styles from './Circle.css';

export default class Circle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasWidth: 98,
      canvasHeight: 98,
      radius: 10,
      numObjects: props.numObjects,
    }
  }
    componentDidMount() {
      this.updateCanvas(this.state.width, this.state.height, this.state.numObjects);
    }
    findYCenter(index) {
      return index * (this.state.canvasHeight/(this.state.numObjects + 1));
    }
    updateCanvas() {
      const ctx = this.refs.canvas.getContext('2d');
      this.fitToContainer(this.refs.canvas);
      ctx.beginPath();
      for (var i = 1; i <= this.state.numObjects; i++) {
        ctx.arc(this.state.canvasWidth/2, this.findYCenter(i), this.state.radius, 0, 2 * Math.PI);
      }
      // ctx.strokeRect(0, 0, 50, 24.5)
      ctx.fill();
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
