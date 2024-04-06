let mapClickCallback = () => {};
let mapClickCallbackOwner = null;

function setMapClickCallback(owner, callback) {
    if(mapClickCallbackOwner != null && mapClickCallbackOwner.classList != null)
        mapClickCallbackOwner.classList.remove("map-click-active");
    mapClickCallbackOwner = owner;
    mapClickCallback = callback;
}

for(const el of document.getElementsByClassName("collapsible")) {
    el.addEventListener("click", function() {
        this.classList.toggle("active");
        if(this.nextElementSibling.style.display === "block") {
            this.nextElementSibling.style.display = "none";
        } else {
            this.nextElementSibling.style.display = "block";
        }
    });
}



const map = L.map("map").setView([0, 0], 3);

if(location.protocol !== "http") {
    navigator.geolocation.getCurrentPosition((pos) => {
        map.setView([pos.coords.latitude, pos.coords.longitude], 10);
    }, () => {}, {enableHighAccuracy: true});
}

const osmTileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors" });
osmTileLayer.addTo(map);

map.on("click", (e) => {
    mapClickCallback(e);
    setMapClickCallback(null, () => {});
});