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
    for(var i = 0; i<forecast1;i++){
        forecast.children[0].remove();
    }
}
function addSearchButton(city,container){
    var searchButton=document.createElement("button");
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
function getDate(timestamp){
    var time=timestamp *1000;
    var object = new Date(time);
    var dateConvert = object.toLocaleString("en-US",{timeZoneName:"short"});
    var dateUs=dateConvert.split(",");
    return dateUs[0];
}
function setStyle(uvi,container){
    if(uvi>=0.0 && uvi <3.0){
    container.style.backgroundColor ="green";
    container.style.color="white";
    return;
} else if (uvi>=3.0 && uvi <6.0){
    container.style.backgroundColor = "yellow";
    container.style.color = "black";
    return;

}else if (uvi>=6.0 && uvi <8.0){
    container.style.backgroundColor = "orange";
    container.style.color = "black";
    return;
}else if (uvi>=8.0 && uvi <11.0){
    container.style.backgroundColor = "red";
    container.style.color = "white";
    return;
}else{
    container.style.backgroundColor="purple";
    container.style.color = "white";
}
}
function addHTML(info,place,image,alt){
    if(image){
        var cityTitle = document.createElement("div");
        var cityDate = document.createElement("p");
        var cityImage =document.createElement("img");
        cityTitle.classList.add("container","weather-image");
        cityDate.textContent = info;
        cityImage.setAttribute("src","https://openweathermap.org/img/wn/"+image+"@2x.png");
        cityImage.setAttribute("alt",alt);
        cityTitle.appendChild(cityDate);
        cityTitle.appendChild(cityImage);
        place.appendChild(cityTitle);
        return;
    }else if (info.includes("BC")){
        var BCContainer = document.createElement("div");
        var BCText =document.createElement("p");
        var indexContainer =document.createElement("div");
        var index =document.createElement("p");
        BCContainer.classList.add("container");
        BCText.textContent = info.split(":")[0]+": ";
        index.textContent = info.split(":")[1];
        indexContainer.appendChild(index);
        setStyle(index.textContent,indexContainer);
        indexContainer.classList.add("UV-Index");
        BCContainer.appendChild(BCText);
        BCContainer.appendChild(indexContainer);
        place.appendChild(BCContainer);
        return;
    }
    var element1 = document.createElement("p");
    element1.textContent = info;
    place.appendChild(element1);
}
function forecastCard(date,image,temp,wind,hum,alt){
    var card1 =document.createElement("div");
    var body=document.createElement("div");
    var cardTitle=document.createElement("h4");
    var titleImage=document.createElement("img");
    var cardTemp =document.createElement("p");
    var windEl=document.createElement("p");
    var humEl=document.createElement("p");
    card1.classList.add("card","text-white","bg-primary","mb-3");
    body.classList.add("card-body");
    cardTitle.classList.add("card-title");
    cardTitle.textContent=date;
    body.appendChild(cardTitle);
    titleImage.setAttribute("src","https://openweathermap.org/img/wn/"+image+"@2x.png");
    titleImage.setAttribute("alt",alt);
    body.appendChild(titleImage);
    cardTemp.textContent=temp;
    body.appendChild(cardTemp);
    windEl.textContent=wind;
    body.appendChild(windEl);
    humEl.textContent=hum;
    body.appendChild(humEl)
    card1.appendChild(cardTitle);
    card1.appendChild(body);
    forecast.appendChild(card1);
}
function API(){
    eraseCities();
    fetch("https://api.openweathermap.org/geo/1.0/direct?q="+city.value+"&limit=1&appid=e1739b9a89959eb08d85a9a92023d8d4",{})
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        var coordinates={
            lat:data[0].lat,
            lon:data[0].lon
        }
        storeSearch(data[0].name,previousResult);
        return coordinates;
    })
    .then(function(getWeather){
        return fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+getWeather.lat+"&lon="+getWeather.lon+"&units=Imperial&appid=e1739b9a89959eb08d85a9a92023d8d4",{})
    })
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
        for(var i =1;i<6;i++){
            var ApiDate = getDate(data.daily[i].dt);
            var iconImg=data.daily[i].weather[0].icon;
            var tempResponse="Temp:"+data.daily[i].temp.day+"\xB0F";
            var windResponse="Wind Speed"+data.daily[i].wind_speed+"MPH";
            var humidityResponse="Humidty"+data.daily[i].humidity+"%";
            var textResponse=data.daily[i].weather[0].description;
            forecastCard(ApiDate,iconImg,tempResponse,windResponse,humidityResponse,textResponse);
        }
        addHTML(city.value+" "+getDate(data.current.dt),weatherApi,data.current.weather[0].icon,data.current.weather[0].description);
        addHTML("Temp"+data.current.temp+"\xB0F",weatherApi);
        addHTML("Wind Speed"+data.current.wind_speed+"MPH",weatherApi);
        addHTML("Humidity"+data.current.humidity+"%",weatherApi);
        addHTML("UV Index"+data.current.uvi,weatherApi);
        weatherContainer();
    })
}
city.addEventListener("keypress",function(event){
    if(event.key ==="Enter"){
        event.preventDefault();
        searchButton.click();
    }
})
previousResult.onclick=function(event){
    var button = event.target;
    if(button.classList.contains("previous")){
        city.value=button.textContent;
        city.setAttribute("placeholder",button.textContent);
        API();
    }
}
if(localStorage1()){
    searchResult(previousResult);
}
searchButton.addEventListener("click",API);
