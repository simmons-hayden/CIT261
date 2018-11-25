let quote = {
    quote: "",
    author: "",
    cat: ""
};

let changeQuote = function(data) {
    document.querySelector('.quote-text').textContent = `${data.quote}`;
    document.querySelector('.author').innerHTML = `<br> - ${data.author}`;
    document.querySelector('.cat').innerHTML = `<br>Category - ${data.cat} `;
}

let getRandomQuote = function() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            processJSON(this.responseText);
        }
    };

    xhttp.open("GET", "https://talaikis.com/api/quotes/random/", true);
    xhttp.send();
};

getRandomQuote();

document.querySelector('#loadQuote').addEventListener('click', getRandomQuote);

function processJSON (text) {
    var data = JSON.parse(text);
    console.log(data);
    var string = JSON.stringify(data);
    console.log(string);
    quote.quote = data.quote;
    quote.author = data.author;
    quote.cat = data.cat;
    changeQuote(quote);
}