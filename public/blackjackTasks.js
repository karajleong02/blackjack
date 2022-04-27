var playerCards = [0];
var dealerCards = [0];
var playerTotal = 0;
var dealerTotal = 0;
var stand = false;
var deck;
let deckID = "tplx2p8qeqdt";



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
    standBtn.addEventListener("click", dealerDraw);
    standBtn.addEventListener("click", sendWin)
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
    
    getCard(0, 0);
    getCard(1, 0);
    getCard(0, 1);
    getCard(1, 1);
   
}


function getCard(ind, isPlayer) { //for person 0 is player, 1 is dealer
    console.log("inside getCard");
    let xhr = new XMLHttpRequest;
    xhr.addEventListener ("load", function() {
        card = JSON.stringify(xhr.response.cards[0].value);
        card = card.split("\"")[1];
        img = JSON.stringify(xhr.response.cards[0].image);
        let val = 0;
        console.log("before if statement")
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
            if (dealerTotal < 17) {
                dealerCards[ind] = val;
                document.getElementById("d" + ind).src = img.split("\"")[1];
                document.getElementById("d" + (ind)).style.display = "initial";
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
        checkWin();
    } else {
        dealerDraw();
    }
    
}

function dealerDraw() {
    //USE SOME SORT OF TIMER
    for(i = 2; i < 7; i++) {
        getCard(i, 1);
    }
    checkWin();
}

function restartGame() {

    //RESET IMAGE SRCs 
    for(ind = 0; ind < playerCards.length; ind ++) {
        document.getElementById("p" + (ind+1)).src = " "; 
        document.getElementById("p" + (ind+1)).style.display = "none";
    }
    for(ind = 0; ind < dealerCards.length; ind++) {
        document.getElementById("d" + (ind+1)).src = " "; 
        document.getElementById("d" + (ind+1)).style.display = "none";
    }
    document.getElementById("winStatus").innerHTML = "";
    playerCards = [0];
    dealerCards = [0];
    getCard(0, 0);
    getCard(1, 0);
    getCard(0, 1);
    getCard(1, 1);
    playerTotal = 0;
    document.getElementById("player_score").innerHTML = "Your Total: " + playerTotal;
    dealerTotal = 0;
    document.getElementById("dealer_score").innerHTML = "Dealer Total: " + dealerTotal;
    stand = false;
}


function checkWin() {
    if (playerTotal <21) {
        console.log("");
    } else {
        if(playerTotal > 21) {
            if (dealerTotal > 21) {
                document.getElementById("winStatus").innerHTML = "Tie";
                // sendTie();
            } else {
                document.getElementById("winStatus").innerHTML = "You Lose!";
                // sendLose();
            }
        } else if (dealerTotal > 21 || playerTotal > dealerTotal){
            document.getElementById("winStatus").innerHTML = "You Win!";
            sendWin();
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
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    // notice the query string is passed as a parameter in xhr.send()
    // this is to prevent the data from being easily sniffed
    // xhr.send(query)
    console.log("finished send win");
}

function responseHandler(){
    let message = document.getElementById("message")
    message.style.display = "block"
    if (this.response.success){    
        message.innerText = this.response.message
    }else{
        console.log(this.response.success)
        message.innerText = this.response.message
    }
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
    xhr.send(query)
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
    xhr.send(query)
}

function playerStand() {
    stand = true;
    dealerDraw();
    sendWin();
}
