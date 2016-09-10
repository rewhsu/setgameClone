/**
 * Card Image
 * @author Andrew
 */

Object.prototype.getCardById = function(value){
	var deck = JSON.parse(localStorage.deck);
	for(var i = 0; i < deck.length; i++){
		var card = deck[i];
		if(card.id === value){
			return card;
		}
	}
};

function compare(){
	console.log(compareCards());
}

function compareCards(){
	var stageSlots = JSON.parse(localStorage.getItem('stageSlots'));
	var cardArr = [];
	var indexArr = JSON.parse(localStorage.getItem('selectedCards'));
  	var noMatch = "";
  	var allProps = {
    	colors: [],
    	fills: [],
    	numbers: [],
    	shapes: [],
  	};
	  indexArr.forEach(function(index) {
	  	var card = getCardById(stageSlots[index]);
	    if (allProps.colors.indexOf(card.color) === -1) {
	      allProps.colors.push(card.color);
	    }
	    if (allProps.fills.indexOf(card.fill) === -1) {
	      allProps.fills.push(card.fill);
	    }
	    if (allProps.numbers.indexOf(card.number) === -1) {
	      allProps.numbers.push(card.number);
	    }
	    if (allProps.shapes.indexOf(card.shape) === -1) {
	      allProps.shapes.push(card.shape);
	    }
	  });
	  for (var myProp in allProps) {
	    var check = allProps[myProp];
	    if (allProps.hasOwnProperty(myProp)) {
	      if (allProps[myProp].length % 2 === 0) {
	        noMatch += ("Mismatched " + myProp + ": " + allProps[myProp] + "\n");
	      }
	    }
	  }
	  if (noMatch.length === 0) {
	    return true;
	  } 
	  else {
	    return noMatch;
	  }
};

function getUniqueRandomId() {
    var multipleCardArray = [];
    var myDeck = JSON.parse(localStorage.getItem('deck'));
    var assignedCards = JSON.parse(localStorage.getItem('assignedCards'));
    if(assignedCards === undefined || assignedCards === null){
    	return myDeck[Math.floor(Math.random() * myDeck.length)].id;
    }
    do {
    	var randomCardId = myDeck[Math.floor(Math.random() * myDeck.length)].id;
    }
    while(assignedCards.indexOf(randomCardId) !== -1);
    return randomCardId;
  };

var findEmptyIndex = function(){
	var selectedCards = JSON.parse(localStorage.getItem('stageSlots'));
	var emptySlots = [];
	for(var i = 0; i < selectedCards.length; i++){
		if(selectedCards[i] === undefined || selectedCards[i] === null){
			return i;
		}
	}
	return emptySlots;
};

function getRandomCard(){
	var emptyIndex = findEmptyIndex()[0];
	var randomCardId = getUniqueRandomId();
	var deck = JSON.parse(localStorage.deck);
	return deck.getCardById(randomCardId);
}

function assignRandomCards(){
	var stageSlots = JSON.parse(localStorage.getItem('stageSlots'));
	for(var i = 0; i < stageSlots.length; i++){
		if(stageSlots[i] === null || stageSlots[i] === undefined){
			var card = getRandomCard();
			stageSlots[i] = card.id;
			var newCanvas = new CardCanvasObject(card, i);
			localStorage.setItem('stageSlots', JSON.stringify(stageSlots));
			newCanvas.drawCard();
			newCanvas.ctx.beginPath();
			newCanvas.ctx.strokeRect(0, 0, 50, 50);
			newCanvas.ctx.stroke();
			localStorage.setItem('assignedCards', JSON.stringify(stageSlots));
			// canvases.push(newCanvas);	
		}
	}
	localStorage.setItem('stageSlots', JSON.stringify(stageSlots));
}

var CardCanvasObject = function(myObj , i){
	this.id = myObj.id + '-canvas';
  	// Back canvas is for drawing
  	this.index = i;
	this.c = document.getElementById('canvas-'+this.index+'-back');
	this.ctx = this.c.getContext("2d");
  	this.c.style.border = "1px solid";
  	this.c.style.position = "absolute";
  	this.isSelected = false;
	this.width = 100;
	this.height = 100;
	this.xCenter = 50;
	this.yCenter = Math.floor(this.index / 3) + this.height/2;
	this.yOffset2 = 2;
	this.yOffset3 = 5;
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
			return [this.height/3 - this.yOffset2, 2*this.height/3 + this.yOffset2];
		case 3:
			return [this.height/4 - this.yOffset3, 2*this.height/4, 3*this.height/4 + this.yOffset3];
	}	
};
