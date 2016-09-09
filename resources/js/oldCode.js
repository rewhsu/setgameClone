/**
 * @author Andrew
 */

function main(){
  var deckPile = new CardPile(createDeck());
  var activePile = new CardPile();
  var discardPile = new CardPile();
  var stagedPile = new CardPile();
  deckPile.sendMultipleCardsTo(deckPile.makeRandomIdArray(9), activePile);
  runCanvas(activePile.cards, stagedPile, activePile);
}

function reset(){
	document.getElementById("canvases").removeEventListener("mousemove", myFunction);
	var myNode = document.getElementById("canvases");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
	}
  var resetDeckPile = new CardPile(createDeck());
  var resetActivePile = new CardPile();
  var resetDiscardPile = new CardPile();
  var resetStagedPile = new CardPile();
  deckPile.sendMultipleCardsTo(resetDeckPile.makeRandomIdArray(9), resetActivePile);
  runCanvas(resetActivePile.cards, resetStagedPile, resetActivePile);
}

function runCompare(){
	var result = compareCards(staged[cards]);
  if(result === true){
  	alert("Yay");
  }
  else{
  	alert("NO");
  }
}

function stage(id, staged, active){
	console.log(staged);
  if(staged.cards.length < 3){
    active.sendCardTo(id, staged);
    return staged;
	}
  else{
  	alert('You have already selected 3 cards');
    return staged;
  }
  console.log(staged);
  return staged;
}

function unstage(id, staged, active){
	console.log("unstaged!");
	console.log(staged);
	staged.sendCardTo(id, active);
  console.log(staged);
}

function divClickEvent(ids, staged, active) {
  var myDiv = document.getElementById('canvases');
  myDiv.addEventListener('click', function(event) {
  	var stagedLength = staged.cards.length;
    var myCanvasNum = canvasClick(event.pageX, event.pageY);
    var bool = document.getElementById("myCanvas" + myCanvasNum + "_stage").selectedBool;
    console.log(ids[myCanvasNum]);
    if(stagedLength < 3 && bool === false){
    	fillCanvas("myCanvas" + myCanvasNum + "_stage", ids[myCanvasNum]);
    	stage(ids[myCanvasNum], staged, active);
      if(stagedLength === 2 && bool === false){
      	alert(compareCards(staged.cards));
      }
    }
    else if (bool === true){
    	fillCanvas("myCanvas" + myCanvasNum + "_stage", ids[myCanvasNum]);
    	unstage(ids[myCanvasNum], staged, active);
    }
    else if (stagedLength === 3 && bool === false){
    	alert("More than three cards staged already");
    };
    return ids;
  }, false);
}

function fillCanvas(cNum, id) {
  var c = document.getElementById(cNum);
  var ctx1 = c.getContext("2d");
  if(c.selectedBool === false){
    ctx1.globalAlpha = 0.5;
    ctx1.fillStyle = "gray";
    ctx1.fillRect(5, 5, 90, 90);
    c.selectedBool = true;
  }
  else if(c.selectedBool === true){
  	ctx1.clearRect(5, 5, 90, 90);
    c.selectedBool = false;
  }
  return c.selectedBool;
}

function loadCanvas(myId, index, stack) {
  var myCanvas = document.createElement('canvas');
  var myDiv = document.getElementById('canvases');
  myCanvas.selectedBool = false;
  myCanvas.id = myId;
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
  	myCanvas.style.zIndex = 1;
  }
  else{
  	myCanvas.style.zIndex = 0;
  }
  myDiv.appendChild(myCanvas);
}

function runCanvas(cardArr, staged, active) {
  var idArr = [];
  for (var i = 0; i < 9; i++) {
  	idArr.push(cardArr[i].id);
    loadCanvas("myCanvas" + i, i, false);
    loadCanvas("myCanvas" + i + "_stage", i, true);
    drawShapes("myCanvas" + i, cardArr[i].id, cardArr[i].number, cardArr[i].color, cardArr[i].shape, cardArr[i].fill);
  }
  divClickEvent(idArr, staged, active);
  return idArr;
}

function canvasClick(x, y) {
  var cnum = 0;
  var divY = 315;
  var divX = 308;
  if (x < (1 / 3 * divX)) {
    if (y < (1 / 3 * divY)) {
      cnum = 0;
    }
    if (y >= (1 / 3 * divY) && y < (2 / 3 * divY)) {
      cnum = 3;
    }
    if (y >= (2 / 3 * divY) && y < divY) {
      cnum = 6;
    }
  }
  if (x >= 100 && x < 200) {
    if (y < (1 / 3 * divY)) {
      cnum = 1;
    }
    if (y >= (1 / 3 * divY) && y < (2 / 3 * divY)) {
      cnum = 4;
    }
    if (y >= (2 / 3 * divY) && y < divY) {
      cnum = 7;
    }
  }
  if (x > 200 && x < 300) {
    if (y < (1 / 3 * divY)) {
      cnum = 2;
    }
    if (y >= (1 / 3 * divY) && y < (2 / 3 * divY)) {
      cnum = 5;
    }
    if (y >= (2 / 3 * divY) && y < divY) {
      cnum = 8;
    }
  }
  console.log("Clicked on: myCanvas" + cnum);
  return cnum;
}

function drawShapes(myCanvas, id, num, color, shape, fill) {
  var c = document.getElementById(myCanvas);
  var ctx = c.getContext("2d");
  ctx.lineWidth = 5;
  ctx.strokeStyle = color;
  if (fill === "hatched") {
    var my_gradient = ctx.createLinearGradient(30, 50, 60, 50);
    my_gradient.addColorStop(0.5, color);
    my_gradient.addColorStop(1, "white");
    ctx.fillStyle = my_gradient;
  } else if (fill === "solid") {
    ctx.fillStyle = color;
  } else if (fill === "none") {
    ctx.strokeStyle = color;
    ctx.fillStyle = "white";
  }
  var yArr = [];
  var xArr = 50;
  if (num === 3) {
    yArr = [20, 50, 80];
  } else if (num === 2) {
    yArr = [35, 65];
  } else if (num === 1) {
    yArr = [50];
  }
  for (var i = 0; i < num; i++) {
    ctx.beginPath();
    if (shape === "A") {
      ctx.arc(xArr, yArr[i], 10, 0, 2 * Math.PI);
    } else if (shape === "B") {
      ctx.rect(xArr - 10, yArr[i] - 5, 20, 10);
      ctx.fillRect(xArr - 10, yArr[i] - 5, 20, 10);
    } else if (shape === "C") {
      ctx.beginPath();
      ctx.moveTo(xArr - 10, yArr[i] + 8);
      ctx.lineTo(xArr + 10, yArr[i] + 8);
      ctx.lineTo(xArr, yArr[i] - 8);
      ctx.lineTo(xArr - 10, yArr[i] + 8);
      ctx.lineTo(xArr + 10, yArr[i] + 8);
      ctx.stroke(); // Draw it
    }
    ctx.stroke();
    ctx.fill();
  }
}

function CardPile(cards) {
  this.cards = (cards === undefined ? [] : cards);
  this.addCard = function(cardObj) {
    this.cards.push(cardObj);
  };
  this.sendCardTo = function(cardId, dstPile) {
    var selectedCard = this.cards.splice(this.cards.indexOf(this.getCardById(cardId)), 1)[0];
    dstPile.addCard(selectedCard);
  };
  this.cardIndexFromId = function(cardId) {
    for (var i = 0; i < this.cards.length; i++) {
      if (this.cards[i].id === cardId) {
        return i;
      }
    }
  };
  this.sendMultipleCardsTo = function(idArr, dstPile) {
    var count = 0;
    while (count < idArr.length) {
      this.sendCardTo(this.getCardById(idArr[count]).id, dstPile);
      count++;
    }
    dstPile.multipleCardArray = this.multipleCardArray;
  };
  this.getCardById = function(cardId) {
    return this.cards.filter(function(card) {
      return card.id === cardId;
    })[0];
  };
  this.resetPile = function() {
    this.cards = [];
  };
  this.makeRandomIdArray = function(numCards) {
    this.multipleCardArray = [];
    for (var i = 0; i < numCards; i++) {
      var randomCardId = this.cards[Math.floor(Math.random() * this.cards.length)].id;
      this.multipleCardArray.push(randomCardId);
    }
    return this.multipleCardArray;
  };
  this.multipleCardArray = [];
  this.stage = [];
  this.selectForStaging = function(cardId) {
    if (this.stage.length < 3) {
      this.stage.push(this.getCardById(cardId));
    }
  };
  this.removeFromStage = function(cardId) {
    this.stage.splice(indexOf(this.getCardById(cardId)), 1);
  };
}

function createDeck() {
  var shapes = ["A", "B", "C"];
  var numbers = [1, 2, 3];
  var colors = ["red", "green", "purple"];
  var fills = ["solid", "hatched", "none"];
  var cardArray = [];
  var index = 0;
  var propVariations = 3;
  for (var i = 0; i < propVariations; i++) {
    for (var j = 0; j < propVariations; j++) {
      for (var k = 0; k < propVariations; k++) {
        for (var l = 0; l < propVariations; l++) {
          var cardObject = {
            id: "cid00" + index,
            shape: shapes[i],
            number: numbers[j],
            color: colors[k],
            fill: fills[l],
          };
          cardArray.push(cardObject);
          index++;
        }
      }
    }
  }
  return cardArray;
}

function compareCards(cardArr) {
  var noMatch = "";
  var allProps = {
    colors: [],
    fills: [],
    numbers: [],
    shapes: [],
  };
  cardArr.forEach(function(card) {
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
}


