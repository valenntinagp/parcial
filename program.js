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
                color: 'blue',
                weight: 1,
                fillColor: 'blue',
                fillOpacity: 0.1,
                
            }
        }
    ).addTo(map);
}

loadPolygon();
async function loadPoint(){

    let myData2 = await fetch('arboles_timiza.geojson')
    let myPoint = await myData2.json();
    
    L.geoJSON(myPoint,
        {
            pointToLayer: (feature, latlong)=>{                    
                
                return L.circleMarker(latlong,{
                    radius:4,
                    fillColor:'green',
                    weight:1,
                    opacity:2,
                    fillOpacity: 1,
                })
            }
        }
    ).addTo(map);
}

loadPoint();

let btnTrees = document.getElementById("btnTrees");

btnTrees.addEventListener('click',
    async function () {
        let response= await fetch("arboles_timiza.geojson");
        let datos= (await response.json());

        //Agregar la capa al mapa
        L.geoJSON(miPoint,
            {
                pointToLayer: (feature, latlong)=>{                    
                    
                    return L.circleMarker(latlong,{
                        radius:3,
                        fillColor:'green',
                        weight:1,
                        opacity:1,
                        fillOpacity: 0.5,
                    })
                }
            }
        ).addTo(map);
    }
)

let btnDistance= document.getElementById("btnDistance");

btnDistance.addEventListener('click',
    async function() {
        let response= await fetch("arboles_timiza.geojson");
        let datos= await response.json();
        let trees= datos.features.map((myElement, index)=>({
            id: index+1,
            coordinates: myElement.geometry.coordinates
        }));        

        let distances=[];
        trees.forEach( (treeA)=>{trees.forEach(

            
                (treeB)=>{
                    if(treeA.id != treeB.id){
                        let distance = turf.distance( 
                            turf.point(treeA.coordinates),
                            turf.point(treeB.coordinates),
                        );
                        distances.push(
                            [
                                `Árbol ${treeA.id}`,
                                `Árbol ${treeB.id}`,
                                distance.toFixed(3)                            
                            ]
                        )
                }
            }
            )
        }
        )
        generatePDF(distances, trees.lenght);
    }
)
function generatePDF(distances, totalTrees){
    let { jsPDF } = window.jspdf;
    let documentPDF= new jsPDF();   
    
    documentPDF.text("REPORTE DE ÁRBOLES EN EL BARRIO TIMIZA", 10,10);

    documentPDF.autoTable(
        {
            head: [['Árbol 1', 'Árbol 2', 'Distance']],
            body: distances
        }
    );
    documentPDF.save("Timiza.pdf")
}
btnSiniestros.addEventListener('click', 
    async function(){
        let response = await fetch("siniestros_timiza.geojson");
        let datos = (await response.json());
        //Agregar la capa al mapa
        L.geoJSON(
            datos,
            {
                pointToLayer: (feature, latlong)=>{

                    return L.circleMarker(latlong, {
                        radius:3,
                        fillColor:'red',
                        weight:1,
                        opacity:0,
                        fillOpacity: 0.5,
                    })

                }
            }
        ).addTo(map);

    }
    
)