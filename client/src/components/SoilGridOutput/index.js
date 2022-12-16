import React, { useEffect, useContext } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import { ListWrapper, ItemWrapper, SoilTypeWrapper, ScrollView, DepthLabelWrapper, TitleLabel } from './styles'
import Loader from '../../images/loader.svg'


function SoilGridOutput() {

  const { soil_grid_data, loading } = useContext(GlobalContext)
  

  return (
    !loading ? 
    <ScrollView>
      <ListWrapper>
      {Object.keys(soil_grid_data).map((d, i) => {
        return (
        <ItemWrapper key={i}>
          <DepthLabelWrapper>
            <label style={{ textAlign: "center"}}>
              Depth <br/>
              {d}
            </label>
          </DepthLabelWrapper>
          <div style={{ 
            display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%'}}>
            {
              Object.keys(soil_grid_data[d]).map((s, j) => {
                let title = s;
                let sub = `: ${parseFloat(soil_grid_data[d][s]).toFixed(2)}`
                let color = '#dcfce7'
                if(s === 'bdod'){
                  title = 'Bulk Density'    
                  sub = `: ${soil_grid_data[d][s]} g/cm3`
                  color = '#fef08a'
                }else if(s === 'sand' || s === 'silt'|| s === 'clay'){
                  sub = `: ${soil_grid_data[d][s]}%`
                  color = '#fef08a'
                }else if(s === 'Soil Water Potential'){
                  sub = `: ${soil_grid_data[d][s]} kPa`
                }else if (s === 'theta(psi)'){
                  color = '#a5f3fc'
                  sub = `: ${soil_grid_data[d][s]}%`
                }else if (s === 'water in layer'){
                  color = '#fecaca'
                  sub = `: ${soil_grid_data[d][s]} mm`
                }else if(s === 'depth') {
                  color = '#fed7aa'
                  sub = `: ${soil_grid_data[d][s]} cm`
                }
                return <SoilTypeWrapper 
                color={color}
                key={j}>
                  <TitleLabel>{title}</TitleLabel>
                  <label>{sub}</label>
                </SoilTypeWrapper>
              })
            }
          </div>
          
        </ItemWrapper>)
      })}
    </ListWrapper> 
    </ScrollView> : 
      <div style={{height: '100%', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
        }}>
        <img src={Loader}
          style={{
            width: '200px',
            height: '200px'
          }}
          />
      </div>
  )
}

export default SoilGridOutput