const express = require("express");

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});