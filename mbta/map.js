// var map;

// 		var infowindow = new google.maps.InfoWindow();

// 		var map;
	
//         // Start at South Station
//         var startLat = 42.352271;
//         var startLng = -71.05524200000001;
//         var current_position = new google.maps.LatLng(startLat, startLng);

//         var myOptions = {
// 			zoom: 13, // The larger the zoom number, the bigger the zoom
// 			center: current_position,
// 			mapTypeId: google.maps.MapTypeId.ROADMAP
// 		};
        

//         var stops = [
//         	{position : new google.maps.LatLng(42.352271, -71.05524200000001), stop_id : "place-sstat", name : "South Station"},
//         	{position : new google.maps.LatLng(42.330154, -71.057655), stop_id : "place-andrw", name : "Andrew"},
//         	{position : new google.maps.LatLng(42.3884, -71.11914899999999), stop_id : "place-portr", name : "Porter Square"},
//         	{position : new google.maps.LatLng(42.373362, -71.118956), stop_id : "place-harsq", name : "Harvard Square"},
//         	{position : new google.maps.LatLng(42.320685, -71.052391), stop_id : "place-jfk", name : "JFK/UMASS"},
//         	{position : new google.maps.LatLng(42.31129, -71.053331), stop_id : "place-shmnl", name : "Savin Hill"},
//         	{position : new google.maps.LatLng(42.35639457, -71.0624242), stop_id : "place-pktrm", name : "Park Street"},
//         	{position : new google.maps.LatLng(42.342622, -71.056967), stop_id : "place-brdwy", name : "Broadway"},
//         	{position : new google.maps.LatLng(42.275275, -71.029583), stop_id : "place-nqncy", name : "North Quincy"},
//         	{position : new google.maps.LatLng(42.29312583, -71.06573796000001), stop_id : "place-smmnl", name : "Shawmut"},
//         	{position : new google.maps.LatLng(42.39674, -71.121815), stop_id : "place-davis", name : "Davis"},
//         	{position : new google.maps.LatLng(42.395428, -71.142483), stop_id : "place-alfcl", name : "Alewife"},
//         	{position : new google.maps.LatLng(42.36249079, -71.08617653), stop_id : "place-knncl", name : "Kendall/MIT"},
//         	{position : new google.maps.LatLng(42.361166, -71.070628), stop_id : "place-chmnl", name : "Charles/MGH"},
//         	{position : new google.maps.LatLng(42.355518, -71.060225), stop_id : "place-dwnxg", name : "Downtown Crossing"},
//         	{position : new google.maps.LatLng(42.251809, -71.005409), stop_id : "place-qnctr", name : "Quincy Center"},
//         	{position : new google.maps.LatLng(42.233391, -71.007153), stop_id : "place-qamnl", name : "Quincy Adams"},
//         	{position : new google.maps.LatLng(42.284652,  -71.06448899999999), stop_id : "place-asmnl", name : "Ashmont"},
//         	{position : new google.maps.LatLng(42.2665139, -71.0203369), stop_id : "place-wlsta", name : "Wollaston"},
//         	{position : new google.maps.LatLng(42.300093, -71.061667), stop_id : "place-fldcr", name : "Fields Corner"},
//         	{positoin : new google.maps.LatLng(42.365486, -71.103802), stop_id : "place-cntsq", name : "Central Square"},
//         	{position : new google.maps.LatLng(42.2078543, -71.0011385), stop_id : "place-brntn", name : "Braintree"}
//         ]

//         // init function will make array of markers for each T-stop, sets the position of those
//         // markers and calls functiton to add the schedule information
//         function init()
//         {
//         	map = new google.maps.Map(document.getElementById("map"), myOptions)
// 	        markers = [];
// 	        //for (i = 0; i < stops.length;i++) {
// 	        for (i = 0; i < 1; i++)
// 	          markers[i] = new google.maps.Marker({
// 	            position: stops[i].position,
// 	            title: stops[i].name
// 	          });
// 	          google.maps.event.addListener(markers[i], 'click', function() {
// 	              //getSchedule(i, markers[i].stop_id);
// 	          });
// 	          markers[i].setMap(map);
// 	          getMyLocation();
// 	    }
	        

//       	function getMyLocation() {
// 				if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
// 					navigator.geolocation.getCurrentPosition(function(position) {
// 						myLat = position.coords.latitude;
// 						myLng = position.coords.longitude;
// 						renderMap();
// 					});
// 				}
// 				else {
// 					alert("Geolocation is not supported by your web browser.  What a shame!");
// 				}
// 			}

//       	function renderMap() {
// 				me = new google.maps.LatLng(myLat, myLng);
// 				// Update map and go there...
// 				map.panTo(me);
				
// 				// Create a marker
// 				marker = new google.maps.Marker({
// 					position: me,
// 					title: "Here I Am!"
// 				});
// 				marker.setMap(map);
					
// 				// Open info window on click of marker
// 				google.maps.event.addListener(marker, 'click', function() {
// 					infowindow.setContent(marker.title);
// 					infowindow.open(map, marker);
// 				});
// 			}



//       	// use API and stop id of the T-station to get the schedule information
// 	    function getSchedule(stop_index, stop_id) {
// 	    	var request = new XMLHttpRequest();
// 			request.open("GET", "https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id=" + stop_id, true);
		
// 			request.onreadystatechange = function() {
// 				if (request.readyState == 4 && request.status == 200) {
// 					console.log("Got the data back!");
// 					data = request.responseText;
// 					console.log(data);
// 					//parse JSON to get content
// 					infowindow.setContent(content);
// 	                infowindow.open(map, markers[stop_index]);

// 				}
// 				else if (request.readyState == 4 && request.status != 200) {
// 					document.getElementById("location").innerHTML = "<p>Whoops, something went terribly wrongo</p>";
// 				}
// 				else {
// 					console.log("In progress...");
// 				}

// 				request.send(null);
// 			}
//       }
