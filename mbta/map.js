var map_canvas;

		var infowindow = new google.maps.InfoWindow();

		var map;
	
        // Start at South Station
        var myLat = 42.352271;
        var myLng = -71.05524200000001;
        var current_position = new google.maps.LatLng(myLat, myLng);

        var myOptions = {
			zoom: 13, // The larger the zoom number, the bigger the zoom
			center: current_position,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		//polyline

        

        // init function will make array of markers for each T-stop, sets the position of those
        // markers and calls functiton to add the schedule information
        function init()
        {

        	var stops = [
        	{position : new google.maps.LatLng(42.352271, -71.05524200000001), stop_id : "place-sstat", stop_name : "South Station"},
        	{position : new google.maps.LatLng(42.330154, -71.057655), stop_id : "place-andrw", stop_name : "Andrew"},
        	{position : new google.maps.LatLng(42.3884, -71.11914899999999), stop_id : "place-portr", stop_name : "Porter Square"},
        	{position : new google.maps.LatLng(42.373362, -71.118956), stop_id : "place-harsq", stop_name : "Harvard Square"},
        	{position : new google.maps.LatLng(42.320685, -71.052391), stop_id : "place-jfk", stop_name : "JFK/UMASS"},
        	{position : new google.maps.LatLng(42.31129, -71.053331), stop_id : "place-shmnl", stop_name : "Savin Hill"},
        	{position : new google.maps.LatLng(42.35639457, -71.0624242), stop_id : "place-pktrm", stop_name : "Park Street"},
        	{position : new google.maps.LatLng(42.342622, -71.056967), stop_id : "place-brdwy", stop_name : "Broadway"},
        	{position : new google.maps.LatLng(42.275275, -71.029583), stop_id : "place-nqncy", stop_name : "North Quincy"},
        	{position : new google.maps.LatLng(42.29312583, -71.06573796000001), stop_id : "place-smmnl", stop_name : "Shawmut"},
        	{position : new google.maps.LatLng(42.39674, -71.121815), stop_id : "place-davis", stop_name : "Davis"},
        	{position : new google.maps.LatLng(42.395428, -71.142483), stop_id : "place-alfcl", stop_name : "Alewife"},
        	{position : new google.maps.LatLng(42.36249079, -71.08617653), stop_id : "place-knncl", stop_name : "Kendall/MIT"},
        	{position : new google.maps.LatLng(42.361166, -71.070628), stop_id : "place-chmnl", stop_name : "Charles/MGH"},
        	{position : new google.maps.LatLng(42.355518, -71.060225), stop_id : "place-dwnxg", stop_name : "Downtown Crossing"},
        	{position : new google.maps.LatLng(42.251809, -71.005409), stop_id : "place-qnctr", stop_name : "Quincy Center"},
        	{position : new google.maps.LatLng(42.233391, -71.007153), stop_id : "place-qamnl", stop_name : "Quincy Adams"},
        	{position : new google.maps.LatLng(42.284652,  -71.06448899999999), stop_id : "place-asmnl", stop_name : "Ashmont"},
        	{position : new google.maps.LatLng(42.2665139, -71.0203369), stop_id : "place-wlsta", stop_name : "Wollaston"},
        	{position : new google.maps.LatLng(42.300093, -71.061667), stop_id : "place-fldcr", stop_name : "Fields Corner"},
        	{position : new google.maps.LatLng(42.365486, -71.103802), stop_id : "place-cntsq", stop_name : "Central Square"},
        	{position : new google.maps.LatLng(42.2078543, -71.0011385), stop_id : "place-brntn", stop_name : "Braintree"}
        ];
        	console.log("inside init");
        	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        	getMyLocation();
	        markers = [];
	        for (i = 0; i < stops.length;i++) {
	          markers[i] = {marker: new google.maps.Marker({position: stops[i].position, title: stops[i].stop_name}), 
	          				stop_id : stops[i].stop_id};
	          current_stop_id = stops[i].stop_id;
	          current_title = markers[i].marker.title;
	          current_marker = markers[i].marker;
	          google.maps.event.addListener(markers[i].marker, 'click', function(i, current_stop_id, current_marker, current_title) {
	          	console.log("inside event listener");
	          	console.log(current_stop_id);
	          	console.log(current_marker);
	          	console.log(current_title);
	          	infowindow.setContent(current_title);
				infowindow.open(map, current_marker);
	            //getSchedule(i, current_stop_id);
	          });
	          markers[i].marker.setMap(map);
	    	}

	    }

      	function getMyLocation() {
      		console.log("inside get location");
				if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
					navigator.geolocation.getCurrentPosition(function(position) {
						myLat = position.coords.latitude;
						myLng = position.coords.longitude;
						renderMap();
					});
				}
				else {
					alert("Sorry, geolocation is not supported by your web browser.");
				}
		}

      	function renderMap() {
      		console.log("trying to render");
				me = new google.maps.LatLng(myLat, myLng);

				map.panTo(me);

				marker = new google.maps.Marker({
					position: me,
					title: "Here I Am!"
				});
				marker.setMap(map);
					
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.setContent(marker.title);
					infowindow.open(map, marker);
				});
			}



      	// use API and stop id of the T-station to get the schedule information
	    function getSchedule(stop_index, stop_id) {
	    	console.log("inside get sched");
	    	var request = new XMLHttpRequest();
			request.open("GET", "https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id=" + stop_id, true);
		
			request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200) {
					console.log("Got the data back!");
					data = request.responseText;
					console.log(data);
					//parse JSON to get content
					infowindow.setContent(content);
	                infowindow.open(map, markers[stop_index]);

				}
				else if (request.readyState == 4 && request.status != 200) {
					document.getElementById("location").innerHTML = "<p>Whoops, something went terribly wrongo</p>";
				}
				else {
					console.log("In progress...");
				}

				request.send(null);
			}
      }
