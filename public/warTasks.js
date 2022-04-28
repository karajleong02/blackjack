
var playerCard = "0";
var dealerCard = "0";
var wins = 0;
var deck;
let deckID = "wx7rcacs4dsd";



// add event listener for button
window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    newGame();
    // document.getElementById("player_score").innerHTML = "You: " + playerCard;
    //document.getElementById("dealer_score").innerHTML = "Computer: " + dealerCard;

    const drawBtn = document.getElementById("draw_button");
    drawBtn.addEventListener("click", getCards);

    const restartBtn = document.getElementById("restart_button");
    restartBtn.addEventListener("click", restartGame);
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


function getCard() { //for person 0 is player, 1 is dealer
    let xhr = new XMLHttpRequest;
    xhr.addEventListener ("load", function() {
        card1 = JSON.stringify(xhr.response.cards[0].value).split("\"")[1];
        card2 = JSON.stringify(xhr.response.cards[1].value).split("\"")[1];
        img1 = JSON.stringify(xhr.response.cards[0].image);
        img2 = JSON.stringify(xhr.response.cards[1].image);
       
        playerCard = card1;
        document.getElementById("p1").src = img1.split("\"")[1]; 
        document.getElementById("p1").style.display = "initial";
        document.getElementById("player_score").innerHTML = "Your Card: " + playerCard;
    
        dealerCard = card2;
        document.getElementById("c1" ).src = img2.split("\"")[1];
        document.getElementById("c1").style.display = "initial";
        document.getElementById("computer_score").innerHTML = "Computer's Card: " + dealerCard;

        checkWin();
        
    })
    xhr.responseType = "json";
    xhr.open("GET", "https://deckofcardsapi.com/api/deck/" + deckID + "/draw/?count=2");
    xhr.send();
    
    
}

function getCards() {
    console.log("draw cards");
    getCard();
}

function restartGame() {
    playerCard = "0";
    dealerCard = "0";
    wins = 0;
    document.getElementById("p1").src = " "; 
    document.getElementById("p1").style.display = "none";
    document.getElementById("c1").src = " "; 
    document.getElementById("c1").style.display = "none";
    document.getElementById("numWins").innerHTML = "Current Win Streak: 0";
    document.getElementById("player_score").innerHTML = "Your Card: " + playerCard;
    document.getElementById("computer_score").innerHTML = "Computer's Card: " + dealerCard;
}

function checkWin() {
   let pc = sortVal(playerCard);
   let dc = sortVal(dealerCard);
   console.log(dc + " " + pc);
   if (pc > dc) {
       console.log("win");
       wins++;
       sendWinStreak();
   } else if (pc < dc) {
       console.log("lose");
       wins = 0;
   }
   document.getElementById("numWins").innerHTML = "Current Win Streak: " + wins;
}

function sortVal(card) {
    if (card === "ACE") {
        return 14;
    } else if (card === "KING") {
        return 13;
    } else if (card === "QUEEN") {
        return 12;
    } else if (card === "JACK") {
        return 11;
    } else {
        return parseInt(card);
    }
}

function sendWinStreak() {
    console.log("got to send win here streak");
    let xhr = new XMLHttpRequest
    xhr.addEventListener("load", responseHandler)
    query=`warstreak=${wins}`
    // when submitting a GET request, the query string is appended to URL
    // but in a POST request, do not attach the query string to the url
    // instead pass it as a parameter in xhr.send()
    url = `/sendWinStreak`
    xhr.responseType = "json";   
    xhr.open("POST", url)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    // notice the query string is passed as a parameter in xhr.send()
    // this is to prevent the data from being easily sniffed
    xhr.send(query);
    console.log("finished send win");
}
function responseHandler(){
    if (this.response.success){    
        console.log("worked");
    }else{
        console.log(this.response.success);
    }
}