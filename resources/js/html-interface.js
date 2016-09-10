/**
 * @author Andrew
 */

function setLocalItem(item, myObj){
	localStorage.setItem(item, JSON.stringify(myObj));
}

function getLocalItem(item){
	return localStorage.getItem(item);
}

function updateText(id, item){
	document.getElementById(id).innerHTML = localStorage.getItem(item);
}