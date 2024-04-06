const express = require("express");
const config = require("./config");

const PORT = process.env.PORT || 8080;

const app = express();

app.set("view engine", "pug");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", {siteTitle: "OSRM Frontend"});
});

app.get("/mapclick", (req, res) => {
    console.log(`User clicked on ${req.query.lng}, ${req.query.lat}`);
    res.send();
});

app.get("/route", (req, res) => {
    let reqString = "";
    reqString += (req.query.lng0 || 0) + "," + (req.query.lat0 || 0);
    let i = 1
    do {
        reqString += ";" + (req.query["lng" + String(i)] || 0) + "," + (req.query["lat" + String(i)] || 0);
        i += 1;
    } while (req.query["lng" + String(i)]);
    
    reqString += "?geometries=geojson";
    for(const key in req.query) {
        if(!key.startsWith("lng") && !key.startsWith("lat")) {
            reqString += `&${key}=${req.query[key]}`;
        }
    }

    console.log("Making backend request: " + reqString);
    fetch((config.osrmBackend.https ? "https://" : "http://") + config.osrmBackend.url + ":" + config.osrmBackend.port + "/route/v1/" + config.osrmBackend.profile + "/" + reqString).then((fetchRes) => {
        fetchRes.json().then((fetchRes) => {
            res.send(fetchRes);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});