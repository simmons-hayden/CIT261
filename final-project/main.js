var memoryArray = [];
var emojiArray = [];
var memoryValues = [];
var memoryCards = [];
var flippedCards = 0;
var moveCount = 0;
var seconds = 0;

var xmlhttp = new XMLHttpRequest();
var url = "https://unpkg.com/emoji.json/emoji-compact.json";

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        emojiArray = JSON.parse(this.responseText);

        for (k = 0; k < emojiArray.length; k++) {
            switch (emojiArray[k]) {
                case "🥰":
                    emojiArray.splice(k, 1);
                case "🥵":
                    emojiArray.splice(k, 1);
                case "🥶":
                    emojiArray.splice(k, 1);
                case "🥳":
                    emojiArray.splice(k, 1);
                case "🥴":
                    emojiArray.splice(k, 1);
                case "🥺":
                    emojiArray.splice(k, 1);
            }
        }
        startBoard();
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

function loadEmojis() {
    emojiArray.splice(140);
    emojiArray.burritoCardShuffle();
    for (j = 0; j < emojiArray.length; j++) {
        memoryArray[j] = emojiArray[j];
    }
    memoryArray.splice(8);
    memoryArray = memoryArray.concat(memoryArray);
}

Array.prototype.burritoCardShuffle = function () {
    let i = this.length, j, temp;
    for (i = this.length - 1; i > 0; --i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function startBoard() {
    flippedCards = 0;
    moveCount = 0;
    memoryValues = [];
    memoryCards = [];
    document.getElementById('moveCount').innerHTML = moveCount;
    document.getElementById('time').innerHTML = 0;
    var output = '';
    loadEmojis();
    memoryArray.burritoCardShuffle();
    for (let i = 0; i < memoryArray.length;) {
        output += '<tr>';
        for (let j = 0; j < 4; j++) {
            output += '<div class="front" id="card' + i + '" ontouchend="flipBurritoCard(this,\'' + memoryArray[i] + '\')" " onclick="flipBurritoCard(this,\'' + memoryArray[i] + '\')"></div>';
            output += '</td>';
            i++;
        }
    }
    document.getElementById('burritoBoard').innerHTML = output;
    startTime();
}

function flipBurritoCard(card, val) {
    if (card.innerHTML == "" && memoryValues.length < 2) {
        moveCount++;
        document.getElementById('moveCount').innerHTML = moveCount;
        card.className = "back";
        card.innerHTML = val;

        if (memoryValues.length == 0) {
            memoryValues.push(val);
            memoryCards.push(card.id);
        } else if (memoryValues.length == 1) {
            memoryValues.push(val);
            memoryCards.push(card.id);
            if (memoryValues[0] == memoryValues[1]) {
                flippedCards += 2;
                memoryValues = [];
                memoryCards = [];
                if (flippedCards == memoryArray.length) {
                    clearInterval(nowTime);
                    document.getElementById('time').innerHTML = seconds;
                    document.getElementById('burritoBoard').innerHTML = "<h1><p>Wow. <br/>You took " + moveCount + " moves and " + seconds + " seconds to get this thing done.<br/>Click restart to do this all over again!<br/><div class = 'clown'>🎈🤡</div></h1 > ";
                }
            } else { setTimeout(flipBack, 400); }
        }
    }
}

function flipBack() {
    var card1 = document.getElementById(memoryCards[0]);
    var card2 = document.getElementById(memoryCards[1]);
    card1.className = "front";
    card2.className = "front";
    card1.innerHTML = "";
    card2.innerHTML = "";
    memoryValues = [];
    memoryCards = [];
}

function startTime() {
    seconds = 0;
    nowTime = setInterval(function () {
        document.getElementById('time').innerHTML = seconds;
        seconds++;
    }, 1000)
}