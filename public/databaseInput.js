/**
 * Name
 * Location [US for now] **dropdown**
 * Sponsoring Org
 * Deadline to Apply **Calendar thing**
 * Date **Calendar thing**
 * 
 */

var organizationName;
var sponsorName;
var startDate;
var endDate;
var website;

    function addValue(){
        organizationName = document.getElementById("orgInput").value;
        sponsorName = document.getElementById("sponsorInput").value;
        appDate = document.getElementById("appInput").value;
        startDate = document.getElementById("startInput").value;
        endDate = document.getElementById("endInput").value;
        website = document.getElementById("websiteInput").value;

        var data = {organizationName, sponsorName, appDate, startDate, endDate, website };
        fetch('/pages/input', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
        .then(function(response) {
            if(response.ok){
                console.log("Click recorded");
                return;
            }
            throw new Error('Request Failed');
        }).catch(function(err){
            console.log(err);
        });
    }

    function updateList(){
        var query = document.getElementById('searchInput').value;
        
        var data = { query };
        console.log(data);

        //get the input from the search box
        fetch('/pages/search', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
        .then(function(response) {
            if(response.ok){
                return;
            }
            throw new Error('Request Failed');
        }).catch(function(err){
            console.log(err);
        });
        
        //Print everything to the web page
        var bodyString = "";
        fetch('/pages/search', {method: 'GET', headers: {'Content-Type': 'application/json'}})
        .then(function(response) {
        if(response.ok) return response.json();
        throw new Error('Request failed.');
        })
        .then(function(data) {
            //for every element in the array
            for(var i = 0; i < data.length; i++){
                var curData = data[i];
                bodyString += `<button class="w3-button"> Organization Name: ${curData.organizationName} : Sponsor: ${curData.sponsorName} | Application Deadline: ${curData.appDate} | Start Date: ${curData.startDate} End Date: ${curData.endDate} </button>`;
            }
            console.log(bodyString);
            document.getElementById('counter').innerHTML = bodyString;
        })
        .catch(function(error) {
        console.log(error);
        });
    }
        
    function random(){
        var query = document.getElementById('searchInput').value;
        
        var data = { query };
        console.log(data);

        
        //Print everything to the web page
        var bodyString = "";
        fetch('/pages/search', {method: 'GET', headers: {'Content-Type': 'application/json'}})
        .then(function(response) {
        if(response.ok) return response.json();
        throw new Error('Request failed.');
        })
        .then(function(data) {
            //for every element in the array
            var i = Math.round(Math.random() * data.length())
            var curData = data[i];
            bodyString += `<button class="w3-button"> Organization Name: ${curData.organizationName} : Sponsor: ${curData.sponsorName} | Application Deadline: ${curData.appDate} | Start Date: ${curData.startDate} End Date: ${curData.endDate} </button>`;
            
            console.log(bodyString);
            document.getElementById('counter').innerHTML = bodyString;
        })
        .catch(function(error) {
        console.log(error);
        });
    }



