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
      card: null,
    }
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.card) !== JSON.stringify(this.props.card)) {
      console.log('receiving props for Shape', nextProps.card);
      this.setState({
        card: nextProps.card,
      })
    }
    setTimeout(() => this.updateCanvas(), 100);
  }

  componentDidMount() {
    // this.updateCanvas();
  }
  findYCenter(index) {
    return index * (this.state.canvasHeight/(this.state.card.number + 1));
  }
  drawLines(shape, ctx) {
    var width, height;
    // const ctx = this.refs.canvas.getContext('2d');
    if (shape === 'A') {
      ctx.beginPath();
      for (var i = 1; i <= this.state.card.number; i++) {
        ctx.arc(this.state.canvasWidth/2, this.findYCenter(i), this.state.radius, 0, 2 * Math.PI);
      }
      ctx.fill();
    } else if (shape === 'B') {
      width = this.state.rectangleWidth;
      height = this.state.rectangleHeight;
      for (var i = 1; i <= this.state.card.number; i++) {
        ctx.fillRect(this.state.canvasWidth/2 - width/2, this.findYCenter(i) - height/2, width, height);
      }
    } else if (shape === 'C') {
      width = this.state.triangleWidth;
      height = this.state.triangleHeight;
      ctx.beginPath();
      for (var i = 1; i <= this.state.card.number; i++) {
        ctx.moveTo(this.state.canvasWidth/2 - width/2, this.findYCenter(i) + height/2);
        ctx.lineTo(this.state.canvasWidth/2 + width/2, this.findYCenter(i) + height/2);
        ctx.lineTo(this.state.canvasWidth/2, this.findYCenter(i) - height/2);
      }
      ctx.closePath();
      ctx.fill();
    }
  }
  updateCanvas() {
    console.log('updating canvas', this.state);
    const ctx = this.refs.canvas.getContext('2d');
    ctx.strokeStyle = this.state.card.color;
    if (this.state.card.fill === 'solid') {
      ctx.fillStyle = this.state.card.color;
    } 
    else if (this.state.card.fill === 'none') {
      ctx.fillStyle = 'white';
    }
    else if (this.state.card.fill === 'hatched') {
      var gradOffsetX = 20;
      for (var i = 1; i <= this.state.card.number; i++) {
        var my_gradient = ctx.createLinearGradient(this.state.canvasWidth/2 - this.state.gradOffsetX, this.findYCenter(i), this.state.canvasWidth + this.state.gradOffsetX, this.state.canvasHeight);
        my_gradient.addColorStop(0.5, this.state.card.color);
        my_gradient.addColorStop(1, "white");
        ctx.fillStyle = my_gradient;
      }
    }
    this.fitToContainer(this.refs.canvas);
    this.drawLines(this.state.card.shape, ctx);
  }
  fitToContainer(canvas) {
    canvas.style.width='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  render() {
    console.log('rendering Shape');
    if (this.state.card) {
      return (
        <canvas ref="canvas" className={styles.canvas}/>
      );
    }
    return (
      <div>Loading!</div>
    );
  }
}
