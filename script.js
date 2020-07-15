var arrayResp = []

window.onload = function () {
    var form = document.querySelector("form");
    form.addEventListener("submit", handleSubmit);
}

function handleSubmit() {
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
    var aArri = trains.ExpectedArrival;



    var tr = document.createElement('tr');

    var tNumElem = document.createElement('td');
    tNumElem.textContent = tNum;
    var tNameElem = document.createElement('td');
    tNameElem.textContent = tName;
    var sArriElem = document.createElement('td')
    sArriElem.textContent = sArri;
    var sDepElem = document.createElement('td')
    sDepElem.textContent = sDep;
    var aArriElem = document.createElement('td')
    sDepElem.textContent = aArri;

    tr.append(tNumElem, tNameElem, sArriElem, sDepElem, aArriElem);
    return tr
}