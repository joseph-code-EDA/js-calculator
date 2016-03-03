var userInNumber = false; //is the user in the middle of typing a number?
var currentOperator = ""; //what is the operator that we have to perform the operation on?
var operandStack = []; //might be good to have a stack to hold our integers

var display = { //the main display screen.. better define some useful functions for it
	get: function() { return document.getElementById("display").innerHTML; },
	set: function(text) { document.getElementById("display").innerHTML = text; },
	append: function(text) { document.getElementById("display").innerHTML += text; }
}

var history = { //the history screen.. again some functions would be good
	set: function(text) { document.getElementById("history").innerHTML = text; }
}

history.append = function(text) { document.getElementById("history").innerHTML += text; }

function start () { //when we load our calculator, we should probably set the screen to 0... or maybe 58008?
	display.set('0');
}

function numberPress (input) {
	if (input === "." && display.get().indexOf(".") != -1 ) {
		return;
	}
	if (userInNumber) {
		display.append(input);
	} else {
		if (input === ".") input = "0.";
		display.set(input);
		userInNumber = true;
	}
	history.append(input);
}

function operatorPress (input) {
	if (userInNumber) {
		enter();
		if (operandStack.length === 1) {
			currentOperator = input;
		} else {
			switch (currentOperator) {
			case "+": performOperation(function(a,b) { return a + b }); break;
			case "-": performOperation(function(a,b) { return b - a }); break;
			case "*": performOperation(function(a,b) { return a * b }); break;
			case "/": performOperation(function(a,b) { return b / a }); break;
			case "=": return; break;
			default:
			}
			currentOperator = input;
		}
		history.append(" " + input + " ");
	}
}

function clear() {
	console.log("clear");
	operandStack = [];
	display.set("");
	history.set("");
}

function operate() {

}

function performOperation(expression) {
	display.set(expression(operandStack.pop(), operandStack.pop()));
	enter();

}

function enter() {
	userInNumber = false;
	operandStack.push(parseFloat(display.get()));
	console.log(operandStack);
}
