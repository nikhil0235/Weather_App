
import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import {useParams} from 'react-router-dom'

const containerStyle = {
  width: '500',
  height: '700px'
};

function MyComponent() {
  const {lat,lon} = useParams();
    const center = {
      lat: Number(lat),
      lng: Number(lon)
    };
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
    googleMapsApiKey: "AIzaSyA1wv8iLzZmlkStA1YT3F2zZnq3kPZfxU4"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)