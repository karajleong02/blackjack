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
    drawBtn.addEventListener("click", playerDraw);

    const restartBtn = document.getElementById("restart_button");
    restartBtn.addEventListener("click", restartGame);

    const standBtn = document.getElementById("stand_button");
    standBtn.addEventListener("click", dealerDraw);
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


function getCard(ind, isPlayer) { //for person 0 is player, 1 is dealer
    
    let xhr = new XMLHttpRequest;
    xhr.addEventListener ("load", function() {
        card = JSON.stringify(xhr.response.cards[0].value);
        card = card.split("\"")[1];
        if(!isNaN(parseInt(card))){
            if (isPlayer == 0) {
                playerCards[ind] = parseInt(card);
                playerTotal += playerCards[ind];
                document.getElementById("player_score").innerHTML = "Your Total: " + playerTotal;
                 //document.getElementById("p" + pInd).src = ""; //USE API TO GET THE PICTURE, DOES THE CONCATENATION WORK
            } else {
                console.log("hello");
                dealerCards[ind] = parseInt(card);
                dealerTotal += dealerCards[ind];
                document.getElementById("dealer_score").innerHTML = "Dealer Total: " + dealerTotal;
                document.getElementById("d" + dInd).src = "";
            }
        }   
    })
    xhr.responseType = "json";
    xhr.open("GET", "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=1");
    xhr.send();
    
}

function playerDraw() {
    
    let pInd = playerCards.length;
    if (playerCards.length < 7 && playerTotal < 21) {
        getCard(pInd, 0);
        
       
    } else if (playerTotal > 21) {
        checkWin();
    } else {
        dealerDraw();
    }
    
}

function dealerDraw() {
    //USE SOME SORT OF TIMER
    console.log("gets here");
    while(dealerTotal < 17 && dealerCards.length < 7) {
        
        let dInd = dealerCards.length;
        // dealerCards[dInd] = 1;
        // dealerTotal += dealerCards[dInd];
        getCard(dInd, 1);
        
        
    }
    checkWin();
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