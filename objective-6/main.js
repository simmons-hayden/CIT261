var counter = 1;
var stack = document.getElementById('stack');

function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
  return `${getRandInt(0,255)}, ${getRandInt(0,255)}, ${getRandInt(0,255)}`;
}

document.getElementById('add-top').addEventListener('click', function() {
  counter++;
  var newDiv = createDiv(counter);
  stack.insertBefore(newDiv, stack.children[0]);
});

document.getElementById('add-bottom').addEventListener('click', function() {
  counter++;
  var newDiv = createDiv(counter);
  stack.appendChild(newDiv);
});

document.getElementById('stack').addEventListener('click', function(e) {
    if (e.target.className === 'remove') {
      let div = e.target.parentElement;
      div.parentNode.removeChild(div);
    }
    else if (e.target.className === 'change-color') {
      let div = e.target.parentElement;
      div.setAttribute('style', `background-color: rgb(${randomColor()})`)
    }
});

function createDiv(num) {
  var newDiv = document.createElement('div');
  newDiv.classList.add('block');

  var h2 = document.createElement('h2');
  h2.appendChild(document.createTextNode(`Block #${num}`));
  newDiv.appendChild(h2);

  var button1 = document.createElement('button');
  button1.appendChild(document.createTextNode('Change color'));
  button1.classList.add('change-color');
  newDiv.appendChild(button1);
     
  var button2 = document.createElement('button');
  button2.appendChild(document.createTextNode('X'));
  button2.classList.add('remove');
  newDiv.appendChild(button2);

  return newDiv;
};