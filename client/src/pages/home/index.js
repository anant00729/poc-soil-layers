import React, { useEffect, useContext } from 'react'
import useCropGrid from '../../hooks/useCropGrid'
import { GlobalContext } from '../../context/GlobalContext'
import SoilGridForm from '../../components/SoildGridForm'
import GoogleMapReact from 'google-map-react';
import { DEFAULT_CENTER , DEFAULT_ZOOM} from '../../utils/constants'
import MapWrapper from "../../components/MapWrapper";
import { MainWrapper, MapContainer, DepthFormContainer, OutputContainer} from './styles'
import SoilGridOutput from '../../components/SoilGridOutput'



function Home() {
  const { getSoilGridData, location } = useContext(GlobalContext)

  const handleSubmit = (depths, depthList) => {
    const { lng=0, lat=0 } = location
    getSoilGridData(lng, lat, depths, depthList)
  }

  return (
    <MainWrapper>
      <DepthFormContainer>
        <SoilGridForm
         onHandleSubmit={handleSubmit}/>
      </DepthFormContainer>
      <MapContainer>
          <MapWrapper/>
      </MapContainer>
      <OutputContainer>
        <SoilGridOutput/>
      </OutputContainer>
    </MainWrapper>
  )
}

export default Home