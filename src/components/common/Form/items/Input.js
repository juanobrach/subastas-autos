import React from 'react';

import {
  InputStyled
} from '../style';

const Input = ({
  id,
  isFocus,
  onChange,
  onFocus,
  onBlur,
  fieldRef,
  fieldType,
  value,
  name,
  errors,
  type,
  ...props
})=>{
  return (
    <div>
      <InputStyled value={value} id={id} type={type} name={name}  ref={fieldRef} onFocus={onFocus} onBlur={onBlur}  isFocus={isFocus} onChange={onChange}/>
    </div>
  )
}


export default Input;