import React from 'react'
import { AppInputComponent, AppFormLabel } from './styles'

function AppInput({ errors= '', labelText = '', errorMessage = '', register, type}) {
  return (
    <>
      <AppFormLabel>{labelText}</AppFormLabel>
      <AppInputComponent 
      type={type}
      {...register} />
      {errors && <span>{errorMessage}</span>}
    </>
    
  )
}

export default AppInput