'use strict';


// start navigation when #startNavigation button is clicked
document.getElementById("startNavigation").onclick = function(element) {
	// query the current tab to find its id
	let thistab;
	chrome.tabs.query({ active: true, currentWindow: true }, function(tab){
		thistab = tab[0];
		console.log(thistab);
		chrome.scripting.executeScript({
			target: { tabId: thistab.id },
			function: getDataFromLinkedin,
		});
	});


};

function getDataFromLinkedin() {

	//this function is used to save the data as a JSON file
	(function(console){

	console.save = function(data, filename){

	    if(!data) {
	        console.error('Console.save: No data')
	        return;
	    }

	    if(!filename) filename = 'console.json'

	    if(typeof data === "object"){
	        data = JSON.stringify(data, undefined, 4)
	    }

	    var blob = new Blob([data], {type: 'text/json'}),
	        e    = document.createEvent('MouseEvents'),
	        a    = document.createElement('a')

	    a.download = filename
	    a.href = window.URL.createObjectURL(blob)
	    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
	    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
	    a.dispatchEvent(e)
	 }
	})(console)


  var profileDetails = [{},{}];
	var profiles = [];
	var company_name = [];

	profiles = document.querySelectorAll("div.entity-result__content");
	company_name = document.querySelectorAll(".entity-result__summary");
	for(let i=0;i<profiles.length;i++){

		profileDetails[0]['FirstName'] = profiles[i].innerText.split("\n")[0].split(" ")[0];
	  profileDetails[0]['LastName'] = profiles[i].innerText.split("\n")[0].split(" ")[1];
		profileDetails[0]['CompanyNameAndProfile'] = company_name[i].innerText;
	  console.log(profileDetails);
		console.save(profileDetails, profileDetails[0]["FirstName"] + " " + profileDetails[0]["LastName"] + ".json");
	}

}
