var map;

 <script>
      function init()
      {
        // Start at South Station
        var startLat = 42.352271;
        var startLng = -71.05524200000001;
        var current_position = new google.maps.LatLng(startLat, startLng);

        // Create markers for all stops
        // South Station
        var southstation_position = new google.maps.LatLng(42.352271, -71.05524200000001);
		// Andrew  
        var andrew_position = new google.maps.LatLng(42.330154, -71.057655);
        // Porter Square    
        var porter_position = new google.maps.LatLng(42.3884, -71.11914899999999);
        // Harvard Square   
        var harvard_position = new google.maps.LatLng(42.373362, -71.118956);
        // JFK/UMass    
        var jfk_position = new google.maps.LatLng(42.320685, -71.052391);
        // Savin Hill  
        var savin_position = new google.maps.LatLng(42.31129, -71.053331);
        // Park Street    
        var park_position = new google.maps.LatLng(42.35639457, -71.0624242);
        // Broadway  
        var broadway_position = new google.maps.LatLng(42.342622, -71.056967);
        // North Quincy    
        var nquincy_position = new google.maps.LatLng(42.275275, -71.029583);
        // Shawmut 
        var shawmut_position = new google.maps.LatLng(42.29312583, -71.06573796000001);
        // Davis
        var davis_position = new google.maps.LatLng(42.39674, -71.121815);
        // Alewife  
        var alewife_position = new google.maps.LatLng(42.395428, -71.142483);
        // Kendall/MIT
        var kendall_position = new google.maps.LatLng(42.36249079, -71.08617653);
        // Charles/MGH  
        var charles_position = new google.maps.LatLng(42.361166, -71.070628);
        // Downtown Crossing 
        var downtownx_position = new google.maps.LatLng(42.355518, -71.060225);
        // Quincy Center  
        var quincyC_position = new google.maps.LatLng(42.251809, -71.005409);
        // Quincy Adams
        var quincyA_position = new google.maps.LatLng(42.233391, -71.007153);
        // Ashmont   
        var ashmont_position = new google.maps.LatLng(42.284652,  -71.06448899999999);
        // Wollaston  
        var wollaston_position = new google.maps.LatLng(42.2665139, -71.0203369);
        // Fields Corner
        var fields_position = new google.maps.LatLng(42.300093, -71.061667);
        // Central Square
        var central_position = new google.maps.LatLng(42.365486, -71.103802);
        // Braintree  
        var brain_position = new google.maps.LatLng(42.2078543, -71.0011385);

        // Set up map
        var myOptions = {
          zoom: 15, 
          center: current_position,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        // Create the map in the "map_canvas" <div>
        var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
       
        function getMyLocation() {
        if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
          navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Trying to find location");
            myLat = position.coords.latitude;
            myLng = position.coords.longitude;
            current_position = google.maps.LatLng(myLat,myLng);
            renderMap();
          });
        }
        else {
          alert("Geolocation is not supported by your web browser.  What a shame!");
        }
        }

        function renderMap() {
				me = new google.maps.LatLng(myLat, myLng);
				// Update map and go there...
				map.panTo(me);
				
				// Create a marker
				marker = new google.maps.Marker({
					position: me,
					title: "Here I Am!"
				});
				marker.setMap(map);
					
				// Open info window on click of marker
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.setContent(marker.title);
					infowindow.open(map, marker);
				});
			}

          // will need to create markers for all T-stops
          // update schedule each time click on a marker? Or only load once?
         // Create a marker        
        var marker1 = new google.maps.Marker({
          position: current_position,
          title: "Here"
        });
        marker1.setMap(map);

        // South Station
        var marker2 = new google.maps.Marker({
          position: southstation_position,
          title: "South Station"
        });
        marker2.setMap(map);

         // Andrew
        var marker3 = new google.maps.Marker({
          position: andrew_position,
          title: "Andrew"
        });
        marker3.setMap(map);

         // Porter Square
        var marker4 = new google.maps.Marker({
          position: porter_position,
          title: "Porter Square"
        });
        marker4.setMap(map);

         // Harvard Square
        var marker5 = new google.maps.Marker({
          position: harvard_position,
          title: "Harvard Square"
        });
        marker5.setMap(map);

        //  JFK / UMASS
        var marker6 = new google.maps.Marker({
          position: jfk_position,
          title: "JFK / UMASS"
        });
        marker6.setMap(map);
        
        //  Savin Hill
        var marker7 = new google.maps.Marker({
          position: savin_position,
          title: "Savin Hill"
        });
        marker7.setMap(map);

        //  Park Street
        var marker8 = new google.maps.Marker({
          position: park_position,
          title: "Park Street"
        });
        marker8.setMap(map);

        //  Broadway
        var marker9 = new google.maps.Marker({
          position: broadway_position,
          title: "Broadway"
        });
        marker9.setMap(map);

        //  North Quincy
        var marker10 = new google.maps.Marker({
          position: nquincy_position,
          title: "North Quincy"
        });
        marker10.setMap(map);

        //  Shawmut
        var marker11 = new google.maps.Marker({
          position: shawmut_position,
          title: "Shawmut"
        });
        marker11.setMap(map);

        //  Davis
        var marker12 = new google.maps.Marker({
          position: davis_position,
          title: "Davis"
        });
        marker12.setMap(map);

        //  Alewife
        var marker13 = new google.maps.Marker({
          position: alewife_position,
          title: "Alewife"
        });
        marker13.setMap(map);

        //  Kendall MIT
        var marker14 = new google.maps.Marker({
          position: kendall_position,
          title: "Kendall MIT"
        });
        marker14.setMap(map);

        //  Charles / MGH
        var marker15 = new google.maps.Marker({
          position: charles_position,
          title: "Charles / MGH"
        });
        marker15.setMap(map);

        //  Downtown Crossing
        var marker16 = new google.maps.Marker({
          position: downtownx_position,
          title: "Downtown Crossing"
        });
         marker16.setMap(map);

        //  Quincy Center
        var marker17 = new google.maps.Marker({
          position: quincyC_position,
          title: "Quincy Center"
        });
        marker17.setMap(map);

        //  Quincy Adams
        var marker18 = new google.maps.Marker({
          position: quincyA_position,
          title: "Quincy Adams"
        });
        marker18.setMap(map);

        //  Ashmont
        var marker19 = new google.maps.Marker({
          position: ashmont_position,
          title: "Ashmont"
        });
        marker19.setMap(map);

        //  Wollaston
        var marker20 = new google.maps.Marker({
          position: wollaston_position,
          title: "Wollaston"
        });
        marker20.setMap(map);

        //  Fields Corner
        var marker21 = new google.maps.Marker({
          position: fields_position,
          title: "Fields Corner"
        });
        marker21.setMap(map);

        //  Central Square
        var marker22 = new google.maps.Marker({
          position: central_position,
          title: "Central Square"
        });
        marker22.setMap(map);

        //  Braintree
        var marker23 = new google.maps.Marker({
          position: brain_position,
          title: "Braintree"
        });
        marker23.setMap(map);


        var request = new XMLHttpRequest();
	    function getLocation() {
		request.open("GET", "https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id=place-sstat", true);
		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				console.log("Got the data back!");
				data = request.responseText;
				console.log(data);
				//loc = JSON.parse(data);
				//elem = document.getElementById("location");
				//elem.innerHTML = "<p>Carmen Sandiego was last seen at " + loc["description"] + "</p>";
			}
			else if (request.readyState == 4 && request.status != 200) {
				document.getElementById("location").innerHTML = "<p>Whoops, something went terribly wrongo</p>";
			}
			else {
				console.log("In progress...");
			}

		request.send(null);
		}

        // This is a global info window...
        var infowindow = new google.maps.InfoWindow();


        // will also need to put different info for each stop in a window
        // Open info window on click of marker
          google.maps.event.addListener(marker1, 'click', function() {
          infowindow.setContent(marker1.title);
          infowindow.open(map, marker1);
        });

          google.maps.event.addListener(marker2, 'click', function() {
          infowindow.setContent(marker2.title);
          infowindow.open(map, marker2);
        });
      }
   </script>