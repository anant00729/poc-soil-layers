import React, {useContext} from 'react'
import { useForm } from "react-hook-form";
import { SoilGridFormWrapper , ElevationWrapper, ResultsLabel} from './styles'
import { AppButton } from '../AppInput/styles'
import { GlobalContext } from '../../context/GlobalContext'

const SoilGridForm = ({ onHandleSubmit }) => {

  const depths = ["0-5cm", "5-15cm", "15-30cm", "30-60cm", "60-100cm", "100-200cm" ]
  const {location, elevation, googleElevation, totalAmount } = useContext(GlobalContext);
  
  const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm();
  const onSubmit = data => {
    const depths = Object.keys(data).reduce((acc, cv) => {
      if(data[cv]) {
        acc.push(cv)
      }
      return acc
    }, [])
    const depthQ = `&depth=${depths.join('&depth=')}`
    if(depths.length !== 0){
      onHandleSubmit(depthQ,depths)
    }
  }

  return (
    <SoilGridFormWrapper onSubmit={handleSubmit(onSubmit)}>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: '20px'}}>
        {depths.map((d,i) => {
          return (
            <div key={i} style={{ width: '30%', marginTop: '20px'}}>
              <div style={{display: 'flex'}}>
                <input name={d} type="checkbox" {...register(d)}  />
                <div style={{ marginLeft: '8px'}}>
                  <label 
                  style={{ cursor: 'pointer'}}
                  htmlFor={d} className="form-check-label">{d}</label>
                </div>
              </div>    
              <div className="invalid-feedback">{errors[d]?.message}</div>
            </div>)
          }
        )}
      </div>
      {/* {errors.example_2 && <p class="error">{errors.example_2.message}</p>} */}
    <AppButton type="submit" />
    <ElevationWrapper>
      <ResultsLabel>{`Pointer is at (${location?.lat?.toFixed(2) ?? 0 },${location?.lng?.toFixed(2) ?? 0})`}</ResultsLabel>
      <ResultsLabel>{`(OpenTopo) Elevation: ${elevation?.toFixed(2) ?? 0} m`}</ResultsLabel>
      <ResultsLabel>{`(Google) Elevation: ${googleElevation?.toFixed(2) ?? 0} m`}</ResultsLabel>
      {/* <ResultsLabel>{`theta(psi) = 100*theta_r+(theta_s-theta_r)/((1+(alpha*abs(psi))^n)^(1-1/n))`}</ResultsLabel> */}
      <ResultsLabel>{`Total Amount of water in bucket: ${totalAmount} mm`}</ResultsLabel>
    </ElevationWrapper>
  </SoilGridFormWrapper>
  )
}

export default SoilGridForm