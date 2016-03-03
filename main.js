var userInNumber = false;

var display = new Object();
display.get = function() {
	return document.getElementById("display").innerHTML;
}
display.set = function(text) {
	document.getElementById("display").innerHTML = text;
}

function start () {
	display.set('0');
}

function buttonPress (input) {

	if (input === "." && display.get().indexOf(".") != -1 ) {
		return;
	}
	if (userInNumber) {
		display.set(display.get() + input);
	} else {
		display.set(input);
		userInNumber = true;
	}

	
 	/*
	if (numbersArray.indexOf(input) > -1) { 
		if (getDisplay() === "0") { setDisplay("") }; //remove zero if it's the first number pressed
		setDisplay(getDisplay() + input);
	} else if (operatorsArray.indexOf(input) > -1) {
		//prevent add to display if it's the first button pressed
		//prevent add to display if the character before it was another operator

	} else if (input === ".") {
		//add zero if it's the first button pressed (actually it's already implemented like this)
		//add zero if it's the first button pressed after an operator
		//prevent if the current number is also a decimal

	} else if (input === "0") {
		//prevent if current number is already zero
		

	} else if (input === "%") {

	} else if (input === "+/-") {

	} else if (input === "AC") {

	} else if (input === "=") {

	}
	*/
}

/*
function getCurrentNumber() {

}

function isOperator(input) {
	return ["+", "-", "*", "/", "=",].indexOf(input) > -1;
}

function isOperand(input) {
	return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].indexOf(input) > -1;
}
*/

