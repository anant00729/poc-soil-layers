const useCropGrid = () => {
  const getCropTypeDetails = async (lon, lat, depth_q) => {
    try {
      const res = await fetch(`https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${lon}&lat=${lat}&property=bdod&property=clay&property=sand&property=silt${depth_q}&value=Q0.5&value=Q0.05&value=Q0.95&value=mean&value=uncertainty`)
      const responseData = await res.json()
      return responseData
    } catch (error) {
      return error?.message
    }
  }

  const getLandElevation = async (lon, lat) => {
    try {
      const res = await fetch(`https://soil-layers.herokuapp.com/getElevation/${lat}/${lon}`)
      // const res = await fetch(`http://localhost:5010/getElevation/${lat}/${lon}`)
      const responseData = await res.json()
      return responseData
    } catch (error) {
      return error?.message
    }
  }
  
  const getVanGenuchtenParams = async (mainData) => {
    
    const mainDataArr = Object.values(mainData)
    const soildata = []
    const reqKeys = ["sand", "silt", "clay", "bdod"]

    for(let i = 0; i < mainDataArr.length; i++){
      const singleSoilData = []
      for(let key of reqKeys){
        singleSoilData.push(parseFloat(mainDataArr[i][key]))
      }
      soildata.push(singleSoilData)
    }

    try {
      const reqBody = {
        soildata
      }
      // [%sand, %silt, %clay, buld density, th33, th1500]
      console.log('reqBody', reqBody)
      const url = 'https://soil-layers.herokuapp.com/getVanGenuchtenParams'
      const res = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      });
      const responseData = await res.json()
      return responseData.van_genuchten_params
    } catch (error) {
      return error?.message
    }
  }
  return {
    getCropTypeDetails,
    getLandElevation,
    getVanGenuchtenParams
  };
}

export default useCropGrid;
