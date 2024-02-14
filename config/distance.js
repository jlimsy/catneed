const haversine = require("haversine");

const start = {
  latitude: "1.32314598295591",
  longitude: "103.855879621151",
};

const end = {
  latitude: "1.32158068709129",
  longitude: "103.854150953187",
};

console.log(haversine(start, end, { unit: "km" }));
