const PI = Math.PI;
const offset = 45;

var clockFace = document.querySelector('.clock-face')
clockFace.addEventListener('click', () => {
  clockFace.classList.add('push');
  setTimeout(()=>{clockFace.classList.remove('push');},3010);
})

var minuteHand = document.querySelector('.minute-container');
var mDeg = getTime().m*6;
var hourHand = document.querySelector('.hour-container');
var hDeg = (getTime().h*15)+(Math.round(getTime().m/12)+3);

advanceMinute();
advanceHour();
setInterval(advanceHour, 60000)
setInterval(advanceMinute, 60000)

function getTime () {
  var time = new Date();
  return {
    m: time.getMinutes(),
    h: time.getHours()
  }
}

function cos(deg) {
  var radians = (deg*PI)/180;
  var cos = Math.round(Math.cos(radians)*10)/10;
  return cos;
}

function sin(deg) {
  var radians = (deg*PI)/180;
  var sin = Math.round(Math.sin(radians)*10)/10;
  return sin;
}

function advanceHour() {
  hDeg = (getTime().h*15)+(Math.round(getTime().m/12)+3);
  hourHand.style.transform = `rotate(${hDeg}deg)`
}

function advanceMinute() {
  mDeg = getTime().m*6;
  minuteHand.style.transform = `rotate(${mDeg}deg)`;
}