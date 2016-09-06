function main(){
  var deckPile = new CardPile(createDeck());
  var activePile = new CardPile();
  var discardPile = new CardPile();
  var stagedPile = new CardPile();
  deckPile.sendMultipleCardsTo(deckPile.makeRandomIdArray(9), activePile);
  run(activePile.cards);
}

function loadCanvas(id) {
        var canvas = document.createElement('canvas');
        div = document.getElementById("canvases"); 
        canvas.id     = id;
        canvas.width  = 100;
        canvas.height = 100;
        canvas.style.border   = "1px solid";
        div.appendChild(canvas)
}
function run(cardArr){
  for(var i = 0; i < 9; i++){
    loadCanvas("myCanvas"+i);
    drawShapes("myCanvas"+i, cardArr[i].id, cardArr[i].number, cardArr[i].color, cardArr[i].shape, cardArr[i].fill);
  }
}

function canvasClick(x, y){
	var canvasNum = 0;
	if(x < 100){
  	if(y < 100){
    	canvasNum = 0;
    }
    if(y > 100 && y < 200){
    	canvasNum = 3;
    }
    if(y > 200 && y < 300){
    	canvasNum = 6;
    }
  }
  if(x > 100 && x < 200){
		if(y < 100){
    	canvasNum = 1;
    }
    if(y > 100 && y < 200){
    	canvasNum = 4;
    }
    if(y > 200 && y < 300){
    	canvasNum = 7;
    }
  }
  if(x > 200 && x < 300){
  	if(y < 100){
    	canvasNum = 2;
    }
    if(y > 100 && y < 200){
    	canvasNum = 5;
    }
    if(y > 200 && y < 300){
    	canvasNum = 8;
    }
  }
  return "myCanvas"+canvasNum;
}

function fillStage(myCanvas){
	var c = document.getElementById(myCanvas);
  var ctx = c.getContext("2d");
  ctx.fillStyle("blue");
  ctx.beginPath();
  ctx.drawRect(20, 20, 60, 60);
  ctx.fillRect(20, 20, 60, 60);
  ctx.stroke();
  ctx.fill();
}

function drawShapes(myCanvas, cardId, num, color, shape, fill){
	var c = document.getElementById(myCanvas);
  var ctx = c.getContext("2d");
  c.addEventListener('click', function(event) {
    var canvasNum = canvasClick(event.pageX, event.pageY);
      activePile.selectForStaging(cardId);
      fillStage("myCanvas"+canvasNum);
	}, false);
  
  ctx.lineWidth=5;
  ctx.strokeStyle = color;
  if(fill === "hatched"){
    var my_gradient=ctx.createLinearGradient(30,50,60,50);
    my_gradient.addColorStop(0.5,color);
    my_gradient.addColorStop(1,"white");
    ctx.fillStyle=my_gradient;
  }
  else if(fill === "solid"){
  	ctx.fillStyle = color;
  }
  else if(fill === "none"){
  	ctx.strokeStyle = color;
    ctx.fillStyle = "white";
  }
  var yArr = [];
  var xArr = 50;
  if(num === 3){
    yArr = [20, 50, 80];
  }
  else if(num === 2){
    yArr = [35, 65];
  }
  else if(num === 1){
    yArr = [50];
  }
  for(var i = 0; i < num; i++){
    ctx.beginPath();
    if(shape === "A"){
    	ctx.arc(xArr,yArr[i],10,0,2*Math.PI);
    }
    else if(shape === "B"){
    	ctx.rect(xArr - 10,yArr[i] - 5,20,10);
      ctx.fillRect(xArr - 10,yArr[i] - 5,20,10);
    }
    else if(shape === "C"){
      ctx.beginPath(); 
      ctx.moveTo(xArr-10,yArr[i]+8);
      ctx.lineTo(xArr+10,yArr[i]+8);
      ctx.lineTo(xArr,yArr[i]-8);
      ctx.lineTo(xArr-10,yArr[i]+8);
      ctx.lineTo(xArr+10,yArr[i]+8);
      ctx.stroke(); // Draw it
    }
    ctx.stroke();
    ctx.fill();
  }
}

function onClick(){
	
}

function CardPile(cards) {
	this.cards = (cards === undefined ? [] : cards);
	this.addCard = function(cardObj){
		this.cards.push(cardObj);
	};
	this.sendCardTo = function(cardId, dstPile){
		var selectedCard = this.cards.splice(this.cards.indexOf(this.getCardById(cardId)), 1)[0];
		dstPile.addCard(selectedCard);
	};
	this.cardIndexFromId = function(cardId){
        for(var i = 0; i < this.cards.length; i++){
            if(this.cards[i].id === cardId){
                return i;
            }
        }
	}
	this.sendMultipleCardsTo = function(idArr, dstPile){
	    var count = 0;
	    while(count < idArr.length){
            this.sendCardTo(this.getCardById(idArr[count]).id, dstPile);
            count++;
	    }
	    dstPile.multipleCardArray = this.multipleCardArray;
	}
	this.getCardById = function(cardId){
	    return this.cards.filter(function(card){
	        return card.id === cardId;
	    })[0];
	};
	this.resetPile = function(){
	    this.cards = [];
	}
	this.makeRandomIdArray = function(numCards){
	    this.multipleCardArray = [];
	    for(var i = 0 ; i < numCards; i++){
            var randomCardId = this.cards[Math.floor(Math.random() * this.cards.length)].id;
            this.multipleCardArray.push(randomCardId);
	    }
	    return this.multipleCardArray;
	}
	this.multipleCardArray = [];
	this.stage = [];
	this.selectForStaging = function(cardId){
	    if(this.stage.length < 3){
	        this.stage.push(this.getCardById(cardId));
	    }
	}
	this.removeFromStage = function(cardId){
	    this.stage.splice(indexOf(this.getCardById(cardId)),1);
	}
}

function createDeck(){
	var shapes = ["A", "B", "C"];
	var numbers = [1, 2, 3];
	var colors = ["red", "green", "purple"];
	var fills = ["solid", "hatched", "none"];
	var cardArray = [];
	var index = 0;
	var propVariations = 3;
	for(var i = 0; i < propVariations; i++){
		for(var j = 0; j < propVariations; j++){
			for(var k = 0; k < propVariations; k++){
				for(var l = 0; l < propVariations; l++){
					var cardObject = {
						id: "cid00" + index,
						shape: shapes[i],
						number: numbers[j],
						color: colors[k],
						fill: fills[l],
					}
					cardArray.push(cardObject);
					index++;
				}
			}
		}
	}
	return cardArray;
}

function compareCards(cardArr){
    var noMatch = [];
    var allProps = {
        colors: [],
        fills: [],
        numbers: [],
        shapes: [],
    };
    cardArr.forEach(function(card){
        if(allProps.colors.indexOf(card.color) === -1){
            allProps.colors.push(card.color);
        }
        if(allProps.fills.indexOf(card.fill) === -1){
            allProps.fills.push(card.fill);
        }
        if(allProps.numbers.indexOf(card.number) === -1){
            allProps.numbers.push(card.number);
        }
        if(allProps.shapes.indexOf(card.shape) === -1){
            allProps.shapes.push(card.shape);
        }
    });
    for(var myProp in allProps){
        var check = allProps[myProp];
        if (allProps.hasOwnProperty(myProp)) {
            if(allProps[myProp].length % 2 === 0){
                noMatch.push("Mismatched " + myProp + ": " + allProps[myProp]);
            }
        }
    }
    if(noMatch.length === 0){
        return true;
    }
    else{
        return noMatch;
    }
}




