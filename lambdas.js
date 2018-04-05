// Fake weather data provider. Give it any string and it'll give you a number.

module.exports.weather = function (event, context, callback) {
  var qps = event.queryStringParameters || {};
  var location = qps.location;

  if (!location) {
    callback(null, {
      statusCode: 400,
      body: "Unrecognized request. Use /weather?location=<city name>",
    });
    return null;
  }

  function addChars (a, b) { return a + b.charCodeAt(0); }
  var temperature = (location.split('').reduce(addChars, 1) % 60) + 30;
  var response = {
    statusCode: 200,
    body: JSON.stringify({ temperature: temperature }),
  };
  callback(null, response);
}



var twins = [
  [
    "Dull, Scotland",
    "Boring, Oregon, USA",
    "Bland, Australia",
  ],
  [
    "Salt Lake City, Utah, USA",
    "Oruro, Bolivia",
    "Sarajevo, Bosnia & Herzegovina",
    "Manaus, Brazil",
    "Thurles, Ireland",
    "Izhevsk, Russia",
    "Tabriz, Iran",
    "Turin, Italy",
    "Matsumoto, Japan",
    "Quezon City, Phillipines",
    "Chernivtsi, Ukraine",
    "Trujillo, Peru",
    "Keelung, China",
  ],
  [
    "Herndon, Virginia, USA",
    "Runnymede, England",
  ],
  [
    "Washington, DC, USA",
    "Bangkok, Thailand",
    "Darak, Senegal",
    "Beijing, China",
    "Brussels, Belgium",
    "Athens, Greece",
    "Paris, France",
    "Pretoria, South Africa",
    "Seoul, South Korea",
    "Accra, Ghana",
    "Sunderland, United Kingdom",
    "Rome, Italy",
    "Ankara, Turkey",
    "Brasilia, Brazil",
    "Addis Ababa, Ethiopia",
  ],
];

var flatTwins = twins.reduce(function (acc, elt) {
  return acc.concat(elt);
}, []);

module.exports.twins = function (event, context, callback) {
  var qps = event.queryStringParameters || {city: ""};
  var city = qps.city || "";
  var group = twins.find(function(g) {
    return g.some(function (elt) {
      return elt === city;
    });
  });

  if (!group) {
    callback(null, {
      body: "City not found. Available cities: " + JSON.stringify(flatTwins.join("; ")),
      statusCode: 200,
    });
    return null;
  }

  callback(null, {
    body: JSON.stringify({ twins: group }),
    statusCode: 200,
  });
}
