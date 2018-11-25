function backgroundColor(color) {
    document.body.style.background = color; 
}

function fontStyle(style) {
    document.getElementById("font").style.fontStyle = style;
}
    
function fontFamily(font) {
    document.getElementById("font").style.fontFamily = font;
}

function fontWeight(weight) {
    document.getElementById("font").style.fontWeight = weight;
}

function getClassColor(color) {
	var fontArea = document.getElementById('fontArea');
	fontArea.style.background = color;
}

function addClass1() {
       document.getElementById("maybeMessage").classList.add("box");
}

function addClass2() {
       document.getElementById("maybeMessage").classList.add("purpleBackground");
}

function addClass3() {
       document.getElementById("maybeMessage").classList.add("transform");
}

function removeClass1() {
       document.getElementById("maybeMessage").classList.remove("box");
}

function removeClass2() {
       document.getElementById("maybeMessage").classList.remove("purpleBackground");
}

function removeClass3() {
       document.getElementById("maybeMessage").classList.remove("transform");
}
