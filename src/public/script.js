const map = L.map("map").setView([0, 0], 0);

if(location.protocol !== "http") {
    navigator.geolocation.getCurrentPosition((pos) => {
        map.setView([pos.coords.latitude, pos.coords.longitude], 10);
    }, () => {}, {enableHighAccuracy: true});
}

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);

map.on("click", (e) => {
    fetch("/mapclick?" + new URLSearchParams({
        lng: e.latlng.lng,
        lat: e.latlng.lat
    }));
    L.popup()
        .setLatLng([e.latlng.lat, e.latlng.lng])
        .setContent("Clicked here")
        .addTo(map);
});