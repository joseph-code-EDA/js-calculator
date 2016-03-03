var userInNumber = false;

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

	switch (input) {
		case "+": performOperation(function(a, b) { a * b });
		break;

	}

	history.append(" " + input + " ");
}

function performOperation(operation) {
	if (operandStack.length >= 2) {
		display.set(operation(operandStack.pop(), operandStack.pop()));

	}

}

function enter() {
	userInNumber = false;
	display.set(perandStack.pop());
}
