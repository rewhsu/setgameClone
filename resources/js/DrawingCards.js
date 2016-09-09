/**
 * Card Image
 * @author Andrew
 */

var CardCanvasObject = function(myObj){
	this.id = myObj.id + '-canvas';
	this.c = document.getElementById(this.id+'-back');
	this.ctx = this.c.getContext("2d");
	this.c1 = document.getElementById(this.id+'-front');
	this.ctx1 = this.c1.getContext("2d");
	this.c.style.border = "1px solid";
  	this.c.style.position = "absolute";
  	this.c1.style.border = "1px solid";
  	this.c1.style.position = "absolute";
	this.index = localStorage.getItem('cardCanvasIndex');
	this.width = 100;
	this.height = 100;
	this.xCenter = this.index + this.width/2;
	this.yCenter = this.index + this.height/2;
	this.shapeProperties = {
		radius: 10,
		width: 20,
		height: 8,
		rWidth: 20,
		rHeight: 8,
		tWidth: 20,
		tHeight: 20,
		gradOffsetX: 5
	};
	this.cardObject = myObj,
	this.cardImage = this.drawCard;
	this.yArr = this.getYArray();
};
	
CardCanvasObject.prototype.drawCard = function(){
	this.ctx.lineWidth = 4;
	this.setCanvasColor();
	this.setCanvasFill();
	this.setCanvasShape();
	var count = 0;
	while(count < this.getYArray().length){
		this.ctx.beginPath();
		this.fn(count);
		count++;
	}
};
CardCanvasObject.prototype.drawCircle = function(index){
	var y = this.yArr[index];
	this.ctx.beginPath();
	this.ctx.arc(this.xCenter, y, this.shapeProperties.radius, 0, 2 * Math.PI);
	this.ctx.stroke();
	this.ctx.fill();
};
CardCanvasObject.prototype.drawRectangle = function(index){
	var y = this.yArr[index];
	this.ctx.beginPath();
	this.ctx.strokeRect(this.xCenter - this.shapeProperties.rWidth/2, y- this.shapeProperties.rHeight/2, this.shapeProperties.rWidth, this.shapeProperties.rHeight);
	this.ctx.fillRect(this.xCenter - this.shapeProperties.rWidth/2, y- this.shapeProperties.rHeight/2, this.shapeProperties.rWidth, this.shapeProperties.rHeight);
	this.ctx.stroke();
	this.ctx.fill();
};
CardCanvasObject.prototype.drawTriangle = function(index){
	var y = this.yArr[index];
    this.ctx.beginPath();
    this.ctx.moveTo(this.xCenter - this.shapeProperties.tWidth/2, y + this.shapeProperties.tHeight/2);
    this.ctx.lineTo(this.xCenter + this.shapeProperties.tWidth/2, y + this.shapeProperties.tHeight/2);
    this.ctx.lineTo(this.xCenter, y - this.shapeProperties.tHeight/2);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();
};
CardCanvasObject.prototype.setCanvasColor = function(){
	this.ctx.strokeStyle = this.cardObject.color;
};
CardCanvasObject.prototype.setCanvasFill = function (){
	switch(this.cardObject.fill){
	case 'solid':
		this.ctx.fillStyle = this.cardObject.color;
		break;
	case 'none':
		this.ctx.fillStyle = "white";
		break;
	case 'hatched':
		var gradOffsetX = 20;
		var my_gradient = this.ctx.createLinearGradient(this.xCenter - this.shapeProperties.gradOffsetX, this.yCenter, this.xCenter + this.shapeProperties.gradOffsetX, this.yCenter);
	    my_gradient.addColorStop(0.5, this.cardObject.color);
	    my_gradient.addColorStop(1, "white");
	    this.ctx.fillStyle = my_gradient;
	    break;
	}
};	
CardCanvasObject.prototype.setCanvasShape = function(){
	var count = 0;
	switch(this.cardObject.shape){
		case 'A':
			var fn = this.drawCircle;
			break;
		case 'B':
			var fn = this.drawRectangle;
			break;
		case 'C':
			var fn = this.drawTriangle;
			break;
	}
	this.fn = fn;
};

CardCanvasObject.prototype.getYArray = function(){
	switch(this.cardObject.number){
		case 1:
			return [this.height/2];
		case 2:
			return [this.height/3, 2*this.height/3];
		case 3:
			return [this.height/4, 2*this.height/4, 3*this.height/4];
	}	
};

function loadCanvasHtml(cardId, index, stack) {
	  var myCanvas = document.createElement('canvas');
	  var parentDiv = document.getElementById('gameStage');
	  if (document.getElementById(cardId+'-canvas') === null){
	  	var myDiv = document.createElement('div');
	  }
	  else{
	  	var myDiv = document.getElementById(cardId+'-canvas');
	  }
	  myDiv.id = cardId+'-canvas';
	  myCanvas.selectedBool = false;
	  myCanvas.width = 100;
	  myCanvas.height = 100;
	  myCanvas.style.border = "1px solid";
	  myCanvas.fillStyle = "black";
	  myCanvas.style.position = "absolute";
	  if(index % 3 === 2){
	  	myCanvas.style.left = "200px";
	  }
	  if(index % 3 === 1){
	  	myCanvas.style.left = "100px";
	  }
	  if(index % 3 === 0){
	  	myCanvas.style.left = "0px";
	  }
	  if(index < 3){
	  	myCanvas.style.top = "0px";
	  }
	  if(index >= 3 && index < 6){
	  	myCanvas.style.top = "100px";
	  }
	  if(index >= 6 && index < 9){
	  	myCanvas.style.top = "200px";
	  }
	  if(stack !== undefined && stack === true){
	  	if(document.getElementById(cardId+'-canvas-back') === null){
		  	myCanvas.style.zIndex = 0;
		  	myCanvas.id = cardId+'-canvas-back';
	 	}
	 	else{
	 		return false;
	 	}
	  }
	  else{
	  	if(document.getElementById(cardId+'-canvas-front') === null){
		  	myCanvas.style.zIndex = 1;
		  	myCanvas.id = cardId+'-canvas-front';
	  	}
	  }
	  parentDiv.appendChild(myDiv);
	  myDiv.appendChild(myCanvas);
}
