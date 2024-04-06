function clickRoutePickButton(button) {
    if(button.classList.contains("map-click-active")) {
        setMapClickCallback(null, () => {});
    } else {
        setMapClickCallback(button, (e) => {
            button.previousElementSibling.previousElementSibling.value = e.latlng.lng;
            button.previousElementSibling.value = e.latlng.lat;
        });
        button.classList.add("map-click-active");
    }
}

function getFormArgs(element) {
    let argList = {};
    if(element.classList.contains("coordinate-input")) {
        argList[element.firstElementChild.name] = element.firstElementChild.value;
        argList[element.firstElementChild.nextElementSibling.name] = element.firstElementChild.nextElementSibling.value;
    } else if(element.tagName === "INPUT") {
        argList[element.name] = element.value;
    } else if(element.classList.contains("collapsible-content") || element.tagName === "FORM") {
        for(const child of element.children) {
            const subArgList = getFormArgs(child);
            for(const property in subArgList) {
                argList[property] = subArgList[property];
            }
        }
    }
    return argList;
}

function routeFormSubmit(form) {
    let argList = getFormArgs(form);

    fetch("/route?" + new URLSearchParams(argList)).then((res) => res.json()).then((res) => {
        map.eachLayer((layer) => {
            if(layer.function === "route") {
                map.removeLayer(layer);
            }
        })
        if(res.code === "Ok") {
            for(let i = 0; i < res.routes.length; i++) {
                const colors = [
                    "#0000FF",
                    "#00FF00",
                    "#FF0000"
                ];
                const geoJson = L.geoJSON(res.routes[i].geometry, {
                    style: {
                        color: colors[i % 3]
                    }
                });
                geoJson.bindPopup(`distance: ${res.routes[i].distance}m<br>duration: ${res.routes[i].duration}s`);
                geoJson.function = "route";
                geoJson.addTo(map);
            }
            for(let i = 0; i < res.waypoints.length; i++) {
                const marker = L.marker([res.waypoints[i].location[1], res.waypoints[i].location[0]]);
                marker.bindPopup(res.waypoints[i].name);
                marker.function = "route";
                marker.addTo(map);
            }
        } else {
            alert("Error while fetching data");
        }
    });
}

function addCoordinateInputToRoute(button) {
    const last = button.previousElementSibling;
    let newID = 0
    if(last != null)
        newID = Number(last.getAttribute("data-id")) + 1;

    const div = document.createElement("div");
    div.className = "coordinate-input";
    div.setAttribute("data-id", String(newID));
    const lngInput = document.createElement("input");
    lngInput.type = "number";
    lngInput.name = "lng" + newID;
    lngInput.required = true;
    lngInput.step = "any";
    const latInput = document.createElement("input");
    latInput.type = "number";
    latInput.name = "lat" + newID;
    latInput.required = true;
    latInput.step = "any";
    const pickButton = document.createElement("button");
    pickButton.type = "button";
    pickButton.innerText = "Pick";
    pickButton.addEventListener("click", () => {
        clickRoutePickButton(pickButton);
    });
    div.appendChild(lngInput);
    div.appendChild(latInput);
    div.appendChild(pickButton);
    
    button.parentElement.insertBefore(div, button);
}

function removeCoordinateInputFromRoute(button) {
    const last = button.previousElementSibling.previousElementSibling;
    if(last != null && Number(last.getAttribute("data-id")) > 1)
        last.remove();
}

document.getElementById("routeAdd").click();
document.getElementById("routeAdd").click();