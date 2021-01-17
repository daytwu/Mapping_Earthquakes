// Add console.log to check to see if our code is working.
console.log('working');

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

L.control.layers(baseMaps).addTo(map);

// Accessing the earthquake GeoJSON URL
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// style
let myStyle = {
    color: '#ffffa1',
    weight: 2
}

// This function returns the style data for each of the earthquake we plot
// on the map. We pass the magnitutde of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
    return {
        opacity:1,
        fillOpacity: 1,
        fillColor: '#ffae42',
        color: '#000000',
        radius: getRadius(),
        stroke: true,
        weight: 0.5
    };
}

function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}


//  Grabbing our GeoJSON data.
d3.json(earthquakeData).then(function(data) {
    // console.log(data)

    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
            },
        style: styleInfo
    }).addTo(map);
});

// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);