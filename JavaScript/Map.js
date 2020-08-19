mapboxgl.accessToken = 'pk.eyJ1IjoiYWJya2FoIiwiYSI6ImNqdmVmbDg2dDFiNDE0ZXA4djduNndpb2IifQ.cQpJV817LnNKamA8fvmQig';
const map = new mapboxgl.Map({
    container: 'map',
    center: [1.443400, 43.600990],
    zoom: 13,
    style: 'mapbox://styles/abrkah/cjx97shm32fok1cqt6fe1572r',
});

const callBackGetSuccess = function (dataJson) {

    class MapBuild {
        constructor() {
            this.dataGeo = [];
            for (this.i = 0; this.i < dataJson.length; this.i++) {

                class Station {
                    constructor(number, name, address, positionLat, positionLng, banking, bikeStands, availableBikeStands, availableBikes, status, icon) {

                        this.features = [
                            this.type = "Feature",
                            this.properties = {
                                number: number,
                                name: name,
                                address: address,
                                banking: banking,
                                bikeStands: bikeStands,
                                availableBikeStands: availableBikeStands,
                                availableBikes: availableBikes,
                                status: status,
                                icon: icon,
                            },

                            this.geometry = {
                                type: "Point",
                                coordinates: [
                                    positionLng,
                                    positionLat
                                ],
                            }];

                    };
                }

                this.number = dataJson[this.i].number;
                this.name = dataJson[this.i].name;
                this.address = dataJson[this.i].address;
                this.banking = dataJson[this.i].banking;
                this.bikeStands = dataJson[this.i].bike_stands;
                this.availableBikeStands = dataJson[this.i].available_bike_stands;
                this.availableBikes = dataJson[this.i].available_bikes;
                this.status = dataJson[this.i].status;
                this.positionLat = dataJson[this.i].position.lat;
                this.positionLng = dataJson[this.i].position.lng;
                this.icon = this.noBikeIcon();

                this.addStation = new Station(this.number, this.name, this.address, this.positionLat, this.positionLng, this.banking, this.bikeStands, this.availableBikeStands, this.availableBikes, this.status, this.icon);
                this.dataGeo.push(this.addStation);
            }

            map.addSource('bicycle', {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": this.dataGeo,
                },
            });
            map.addLayer({
                "id": "symbols",
                "type": "symbol",
                "source": "bicycle",
                "layout": {
                    "icon-image": "{icon}-15",
                },
            });

            map.on('mouseenter', 'symbols', function () {
                map.getCanvas().style.cursor = 'pointer';
            });

            map.on('mouseleave', 'symbols', function () {
                map.getCanvas().style.cursor = '';
            });
            map.on('click', 'symbols', function infoSet(getInfo) {
                map.flyTo({center: getInfo.features[0].geometry.coordinates});

                this.stationStat = document.getElementById("stationStatus");
                if (getInfo.features[0].properties.status === "OPEN") {
                    this.stationStat.innerHTML = "Ouvert";
                    this.stationStat.style.color = "green";
                } else {
                    this.stationStat.innerHTML = "Fermé";
                    this.stationStat.style.color = "red";
                };
                if (getInfo.features[0].properties.banking === true) {
                    document.getElementById("stationBanking").textContent = "Terminal de paiement disponible"
                } else {
                    document.getElementById("stationBanking").textContent = "Terminal de paiement indisponible"
                };
                if (getInfo.features[0].properties.availableBikes === "0" || !getInfo.features[0].properties.availableBikes) {
                    bookButton.disabled = true;
                    clientHelp.textContent = "Aucun vélo disponible pour le moment"
                } else {
                    if (!lname.validity.valid || !fname.validity.valid) {
                        bookButton.disabled = true;
                        clientHelp.textContent = "Veuillez remplir les boîtes nom et prénom"
                    } else if (lname.validity.valid && fname.validity.valid && getInfo.features[0].properties.availableBikes > 0) {
                        bookButton.disabled = false;
                        clientHelp.textContent = "";
                    }
                    tabInput.oninput = () => {
                        if (lname.validity.valid && fname.validity.valid) {
                            bookButton.disabled = false;
                            clientHelp.textContent = "";
                        } else if (!lname.validity.valid || !fname.validity.valid) {
                            bookButton.disabled = true;
                            clientHelp.textContent = "Veuillez remplir les boîtes nom et prénom"
                        }
                    };
                };

                stationName.textContent = "Station " + getInfo.features[0].properties.name;
                stationAddress.textContent = getInfo.features[0].properties.address;
                stationAvailableStands.textContent = "Emplacements libres: " + getInfo.features[0].properties.availableBikeStands + " sur " + getInfo.features[0].properties.bikeStands;
                stationAvailableBikes.textContent = "Vélos disponibles: " + getInfo.features[0].properties.availableBikes;
            });

            bookButton.disabled = true;

        }
        noBikeIcon() {
            return dataJson[this.i].available_bikes === 0 ? "bicycle1" : "bicycle";
        };
    };

    new MapBuild();

    $("#bookButton").click(function (event) {
        event.preventDefault();
        $("#bookForm").toggle("easing");
        clientHelp.textContent = "Veuillez signer pour pouvoir valider votre commande";
        return this.innerHTML === "Réserver" ? this.innerHTML = "Annuler" : this.innerHTML = "Réserver";
    });
};

$(document).ready(function () {
    const apiKey = "951e2bb233e6bbabd4301019f71ec66b75a04901";
    const url = "https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=951e2bb233e6bbabd4301019f71ec66b75a04901";

    $.get(url, callBackGetSuccess)

});