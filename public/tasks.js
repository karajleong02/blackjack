var playerCards = ["0", "0"];
var dealerCards = ["0", "0"];
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
    drawBtn.addEventListener("click", draw);

    const restartBtn = document.getElementById("restart_button");
    restartBtn.addEventListener("click", restartGame);

    const standBtn = document.getElementById("stand_button");
    stand = true;
    standBtn.addEventListener("click", draw);
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
    
}


function draw() {
    if (!stand && playerCards.length < 7 && playerTotal < 21) {
        playerDraw();
    } else {
        dealerDraw();
    }
    checkWin();
}

function getCard(ind, isPlayer) { //for person 0 is player, 1 is dealer
    
    let xhr = new XMLHttpRequest;
    xhr.addEventListener ("load", function() {
        card = JSON.stringify(xhr.response.cards[0].value);
        card = card.split("\"")[1];
        if(!isNaN(parseInt(card))){
            if (isPlayer) {
                playerCards[ind] = parseInt(card);
                playerTotal += playerCards[ind];
            } else {
                dealerCards[ind] = parseInt(card);
                dealerTotal += dealerCards[ind];
            }
            
        }   
    })
    xhr.responseType = "json";
    xhr.open("GET", "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1");
    xhr.send();
    
}

function playerDraw() {
    let pInd = playerCards.length;
    getCard(pInd, true);
    
    document.getElementById("player_score").innerHTML = "Your Total: " + playerTotal;
    //document.getElementById("p" + pInd).src = ""; //USE API TO GET THE PICTURE, DOES THE CONCATENATION WORK
    if(pInd > 7) {
        dealerDraw();
    }
    
}

function dealerDraw() {
    //USE SOME SORT OF TIMER
    while(dealerTotal < 17 && dealerCards.length < 7) {
        let dInd = dealerCards.length;
        // dealerCards[dInd] = 1;
        // dealerTotal += dealerCards[dInd];
        getCard(dInd, false);
        
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
    playerTotal = 0;
    document.getElementById("player_score").innerHTML = "Your Total: " + playerTotal;
    dealerTotal = 0;
    document.getElementById("dealer_score").innerHTML = "Dealer Total: " + dealerTotal;
    stand = false;
}


function checkWin() {

}

function playerStand() {
    stand = true;
    dealerDraw();
}