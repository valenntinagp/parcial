var map = L.map('map').setView([4.613205115353484, -74.15616016888627], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function loadPolygon(){

    let myData = await fetch('barrio_timiza2.geojson')
    let myPolygon = await myData.json();
    
    L.geoJSON(myPolygon,
        {
            style:{
                color: 'blue'
            }
        }
    ).addTo(map);
}

loadPolygon();

let btnTrees = document.getElementById('btnTrees');

btnTrees.addEventListener('click', ()=> alert("hola"));
