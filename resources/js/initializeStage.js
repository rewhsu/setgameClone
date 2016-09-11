

function createHtmlCanvases(index){
	// Create canvases for drawing and displaying card selection
	loadCanvasHtml(index, true);
	loadCanvasHtml(index, false);
};

function loadCanvasHtml(index, stackBool) {
	//Adds html elements for canvases
	  var myCanvas = document.createElement('canvas');
	  var parentDiv = document.getElementById('gameStage');
	  if (document.getElementById('canvas-'+index) === null){
	  	var myDiv = document.createElement('div');
	  }
	  else{
	  	var myDiv = document.getElementById('canvas-'+index);
	  }
	  myDiv.id = 'canvas-'+index;
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
	  if(stackBool !== undefined && stackBool === true){
	  	if(document.getElementById('canvas-'+index+'-back') === null){
		  	myCanvas.style.zIndex = 0;
		  	myCanvas.id = 'canvas-'+index+'-back';
	 	}
	 	else{
	 		return false;
	 	}
	  }
	  else{
	  	if(document.getElementById('canvas-'+index+'-front') === null){
		  	myCanvas.style.zIndex = 1;
		  	myCanvas.id = 'canvas-'+index+'-front';
	  	}
	  	else{
	  		return false;
	  	}
	  }
	  parentDiv.appendChild(myDiv);
	  myDiv.appendChild(myCanvas);
}

var SelectorCanvases = function(){
	this.div = document.getElementById('gameStage');
	this.deck = JSON.parse(localStorage.deck);
	this.stageSlots = JSON.parse(localStorage.stageSlots);
	this.selectedCanvases = JSON.parse(localStorage.selectedCanvases);
};

SelectorCanvases.prototype.getCanvas = function(cNum){
	this.c = document.getElementById('canvas-' + cNum + '-front');
	this.ctx = this.c.getContext("2d");
};

SelectorCanvases.prototype.isSelected = function(cNum){
	if(this.selectedCanvases.indexOf(cNum) !== -1){
		return true;
	}
	else{
		return false;
	}
};

SelectorCanvases.prototype.selectCard = function(cNum){
    this.ctx.globalAlpha = 0.5;
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(5, 5, 90, 90);
    this.ctx.stroke();
    this.ctx.fill();
    this.selectedCanvases.push(cNum);
    setLocalItem('selectedCanvases', this.selectedCanvases);
};

SelectorCanvases.prototype.deselectCard = function(cNum){
	this.ctx.beginPath();
	this.ctx.globalAlpha = 0.5;
	this.ctx.clearRect(5, 5, 90, 90);
	this.ctx.stroke();
    this.ctx.fill();
    var splice = this.selectedCanvases.splice(this.selectedCanvases.indexOf(cNum), 1);
    setLocalItem('selectedCanvases', this.selectedCanvases);
};

SelectorCanvases.prototype.addDivClickEvent = function(){
	var objectScope = this;
	var myDiv = document.getElementById('gameStage');
  	myDiv.addEventListener('click', function e(event) {
  		var deleteBool = JSON.parse(localStorage.getItem('deleteBool'))[0];
  		if (deleteBool){
  			this.removeEventListener('click', e);
  			setLocalItem('deleteBool', JSON.stringify([false]));
  			return true;
  		}
  		var selectedArray = JSON.parse(localStorage.selectedCanvases);
	  	var selectedLength = JSON.parse(localStorage.selectedCanvases).length;
	  	//var selectedHtml = document.getElementById('p_test1').innerHTML;
	    var clickToCanvasNum = objectScope.canvasClick(event.pageX, event.pageY);
	    var myCanvas = objectScope.getCanvas(clickToCanvasNum);
	    if(selectedLength < 3 && objectScope.isSelected(clickToCanvasNum) === false){
	      if(selectedLength === 2 && objectScope.isSelected(clickToCanvasNum) === false){
	      	objectScope.selectCard(clickToCanvasNum);
	      	//selectedArray.push(clickToCanvasNum);
	      	//alert("compare these cards");
	      }
	      else{
	      	objectScope.selectCard(clickToCanvasNum);
	      }
	    }
	    else if (objectScope.isSelected(clickToCanvasNum) === true){
	    	//selectedArray.splice(selectedArray.indexOf(clickToCanvasNum),1);
	    	objectScope.deselectCard(clickToCanvasNum);
	    }
	    else if (selectedLength === 3 && objectScope.isSelected(clickToCanvasNum) === false){
	    	alert("More than three cards staged already");
	    };
  }, false);
};

SelectorCanvases.prototype.canvasClick = function(abs_x, abs_y) {
	console.log("abs_x: " + abs_x + " abs_y: " + abs_y);
	var element = document.getElementById('gameStage');
	var rect = element.getBoundingClientRect();
	var yOffset = rect.top + window.scrollY;
	var x = abs_x;
	var y = abs_y - yOffset;
	console.log(y);
	var myDiv = document.getElementById('gameStage');
	  var cnum = 0;
	  var divY = 308;
	  var divX = 315;
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
	  if (x > (divX * 2 / 3) && x < divX) {
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
	  //alert("Clicked on: myCanvas" + cnum + " x:" + x + " y:" + y);
	  return cnum;
};