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
    } else {
        checkWin();
        dealerDraw();
    }
    
}

function dealerDraw() {
    //USE SOME SORT OF TIMER
    checkWin();
    for(i = 0; i < 7; i++) {
        getCard(i, 1);
    }
    checkWin();
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
    if (playerTotal <21) {
        console.log("");
    } else {
        if(playerTotal > 21) {
            if (dealerTotal > 21) {
                document.getElementById("winStatus").innerHTML = "Tie";
            } else {
                document.getElementById("winStatus").innerHTML = "You Lose!";
            }
        } else if (dealerTotal > 21 || playerTotal > dealerTotal){
            document.getElementById("winStatus").innerHTML = "You Win!";
        }
    }
}

function playerStand() {
    stand = true;
    dealerDraw();
}