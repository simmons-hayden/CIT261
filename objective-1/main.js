//For loop
function forLoop() {
    var number = "";
    var num = 3;
    for (var i = 0; i < num; i++) {
        var random = Math.floor((Math.random() * 1000) + 1);
        if (i == 3) {
            number += random;
        }
        else {
            number += random + " ";
        }
        document.getElementById('forLoopOutput').innerHTML = number;
    }
    document.getElementById('randomGenerator').innerHTML = "Regenerate";
}

//While loop
function whileLoop() {
    var output = "";
    var count = 0;

    while (count < 20) {
        if (count < 19) {
            output += count + 1 + ", ";
        }
        else {
            output += count + 1;
        }
        count++;
    }

    document.getElementById("whileLoopOutput").innerHTML = output;
}

function clearWhileLoop() {
    document.getElementById("whileLoopOutput").innerHTML = "";
}

//Do while loop
function whileDoLoop() {

    var count = "";
    var num = 1;

    do {
        count += "<br>" + num + " banana, ah ah ah";
        num++;
    }
    while (num < 5 + 1)

    document.getElementById("doLoopOutput").innerHTML = count;
}

function clearDo() {
    document.getElementById("doLoopOutput").innerHTML = "";
}

//Conditional statement - if, if else, else
function process() {
    var numberGrade = document.getElementById('enterGrade').value;
    var myGrade = ifStatement(numberGrade);
    document.getElementById("letterGrade").innerHTML = myGrade;
}

function ifStatement(grade) {

    var letterGrade = "";

    if (grade >= 95 && grade <= 100) {
        letterGrade = "A";
    }

    else if (grade >= 90 && grade <= 94) {
        letterGrade = "A-";
    }

    else if (grade >= 87 && grade <= 89) {
        letterGrade = "B+";
    }

    else if (grade >= 84 && grade <= 86) {
        letterGrade = "B";
    }

    else if (grade >= 80 && grade <= 83) {
        letterGrade = "B-";
    }

    else if (grade >= 77 && grade <= 79) {
        letterGrade = "C+";
    }

    else if (grade >= 74 && grade <= 76) {
        letterGrade = "C";
    }

    else if (grade >= 70 && grade <= 73) {
        letterGrade = "C-";
    }

    else if (grade >= 67 && grade <= 69) {
        letterGrade = "D+";
    }

    else if (grade >= 64 && grade <= 66) {
        letterGrade = "D";
    }

    else if (grade >= 60 && grade <= 63) {
        letterGrade = "D-";
    }

    else {
        letterGrade = "F";
    }

    return letterGrade;

}

function clearGrade() {
    document.getElementById('enterGrade').value = "";
    document.getElementById("letterGrade").innerHTML = "";
}

//Parameters and varibales
function convert(distance) {

    var inDistance;

    if (distance == 'KM') {

        inDistance = document.getElementById('km').value * 0.62137
        document.getElementById('mi').value = Math.round(inDistance);
    }
    else {
        inDistance = document.getElementById('mi').value / 0.62137;
        document.getElementById('km').value = Math.round(inDistance);
    }

}

function clearDistance() {
    document.getElementById("km").value = "";
    document.getElementById("mi").value = "";
}

//Array
var names = new Array();

function array() {
    var inputArray1 = document.getElementById('inputArray1').value;
    var inputArray2 = document.getElementById('inputArray2').value;

    names.push(inputArray1 + " " + inputArray2);

    document.getElementById("inputArray1").value = " ";
    document.getElementById("inputArray2").value = " ";

    document.getElementById("arrayDemo1").innerHTML = names + "  ";
}

function clearArray() {
    names = [];

    document.getElementById("arrayDemo1").innerHTML = "";
}

//Associate array
function associativeArray() {
    var associativeInput = document.getElementById('associativeArrayinput').value;
    var sandwich = {
        bread: "Ciabatta",
        vegetables: "Arugula",
        cheese: "Mozzarella",
        meat: "Prosciuttio",
        condiment: "Balsamic vinegar"
    }
    document.getElementById('associativeArrayOutput').innerHTML = sandwich[associativeInput];
}