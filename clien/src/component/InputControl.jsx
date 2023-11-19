import React from 'react'
import './InputControl.css'
const InputControl=({className,id,label,type,value,onChange,placeHolder})=> {
  return (
  <input className={className}
    id={id}
    type={type}
    value={value}
    label={label}
    placeholder={placeHolder}
    onChange={(e)=>onChange(e.target.value)}
  />
  );
  
}
export default InputControl
