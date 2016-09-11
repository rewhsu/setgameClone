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

function getCardByCanvasId(cIndex){
	var stageSlots = JSON.parse(localStorage.getItem('stageSlots'));
	var card = getCardById(stageSlots[cIndex]);
}

function getCanvas(cIndex){
	return document.getElementById('canvas-'+cIndex+'-back');
}

function resetBackCanvas(cIndex){
	var myCanvas = getCanvas(cIndex);
	var ctx = myCanvas.getContext("2d");
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
}

function isMatch(){
	var stageSlots = JSON.parse(localStorage.getItem('stageSlots'));
	var selectedCanvases = JSON.parse(localStorage.getItem('selectedCanvases'));
	var selectedCanvasesCopy = selectedCanvases.slice();
	var discardCards = JSON.parse(localStorage.getItem('discardPile'));
	var cardsLeft = JSON.parse(localStorage.getItem('cards_left'));
	var points = JSON.parse(localStorage.getItem('points'));
	var highScore = JSON.parse(localStorage.getItem('high_score'));
	console.log(cardsLeft);
	//Delete click event
	deleteClickEvent();
	//New canvas
	var canvasObject = createNewFrontCanvas();
	for(var i = 0; i < 3; i++){
		var selectedCanvasIndex = selectedCanvasesCopy[i];
		//Get canvas object
		canvasObject.getCanvas(selectedCanvasIndex);
		//Add matched cards to discard data
		discardCards.push(stageSlots[selectedCanvasIndex]);
		//Reset canvas
		resetBackCanvas(selectedCanvasIndex);
		delete stageSlots[selectedCanvasIndex];
		canvasObject.deselectCard(selectedCanvasIndex);
	}
	cardsLeft -= 3;
	points += 1;
	if(points >= highScore){
		highScore++;
	}
	setLocalItem('discardPile', discardCards);
	localStorage.setItem('selectedCanvases', JSON.stringify([]));
	setLocalItem('stageSlots', stageSlots);
	localStorage.setItem('cards_left', JSON.stringify(cardsLeft));
	document.getElementById('cards_left').innerHTML = cardsLeft;
	localStorage.setItem('points', JSON.stringify(points));
	document.getElementById('points').innerHTML = points;
	setLocalItem('high_score', highScore);
	document.getElementById('high_score').innerHTML = highScore;
}

function compareCards(){
	var stageSlots = JSON.parse(localStorage.getItem('stageSlots'));
	var cardArr = [];
	var selectedCanvases = JSON.parse(localStorage.getItem('selectedCanvases'));
  	var noMatch = "";
  	var allProps = {
    	colors: [],
    	fills: [],
    	numbers: [],
    	shapes: [],
  	};
	  selectedCanvases.forEach(function(index) {
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
