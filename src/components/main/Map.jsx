/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Select from '../../components/main/form/Select'
import axios, { apiUrl } from '../../utils/axios'

mapboxgl.accessToken = 'pk.eyJ1IjoiYWhtYWRodXNzYWluIiwiYSI6ImNrZTVlemdoMDEyOGwycm1zdjZpcmNjYTcifQ.c6fY2tGCyssRuoyGCIuAJw';

const Map = ({ devices }) => {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [device, setDevice] = useState(null);
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
    }, []);

    const handleDeviceChange = (value) => {
        setDevice(value)
    }

    const stringToChanks = (string, chunkSize) => {
        const chunks = [];
        while (string.length > 0) {
            chunks.push(string.substring(0, chunkSize));
            string = string.substring(chunkSize, string.length);
        }
        return chunks
    }

    const HexToFloat32 = (str) => {
        var int = parseInt(str, 16);
        if (int > 0 || int < 0) {
            var sign = (int >>> 31) ? -1 : 1;
            var exp = (int >>> 23 & 0xff) - 127;
            var mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
            var float32 = 0
            for (var i = 0; i < mantissa.length; i += 1) { float32 += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0; exp-- }
            return (float32 * sign).toFixed(4);
        } else return 0
    }    

    useEffect(() => {
        if(device !== null) {
            axios.get(`device/${device.value}`).then(response => {
                const mappedLatLng = response.data.data.map(device => {

                    const returnedObject = {};

                    const chunks = stringToChanks(device.data, 8)
                    const firstPart = chunks[0];
                    const secondPart = chunks[1];
                    const convertedString = HexToFloat32(firstPart);
                    const convertedStringTwo = HexToFloat32(secondPart);

                    const splittedString = convertedString.split('.');
                    const splittedStringTwo = convertedStringTwo.split('.');
                    
                    if(splittedString[0].length < 2) {
                        const secondNumber = "." + splittedString[1];
                        returnedObject.latitude = (splittedString[0] * -1) + (parseFloat(secondNumber) / 60)
                    } else {
                        const firstTwoDigits = splittedString[0].slice(0, 2);
                        const remainingDigits = splittedString[0].slice(2, splittedString[0].length) + '.' + (splittedString[1]);

                        returnedObject.latitude = (firstTwoDigits * -1) + (remainingDigits / 60)
                    }

                    if(splittedStringTwo[0].length < 2) {
                        const secondNumber = "." + splittedStringTwo[1];
                        console.log(parseFloat(secondNumber) / 60, splittedStringTwo[0])
                        returnedObject.longitude = (splittedStringTwo[0]) + (parseFloat(secondNumber) / 60)
                    } else {
                        const firstTwoDigits = splittedStringTwo[0].slice(0, 2);
                        const remainingDigits = splittedStringTwo[0].slice(2, splittedStringTwo[0].length) + '.' + (splittedStringTwo[1]);

                        returnedObject.longitude = (firstTwoDigits) + (remainingDigits / 60)
                    }

                    return returnedObject;
                })

                console.log(mappedLatLng)
            }).catch(error => console.error(error))
        }
    }, [device]);

    return (
        <div>
            <div className="py-2">
                <Select value={device} onChange={handleDeviceChange} placeholder="Devices" options={devices.map(d => ({ value: d.id, text: d.id }))}></Select>
            </div>
            <div ref={mapContainer} className="rounded-lg" style={{height: '300px', width: '100%'}} />
        </div>
    )
}

export default Map