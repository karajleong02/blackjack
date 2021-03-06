var playerCards = [0];
var dealerCards = [0];
var playerTotal = 0;
var dealerTotal = 0;
var stand = false;
var deck;
let deckID = "wx7rcacs4dsd";



// add event listener for button
window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    newGame();
    document.getElementById("player_score").innerHTML = "Your Total: " + playerTotal;
    document.getElementById("dealer_score").innerHTML = "Dealer Total: " + dealerTotal;

    const drawBtn = document.getElementById("draw_button");
    drawBtn.addEventListener("click", playerDraw);

    const restartBtn = document.getElementById("restart_button");
    restartBtn.addEventListener("click", restartGame);

    const standBtn = document.getElementById("stand_button");

    standBtn.addEventListener("click", sendWin)

    standBtn.addEventListener("click", playerStand);
}

function newGame() {
    
    let xhr = new XMLHttpRequest;
    var cardid = document.getElementById("cardid");
    xhr.addEventListener ("load", function() {
        deckID = xhr.response.deck_id;
        cardid.innerHTML = deckID;
        deckID = (cardid.innerHTML);
    })
    xhr.responseType = "json";
    xhr.open("GET", "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6");
    xhr.send();
    
    playerDraw();
   
}


function getCard(ind, isPlayer) { //for person 0 is player, 1 is dealer
    let xhr = new XMLHttpRequest;
    xhr.addEventListener ("load", function() {
        card = JSON.stringify(xhr.response.cards[0].value);
        card = card.split("\"")[1];
        img = JSON.stringify(xhr.response.cards[0].image);
        let val = 0;
        if(!isNaN(parseInt(card))){ 
            val = parseInt(card)
        } else {
            if (card === "ACE") {
                val = 11;
            } else {
                val = 10;
            }
        }
        if (isPlayer == 0) {
            playerCards[ind] = val;
            document.getElementById("p" + ind).src = img.split("\"")[1]; 
            document.getElementById("p" + (ind)).style.display = "initial";
            playerTotal += playerCards[ind];
            document.getElementById("player_score").innerHTML = "Your Total: " + playerTotal;
        } else if (isPlayer == 1){
            console.log("in dealer drawing")
            console.log(dealerTotal)
            console.log(playerTotal);
            if (dealerTotal < 17) {
                dealerCards[ind] = val;
                document.getElementById("d" + ind).src = img.split("\"")[1];
                document.getElementById("d" + ind).style.display = "initial";
                dealerTotal += dealerCards[ind];
                document.getElementById("dealer_score").innerHTML = "Dealer Total: " + dealerTotal;
            }
        }  
    })
    xhr.responseType = "json";
    xhr.open("GET", "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1");
    xhr.send();
    
    
}

function playerDraw() {
    
    let pInd = playerCards.length;
    if (playerCards.length < 7 && playerTotal < 21 && !stand) {
        getCard(pInd, 0);
    }
    
}

function dealerDraw() {
    //USE SOME SORT OF TIMER
    console.log("calls dealer");
    for(i = 0; i < 7; i++) {
        getCard(i, 1);
    }
    console.log("before check win");
}                           

function restartGame() {

    stand = false;
    for(ind = 0; ind < playerCards.length; ind ++) {
        document.getElementById("p" + (ind+1)).src = " "; 
        document.getElementById("p" + (ind+1)).style.display = "none";
    }
    for(ind = 0; ind < dealerCards.length; ind++) {
        document.getElementById("d" + (ind+1)).src = " "; 
        document.getElementById("d" + (ind+1)).style.display = "none";
    }
    document.getElementById("d1").src = "cardBack.png"; 
    document.getElementById("d1").style.display = "initial"; 
    document.getElementById("winStatus").innerHTML = "";
    playerCards = [0];
    dealerCards = [0];
    playerDraw();
    playerTotal = 0;
    document.getElementById("player_score").innerHTML = "Your Total: " + playerTotal;
    dealerTotal = 0;
    document.getElementById("dealer_score").innerHTML = "Dealer Total: " + dealerTotal;
    
}


function checkWin() {
    if (playerTotal <= 21) {
        console.log("player total is less than 21")
        if (dealerTotal > playerTotal) {
            console.log("player shoudl lose to dealer")
            sendLose();
        } else if (dealerTotal == playerTotal) {
            console.log("player should tie");
            sendTie();
        } else {
            console.log("player should win");
            // sendWin();
        }
    } else {
        console.log("player total is over 21 should lose");
        if(playerTotal > 21 || dealerTotal > playerTotal) {
            console.log("player should very much lose")
            sendLose();
        } else if (dealerTotal > 21 || playerTotal > dealerTotal){
            console.log(dealerTotal);

            document.getElementById("winStatus").innerHTML = "You Win!";
            // sendWin();
        }
    }
}

function sendWin() {
    console.log("got to send win here");
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", responseHandler)

    // when submitting a GET request, the query string is appended to URL
    // but in a POST request, do not attach the query string to the url
    // instead pass it as a parameter in xhr.send()
    url = `/sendWin`
    xhr.responseType = "json";   
    xhr.open("POST", url)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    // notice the query string is passed as a parameter in xhr.send()
    // this is to prevent the data from being easily sniffed
    xhr.send();
    console.log("finished send win");
}


function sendLose() {
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", responseHandler)

    // when submitting a GET request, the query string is appended to URL
    // but in a POST request, do not attach the query string to the url
    // instead pass it as a parameter in xhr.send()
    url = `/sendLose`
    xhr.responseType = "json";   
    xhr.open("POST", url)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    // notice the query string is passed as a parameter in xhr.send()
    // this is to prevent the data from being easily sniffed
    xhr.send();
}

function sendTie() {
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", responseHandler)

    // when submitting a GET request, the query string is appended to URL
    // but in a POST request, do not attach the query string to the url
    // instead pass it as a parameter in xhr.send()
    url = `/sendTie`
    xhr.responseType = "json";   
    xhr.open("POST", url)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    // notice the query string is passed as a parameter in xhr.send()
    // this is to prevent the data from being easily sniffed
    xhr.send();
}

function responseHandler(){
    if (this.response.success){    
        console.log(this.response.success);
    }else{
        console.log(this.response.success);
    }
}
function playerStand() {
    stand = true;
    dealerDraw();
    checkWin();
}
