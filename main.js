var userInNumber = false;
var currentOperator = "";

var display = new Object();
display.get = function() {
	return document.getElementById("display").innerHTML;
}
display.set = function(text) {
	document.getElementById("display").innerHTML = text;
}

var history = new Object();
history.set = function(text) {
	document.getElementById("history").innerHTML = text;
}
history.append = function(text) {
	document.getElementById("history").innerHTML += text;
}

var operandStack = [];


function start () {
	display.set('0');
}

function numberPress (input) {

	if (input === "." && display.get().indexOf(".") != -1 ) {
		return;
	}
	if (userInNumber) {
		display.set(display.get() + input);
	} else {
		display.set(input);
		userInNumber = true;
	}
	history.append(input);

}

function operatorPress (input) {
	if (userInNumber) {
		enter();
	}

	if (operandStack.length === 1) {
		currentOperator = input;
	} else {
		switch (currentOperator) {
		case "+": performOperation(function(a,b) { return a + b });
		break;
		case "-": performOperation(function(a,b) { return b - a });
		break;
		case "*": performOperation(function(a,b) { return a * b });
		break;
		case "/": performOperation(function(a,b) { return b / a });
		break;
		default:
		}
		currentOperator = input;
	}
	history.append(" " + input + " ");
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
