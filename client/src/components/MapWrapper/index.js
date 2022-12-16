import React, { useRef, useState, useContext, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import { GlobalContext } from '../../context/GlobalContext';
import { DEFAULT_CENTER, DEFAULT_ZOOM } from '../../utils/constants'
import Cursor from '../../images/cursor.png'
import { darkTheme } from '../../utils/constants'

const AnyReactComponent = ({ text }) => <img 
  src={Cursor} 
  style={{ height: '50px', width: '50px', position: 'absolute', transform: 'translate(-50%, -50%)'}}
/>;

function Map() {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const refMap = useRef(null);
  const { getLocationData } = useContext(GlobalContext)

  useEffect(() => {
    getLocationData(DEFAULT_CENTER)
  }, [])

  const handleBoundsChanged = () => {
    const lat = refMap.current.map_.center.lat(); //get map center
    const lng = refMap.current.map_.center.lng(); //get map center
    const location = {
      lat,
      lng,
    }
    getLocationData(location)
    setCenter(location);
  };

  const getMapOptions = (maps) => {
    return {
      gestureHandling: 'greedy',
      disableDoubleClickZoom: false,
      minZoom: 1,
      maxZoom: 80,
      tilt: 0,
      clickableIcons: false,
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      rotateControl: false,
      fullscreenControl: false,
    };
  };

  return (
      <GoogleMapReact
          ref={refMap}
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={DEFAULT_ZOOM}
          onDragEnd={handleBoundsChanged}
          options={getMapOptions}
          // onZoomAnimationEnd={handleBoundsChanged}
          onChildClick={handleBoundsChanged}
        >
      <AnyReactComponent
        {...center}
        text="My Marker"
      />
    </GoogleMapReact> 
  );
}

export default Map;
