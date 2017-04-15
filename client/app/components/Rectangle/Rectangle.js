// const Circle = (props) => {
//   var y = this.yArr[index];
//   this.ctx.beginPath();
//   this.ctx.arc(this.xCenter, y, this.shapeProperties.radius, 0, 2 * Math.PI);
//   this.ctx.stroke();
//   this.ctx.fill();
// }
import React from 'react';
import styles from './Rectangle.css';

export default class Rectangle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasWidth: 98,
      canvasHeight: 98,
      width: 20,
      height: 8,
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
      for (var i = 1; i <= this.state.numObjects; i++) {
        ctx.fillRect(this.state.canvasWidth/2 - this.state.width/2, this.findYCenter(i) - this.state.height/2, this.state.width, this.state.height);
      }
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
// ReactDOM.render(<CanvasComponent/>, document.getElementById('container'));