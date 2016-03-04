var userInNumber = false; //is the user in the middle of typing a number?
var currentOperator = ""; //what is the operator that we have to perform the operation on?
var operandStack = []; //might be good to have a stack to hold our integers

var display = { //the main display screen.. better define some useful functions for it
	get: function() { return document.getElementById("display").innerHTML; },
	append: function(text) { document.getElementById("display").innerHTML += text; }
}

display.set = function(text) { 
	//text = text.toString().substring(0,8);
	document.getElementById("display").innerHTML = text; 
}

var history = { //the history screen.. again some functions would be good
	back: function() { document.getElementById("history").innerHTML = document.getElementById("history").innerHTML.slice(0,-3); }
}
history.append = function(text) { document.getElementById("history").innerHTML += text; }
history.set = function(text) { document.getElementById("history").innerHTML = text; }

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

function percent(){
	
	operatorPress("/");
	numberPress(100);
	operatorPress("=", true);
}

function operatorPress (input, isEquals) {
	//if the user is still typing in a number, we need to complete it and put that number on the stack
	//if the user is not typing a number, we need to get what's on the display and use that to perform an operation
	//
	if (input === "plusMinus") {
		if (display.get().slice(0,1) === "-")
			display.set(display.get().slice(1));
		else
			display.set("-".concat(display.get()));
		return;
	}
	//console.log(currentOperator, isEquals);
	if (userInNumber) {
		enter();
	}


	if (operandStack.length === 1) {
		if (input != "=") currentOperator = input;
	} else {
		switch (currentOperator) {
		case "+": performOperation(function(a,b) { return a + b }); break;
		case "-": performOperation(function(a,b) { return b - a }); break;
		case "*": performOperation(function(a,b) { return a * b }); break;
		case "/": performOperation(function(a,b) { return b / a }); break;
		case "%": performOperation(function(a,b) { return b / a }	); break;
		case "=": return; break;
		default:
		}
		if (input != "=") currentOperator = input;
	}
	console.log(typeof isEquals); 
	if (typeof isEquals === "undefined")
		history.append(" " + input + " ");
	
}

function clearButton(input) {
	console.log("clear");
	operandStack = [];
	display.set("0");
	history.set("");
}

function performOperation(expression) {
	console.log("performing");
	display.set(expression(operandStack.pop(), operandStack.pop()));
	enter();

}

function enter(input) {
	if (input === "=" && userInNumber) {
		operatorPress(currentOperator, true);
	}
	userInNumber = false;
	operandStack.push(parseFloat(display.get()));
	console.log(operandStack);
}
