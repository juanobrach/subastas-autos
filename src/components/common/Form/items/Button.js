import React from 'react';
import { Icon } from 'antd';


import {
  ButtonSubmit
} from '../style';

const Button = ({
  ...props
})=>{
  return (
    <ButtonSubmit htmlType="submit" >
      Cotizá tu auto ahora
      <Icon type="right" />
    </ButtonSubmit>

  )
}


export default Button;