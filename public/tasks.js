var playerCards = [];
var dealerCards = [];
var playerTotal = 0;
var dealerTotal = 0;
var stand = false;
var deck;

// add event listener for button
window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    
    

    newGame();
    document.getElementById("player_score").innerHTML = "Your Total: " + playerTotal;
    document.getElementById("dealer_score").innerHTML = "Dealer Total: " + dealerTotal;

    const drawBtn = document.getElementById("draw_button");
    drawBtn.addEventListener("click", drawCards);

    const restartBtn = document.getElementById("restart_button");
    restartBtn.addEventListener("click", restartGame);

    const standBtn = document.getElementById("stand_button");
    standBtn.addEventListener("click", playerStand);
}

function newGame() {
    // var xhr = new XMLHttpRequest;
    // xhr.addEventListener ("load", function() {
    //     deck = xhr.response;
    //     console.log(xhr.response);
    // })
    // xhr.responseType = "json";
    // xhr.open("GET", "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6");
    // xhr.send();
    
    // var deckID = deck.deck_id;
    // console.log(deck);
    async function getISS() {
        let response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6");
        deck = await response.json();
        let deckID = deck.deckID;
    }
    getISS();
}

function drawCards() {
    if (!stand && playerCards.length < 7) {
        playerDraw();
    } else {
        dealerDraw();
    }
    checkWin();
}

function playerDraw() {
    let pInd = playerCards.length;
    playerCards[pInd] = 1;
    playerTotal += playerCards[pInd];
    document.getElementById("player_score").innerHTML = "Your Total: " + playerTotal;
    document.getElementById("p" + pInd).src = ""; //USE API TO GET THE PICTURE, DOES THE CONCATENATION WORK
    if(pInd > 7) {
        dealerDraw();
    }
    
}

function dealerDraw() {
    //USE SOME SORT OF TIMER
    while(dealerTotal < 17 && dealerCards.length < 7) {
        let dInd = dealerCards.length;
        dealerCards[dInd] = 1;
        dealerTotal += dealerCards[dInd];
        document.getElementById("dealer_score").innerHTML = "Dealer Total: " + dealerTotal;
        document.getElementById("d" + dInd).src = "";
    }
    
}

function restartGame() {
    
    //SHUFFLE DECK

    //RESET IMAGE SRCs 
    //playerCards[0] = ;
    playerCards = [1, 1];
    dealerCards = [1, 1];
    playerTotal = 2;
    document.getElementById("player_score").innerHTML = "Your Total: " + playerTotal;
    dealerTotal = 2;
    document.getElementById("dealer_score").innerHTML = "Dealer Total: " + dealerTotal;
    stand = false;
}


function checkWin() {

}

function playerStand() {
    stand = true;
    dealerDraw();
}