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
function searchResult(container1){
    var currentStorage=JSON.parse(localStorage.getItem("recentSearch"));
    for(var i=0;i<currentStorage.length;i++){
        addSearchButton(currentStorage[i],container1);
    }
}
function storeSearch(nameCity,resultContainer){
    var tempArray = [];
    if(localStorage1()){
        var currentStorage=JSON.parse(localStorage.getItem("recentSearch"));
        if(currentStorage.includes(nameCity)){
            searchResult(resultContainer);
            return;
        }
        for(var i=0;i<currentStorage.length;i++){
            tempArray.push(currentStorage[i]);
        }
        tempArray.push(nameCity);
        if(tempArray.length>5){
            tempArray.shift();
        }
        localStorage.setItem("recentSearch",JSON.stringify(tempArray));
        searchResult(resultContainer);
        return;
    }
    tempArray.push(nameCity);
    addSearchButton(tempArray[0],resultContainer);
    localStorage.setItem("recentSearch",JSON.stringify(tempArray));
}