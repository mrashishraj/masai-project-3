var arrayResp = []

window.onload = function () {
    var stationCheckBtn = document.getElementById("staBtn");
    stationCheckBtn.addEventListener("click", handleStationClick);
}

function handleStationClick() {
    event.preventDefault();
    var station = document.getElementById("stationCode").value;
    var within = document.getElementById("within").value;

    var data = {
        station: station,
        within: within
    }
    arrayData = [];
    arrayData.push(data);
    sendToAPI(data);
}

function sendToAPI(data) {
    var station = data.station;
    var hours = data.within;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://indianrailapi.com/api/v2/LiveStation/apikey/120ab7da7efa47b8a43b1d9341bb41d7/StationCode/' + station + '/hours/' + hours + '/');
    xhr.send();
    xhr.onload = function () {
        var response = JSON.parse(this.response);
        handleResponse(response);
        console.log(response);
    }
}

function handleResponse(response) {
    arrayResp.push(response);
    renderDOM(response);
}

function renderDOM(resp) {
    var trains = resp.Trains;
    var noOfTrain = resp.Message
    var noTrain = document.getElementById("noOfTrain")
    noTrain.textContent = noOfTrain
    noTrain.style.color = "blue"

    var tbody = document.getElementById("tbody");
    tbody.textContent = " ";
    for (var i = 0; i < trains.length; i++) {
        var trainList = createTR(trains[i])
        tbody.appendChild(trainList)
    }

    console.log(trains)
}

function createTR(trains) {
    var tNum = trains.Number;
    var tName = trains.Name;
    var sArri = trains.ScheduleArrival;
    var sDep = trains.ScheduleDeparture;
    var eArri = trains.ExpectedArrival;
    var eDep = trains.ExpectedDeparture;
    var pf = trains.Platform;
    var delay = trains.Delay;
    if (pf == "") {
        pf = "Not Decided"
    }

    var tr = document.createElement('tr');

    var tNumElem = document.createElement('td');
    tNumElem.textContent = tNum;
    var tNameElem = document.createElement('td');
    tNameElem.textContent = tName;
    var sArriElem = document.createElement('td')
    sArriElem.textContent = sArri + "-" + eArri;
    var sDepElem = document.createElement('td')
    sDepElem.textContent = sDep + "-" + eDep;
    var pfElem = document.createElement('td')
    pfElem.textContent = pf;
    var delayElem = document.createElement('td')
    delayElem.textContent = delay;

    tr.append(tNumElem, tNameElem, sArriElem, sDepElem, delayElem, pfElem);
    return tr
}

function handleStaClick() {
    event.preventDefault()
    var station = document.getElementById("stFrom").value;
    console.log(station)
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://indianrailapi.com/api/v2/AutoCompleteStation/apikey/120ab7da7efa47b8a43b1d9341bb41d7/StationCodeOrName/' + station)
    xhr.send();
    xhr.onload = function () {
        var response = JSON.parse(this.response)
        handleStationResponse(response)
        console.log(response)
    }
}

function handleStationResponse(data) {
    var staData = data.Station[0];
    var res = document.getElementById("staInfo");
    var div = document.createElement('div');
    div.style.border = "1px solid black";
    div.style.marginLeft = "35%";
    div.style.width = "200px";

    var nameHnElem = document.createElement('p');
    nameHnElem.textContent = "Station Name :- " + staData.NameHn + '\n' + staData.NameEn;
    var stCodeElem = document.createElement('p');
    stCodeElem.style.color = "blue"
    stCodeElem.textContent = "Station Code :- " + staData.StationCode

    div.append(nameHnElem, stCodeElem)
    res.append(div)

    console.log(staData.NameHn)
}