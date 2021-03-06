// Add console.log to check to see if our code is working.
console.log('working');

// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Light: light,
    Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [light]
});

L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/daytwu/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/Mapping_GeoJSON_Linestrings/static/js/torontoRoutes.json";

//  Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);

// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data, {
    color: '#ffffa1',
    weight: 2,
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr> Destination: "
        + feature.properties.dst + "</h3>");
    }
})
.addTo(map);
});

// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);