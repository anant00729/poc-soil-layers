import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import {
  GET_SOIL_GRID_DATA,
  GET_LOCATION_DATA,
  SHOW_LOADER
} from "./types";
import useCropGrid from '../hooks/useCropGrid'

// Initial state
const initialState = {
  soil_grid_data: {},
  location: {},
  loading: false,
  elevation: 0,
  googleElevation: 0,
  totalAmount: 0
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const { getCropTypeDetails, getLandElevation, getVanGenuchtenParams } = useCropGrid() 

  // Actions
  const getSoilGridData = async (log, lat, depths) => {
    dispatch({
      type: SHOW_LOADER,
      payload: true
    });
    const response = await getCropTypeDetails(log, lat, depths)
    console.log('response', response.properties.layers)

    let mainData = response.properties.layers.reduce((acc, cv) => {
      for(let d of cv.depths){
        acc[d.label] = {
          ...acc[d.label],
          [cv.name] : d.values.mean,
        }
      }
      // acc['soil water potential'] = -200
     return acc
    }
    ,{})

    console.log('mainData', mainData)

    const depthsRange = {
      "0-5cm":3, 
      "5-15cm":10, 
      "15-30cm":20, 
      "30-60cm":45, 
      "60-100cm":75, 
      "100-200cm":150
    }
    
    mainData = Object.keys(mainData).reduce((acc, cv)=> {
      let _val = mainData[cv]
      for(let s of Object.keys(_val)){
        if(s !== "bdod") {
          _val[s] = ((_val[s] / 10).toFixed(2));
        }else {
          _val[s] = ((_val[s] / 100).toFixed(2));
        }
      }
      _val['depth'] = depthsRange[cv]
      acc = { ...acc, [cv] : _val }
      return acc
    }, {})
    console.log('mainData', mainData)
    const vanGenuchtenParams = await getVanGenuchtenParams(mainData)
    console.log('vanGenuchtenParams', vanGenuchtenParams)


    const vanGenuchtenParamsKeys = ["theta_r", "theta_s", "log10(alpha)", "log10(n)", "log10(ksat)"]

    let total = 0
    

    mainData = Object.keys(mainData).reduce((acc, cv, i) => {
      acc = { ...acc, [cv] : mainData[cv] }

      for(let j = 0; j < vanGenuchtenParams[i].length; ++j){
        acc[cv][vanGenuchtenParamsKeys[j]] = vanGenuchtenParams[i][j]
      }
      const a = acc[cv]

      // a["theta_r"] = 0.09
      // a["theta_s"] = 0.41
      // a["log10(alpha)"] = -2.09
      // a["log10(n)"] = 0.15
      //console.log('a', a)
      // 100*theta_r+(theta_s-theta_r)/((1+(alpha*abs(psi))^n)^(1-1/n))
      // 100*(theta_r+(theta_s-theta_r)/((1+(alpha*abs(psi))^n)^(1-1/n)))

      const numberator = 
      (a["theta_r"]) + (a['theta_s'] - a['theta_r'])

      const n = Math.pow(10, a["log10(n)"])
      const alpha = Math.pow(10, a["log10(alpha)"])
      const psi = -200
      const d_1 = (1-1/n)

      let d_2 = alpha * Math.abs(psi)
      d_2 = 1 + Math.pow(d_2, n)
      d_2 = Math.pow(d_2,d_1)

      // const denominator =  Math.pow((1 + Math.pow((alpha * Math.abs(psi)), n)), d_1)
      // console.log('denominator', denominator)
      acc[cv]['Soil Water Potential'] = -200
      // acc[cv]['theta(psi)'] = 100 * (numberator / denominator)
      acc[cv]['theta(psi)'] = parseFloat(100 * (numberator / d_2)).toFixed(2)
      acc[cv]['water in layer'] = parseFloat(acc[cv]['theta(psi)'] * acc[cv]['depth']).toFixed(2)
      total += parseFloat(acc[cv]['water in layer']) 
      
      return acc
    }, {})


    // console.log('mainData', mainData)
    // console.log('total', total)
    
    dispatch({
      type: GET_SOIL_GRID_DATA,
      payload: {mainData, totalAmount: total}
    });


  }

  const getLocationData = async (location) => {
    const { lat = 0, lng = 0 } = location 
    const resp = await getLandElevation(lng, lat)
    dispatch({
      type: GET_LOCATION_DATA,
      payload: {location, elevation: resp.elevation, googleElevation: resp.googleElevation}
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        soil_grid_data: state.soil_grid_data,
        location: state.location,
        loading: state.loading,
        elevation: state.elevation,
        googleElevation: state.googleElevation,
        totalAmount: state.totalAmount,
        getSoilGridData,
        getLocationData
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};