import React, {useState, useEffect, useRef} from 'react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiYWhtYWRodXNzYWluIiwiYSI6ImNrZTVlemdoMDEyOGwycm1zdjZpcmNjYTcifQ.c6fY2tGCyssRuoyGCIuAJw';

const Map = ({ devices }) => {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(8);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });

    useEffect(() => {
        for(let device of devices){
            new mapboxgl.Marker().setLngLat([device.location.lng, device.location.lat]).setPopup(
                new mapboxgl.Popup({ offset: 25 })
                  .setHTML(
                    `<h2>${device.name}</h2>`
                  )
              ).addTo(map.current);
        }
        if(devices.length){
            map.current.flyTo({
                center: [devices[0].location.lng, devices[0].location.lat],
                zoom: 3
            })
        }
    }, [devices])

    return (
        <div>
            <div ref={mapContainer} className="rounded-lg" style={{height: '300px', width: '100%'}} />
        </div>
    )
}

export default Map