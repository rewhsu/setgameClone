/**
 * @author Andrew
 */

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
            id: "cid_" + index,
            shape: shapes[i],
            number: numbers[j],
            color: colors[k],
            fill: fills[l],
          };
          // cardObject.canvas = new CardCanvasObject(cardObject);
          cardArray.push(cardObject);
          index++;
        }
      }
    }
  }
  // localStorage.setItem('deck', JSON.stringify(cardArray));
  // cardArray.forEach(function(cardObj){
  //   //Draw our card after processing object properties
  // });
  return cardArray;
}; 

export default createDeck;