var previousResult=document.querySelector("#previousContainer");
var bottomCont=document.querySelector("#bottom-container");
var weatherResult=document.querySelector("#searchContainer");
var weatherApi=document.querySelector("#weatherSection");
var forecast=document.querySelector("#forecast");
var searchButton=document.querySelector(".btn");
var city=document.querySelector("#city");
function localStorage1(){
    if(localStorage.getItem("recentSearch")!==null){
        return true;

    }else{
        return false;
    }
}
function weatherContainer(){
    bottomCont.classList.remove("hidden");
}
function eraseCities(){
    var numSearch = previousResult.children.length;
    for(var i = 0;i<numSearch; i++){
        previousResult.children[0].remove();
    }
    var weather = weatherApi.children.length;
    for(var i =0;i<weather;i++){
        weatherApi.children[0].remove();
    }
    var forecast1 = forecast.children.length;
    for(var i = 0; i<forecast;i++){
        forecast.children[0].remove();
    }
}
function addSearchButton(city,container){
    var seachButton=document.createElement("button");
    searchButton.textContent=city;
    searchButton.classList.add("previous","btn");
    container.appendChild(searchButton);
}