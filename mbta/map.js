var map_canvas;

		var infowindow = new google.maps.InfoWindow({
			maxWidth: 200
		});

		var map;
	
        // Start at South Station
        myLat = 42.352271;
        myLng = -71.05524200000001;
        current_position = new google.maps.LatLng(myLat, myLng);

        var myOptions = {
			zoom: 13,
			center: current_position,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var pathCoords = [];
		var pathCoords_size = 0;

		var forkCoords = [];
		var forkCoords_size = 0;

		var stops = [
			{position : new google.maps.LatLng(42.395428, -71.142483), stop_id : "place-alfcl", stop_name : "Alewife"},
			{position : new google.maps.LatLng(42.39674, -71.121815), stop_id : "place-davis", stop_name : "Davis"},
			{position : new google.maps.LatLng(42.3884, -71.11914899999999), stop_id : "place-portr", stop_name : "Porter Square"},
			{position : new google.maps.LatLng(42.373362, -71.118956), stop_id : "place-harsq", stop_name : "Harvard Square"},
			{position : new google.maps.LatLng(42.365486, -71.103802), stop_id : "place-cntsq", stop_name : "Central Square"},
			{position : new google.maps.LatLng(42.36249079, -71.08617653), stop_id : "place-knncl", stop_name : "Kendall/MIT"},
			{position : new google.maps.LatLng(42.361166, -71.070628), stop_id : "place-chmnl", stop_name : "Charles/MGH"},
			{position : new google.maps.LatLng(42.35639457, -71.0624242), stop_id : "place-pktrm", stop_name : "Park Street"},
			{position : new google.maps.LatLng(42.355518, -71.060225), stop_id : "place-dwnxg", stop_name : "Downtown Crossing"},
			{position : new google.maps.LatLng(42.352271, -71.05524200000001), stop_id : "place-sstat", stop_name : "South Station"},
        	{position : new google.maps.LatLng(42.342622, -71.056967), stop_id : "place-brdwy", stop_name : "Broadway"},
			{position : new google.maps.LatLng(42.330154, -71.057655), stop_id : "place-andrw", stop_name : "Andrew"},
			{position : new google.maps.LatLng(42.320685, -71.052391), stop_id : "place-jfk", stop_name : "JFK/UMASS"},
			{position : new google.maps.LatLng(42.31129, -71.053331), stop_id : "place-shmnl", stop_name : "Savin Hill"},
        	{position : new google.maps.LatLng(42.300093, -71.061667), stop_id : "place-fldcr", stop_name : "Fields Corner"},
        	{position : new google.maps.LatLng(42.29312583, -71.06573796000001), stop_id : "place-smmnl", stop_name : "Shawmut"},
        	{position : new google.maps.LatLng(42.284652,  -71.06448899999999), stop_id : "place-asmnl", stop_name : "Ashmont"},
        	{position : new google.maps.LatLng(42.275275, -71.029583), stop_id : "place-nqncy", stop_name : "North Quincy"},
        	{position : new google.maps.LatLng(42.2665139, -71.0203369), stop_id : "place-wlsta", stop_name : "Wollaston"},
        	{position : new google.maps.LatLng(42.251809, -71.005409), stop_id : "place-qnctr", stop_name : "Quincy Center"},
        	{position : new google.maps.LatLng(42.233391, -71.007153), stop_id : "place-qamnl", stop_name : "Quincy Adams"},
        	{position : new google.maps.LatLng(42.2078543, -71.0011385), stop_id : "place-brntn", stop_name : "Braintree"}
        ];
        			        
        // init function will make array of markers for each T-stop, sets the position of those
        // markers and calls functiton to add the schedule information
        function init()
        {
        	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        	getMyLocation();
	        markers = [];
	        for (i = 0; i < stops.length;i++) {
	          markers[i] = {marker: new google.maps.Marker({position: stops[i].position, title: stops[i].stop_name, icon: "icon.PNG"}), 
	          				stop_id : stops[i].stop_id};
	          current_stop_id = stops[i].stop_id;
	          current_title = markers[i].marker.title;
	          current_marker = markers[i].marker;
	          google.maps.event.addListener(markers[i].marker, 'click', (function(i, current_stop_id, current_marker, current_title) {
	          	return function() {
		            getSchedule(i, current_stop_id);
	          	}
	          })(i, current_stop_id, current_marker, current_title));
	          markers[i].marker.setMap(map);
	    	}
	    	makePath(markers);
	    }

      	function getMyLocation() {
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
				me = new google.maps.LatLng(myLat, myLng);

				map.panTo(me);

				closest_stop_index = closestStop(markers)

				marker = new google.maps.Marker({
					position: me,
					title: "<p class=station_name> You are here </p> <p> Closest T-stop is " 
							+ markers[closest_stop_index].marker.title + " which is " +
							(google.maps.geometry.spherical.computeDistanceBetween(me,markers[closest_stop_index].marker.position)*0.000621371192).toFixed(2)+
							" miles away. </p>"
				});
				marker.setMap(map);
					
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.setContent(marker.title);
					infowindow.open(map, marker);
				});

				makeShortestPath(closest_stop_index, me);

			}

      	// use API and stop id of the T-station to get the schedule information
	    function getSchedule(stop_index, stop_id) {
	    	var request = new XMLHttpRequest();
			request.open("GET", "https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id=" + stop_id, true);
			request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200) {
					theData = request.responseText;
					var info = JSON.parse(theData);
					content = "<p class=station_name>" + stops[stop_index].stop_name + "</p>";
					left_title = "<p class=left_title> Arrival Time </p>";
					right_title = "<p class=right_title> Direction </p>";
					content = content + left_title + right_title;

					for (j = 0; j < info.data.length; j++) {
						if (info.data[j].attributes.arrival_time != null) {
							time_stamp = findTime(info.data[j].attributes.arrival_time);
							arrival_time = "<p class=arrival_time>" + time_stamp + "</p>";
							content = content + arrival_time;
							
							if (info.data[j].attributes.direction_id == 0)
							{
								content = content + "<p class=direction> Southbound</p>";

							}
							else if (info.data[j].attributes.direction_id == 1)
							{
								content = content + "<p class=direction> Northbound</p>";
							}
							else {
								content = "<p class=direction> Not available </p>";
							}
						}
						else if (info.data[j].attributes.departure_time != null) {
							time_stamp = findTime(info.data[j].attributes.departure_time);
							departure_time = "<p class=arrival_time>" + time_stamp + "</p>";
							content = content + departure_time;
							if (info.data[j].attributes.direction_id == 0)
							{
								content = content + "<p class=direction> Southbound</p>";

							}
							else if (info.data[j].attributes.direction_id == 1)
							{
								content = content + "<p class=direction> Northbound</p>";
							}
							else {
								content = "<p class=direction> Not available </p>";
							}
						}
						else {
							content = "<h4> Not available </h4>";
						}
					}
					
					infowindow.setContent(content);
	                infowindow.open(map, markers[stop_index].marker);

				}
				else if (request.readyState == 4 && request.status != 200) {
					document.getElementById("location").innerHTML = "<p>Something went wrong</p>";
				}
				else {
					
				}
			}
			request.send(null);
      }

      function findTime (arrival_time) {
      	begin = arrival_time.indexOf("T");
      	end = arrival_time.lastIndexOf("-");
      	time_stamp = arrival_time.substring(begin+1, end);
      	return time_stamp;
      }

      function makePath (markers) {
        	for (i = 0; i < markers.length;i++) {
        		path_lat = markers[i].marker.getPosition().lat();
        		path_lng = markers[i].marker.getPosition().lng();

        		if ((markers[i].stop_id != "place-nqncy") &&
        			(markers[i].stop_id != "place-wlsta") &&
        			(markers[i].stop_id != "place-qnctr") &&
        			(markers[i].stop_id != "place-qamnl") &&
        			(markers[i].stop_id != "place-brntn") &&
        			(markers[i].stop_id != "place-jfk")) {

        			pathCoords[pathCoords_size] = {lat: path_lat, lng: path_lng};
        			pathCoords_size++;
        		}
        		else if (markers[i].stop_id == "place-jfk") {
        			pathCoords[pathCoords_size] = {lat: path_lat, lng: path_lng};
        			pathCoords_size++;
        			forkCoords[forkCoords_size] = {lat: path_lat, lng: path_lng};
        			forkCoords_size++;
        		}
        		else {

        			forkCoords[forkCoords_size] = {lat: path_lat, lng: path_lng};
        			forkCoords_size++;
        		}
        	}

        	var path = new google.maps.Polyline({
          	path: pathCoords,
          	geodesic: true,
          	strokeColor: '#FF0000',
          	strokeOpacity: 1.0,
          	strokeWeight: 2
        	});

        	path.setMap(map);

        	var fork = new google.maps.Polyline({
         	path: forkCoords,
          	geodesic: true,
          	strokeColor: '#FF0000',
          	strokeOpacity: 1.0,
          	strokeWeight: 2
        	});

        	fork.setMap(map);
      }

      function makeShortestPath (closest_stop_index) {
      	start_lat = myLat;
        start_lng = myLng;
        end_lat = markers[closest_stop_index].marker.getPosition().lat();
        end_lng = markers[closest_stop_index].marker.getPosition().lng();
        shortestPathCoords = [{lat: start_lat, lng: start_lng}, {lat: end_lat, lng: end_lng}];

		var path = new google.maps.Polyline({
          	path: shortestPathCoords,
          	geodesic: true,
          	strokeColor: '#008B00',
          	strokeOpacity: 1.0,
          	strokeWeight: 2
        });

        path.setMap(map);

      }
 
      function closestStop (markers) {
      	closest_stop_index = 0;
      	for (i = 1; i < markers.length; i++) {
      		if (google.maps.geometry.spherical.computeDistanceBetween(me,markers[i].marker.position) < 
      			google.maps.geometry.spherical.computeDistanceBetween(me,markers[closest_stop_index].marker.position)) {
      			closest_stop_index = i;
      		}
      	}
      	return closest_stop_index;
      }
