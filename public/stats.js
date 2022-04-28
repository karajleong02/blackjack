// let xhr = new XMLHttpRequest
// xhr.addEventListener("load", responseHandler)
// xhr.open("GET", "/stats.html");
window.addEventListener("load", function() {
    console.log("listener is called");
    let xhr = new XMLHttpRequest;
    xhr.addEventListener("load", responseHandler);
    xhr.open("GET", "stats");
    xhr.send();
});

function responseHandler(){
    const obj = JSON.parse(this.response);
    console.log(obj); 
    console.log(obj.bjwin);
    document.getElementById("username").innerHTML = obj.username;
    document.getElementById("wins").innerHTML = obj.bjwin;
    document.getElementById("losses").innerHTML = obj.bjlose;
    document.getElementById("total").innerHTML = obj.bjtotals;
    document.getElementById("winstreak").innerHTML = obj.warstreak;
    // var parser = new DOMParser();
    // var xml = parser.parseFromString(this.response, )
}




