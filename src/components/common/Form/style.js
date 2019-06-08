import styled from 'styled-components';
import { ErrorMessage } from 'formik';
import { Button } from 'antd';

export const defaults = {
  height: '60px',
  padding:'.40px 20px'
}

export const FieldIconExpand = styled.div`
  position:relative;
  i{
    position:absolute;
    top: -35px;
    right: 5px;
    color:${props =>  props.theme.color.primary }
  }
`

export const FieldContainer = styled.label`
  display:block;
  background-color: ${ props =>{
    if( !props.valid || props.isFocus || props.isDisabled ){
        return props.theme.color.white.regular;
    }else if( props.error ){
      return props.theme.color.red.regular
    }else{
      return props.theme.color.success.light
    }
  }};
  width: 100%;
  height:${defaults.height};
  margin-bottom:.5rem;
  border-radius:5px;
  position: relative;
  color: ${props => props.theme.color.orange.light};
  transition: all .2s
  &button{
    width:100%;
    height100%;
  }
  cursor: ${ props=> props.isDisabled ? 'not-allowed' : 'pointer' };
  ${FieldIconExpand}{
    i{ color: ${props =>{
      if( props.isDisabled  ){
        return props.theme.color.black.lighter
      }else if( !props.isDisabled && !props.valid ){
        return props.theme.color.primary
      }else{        
        return props.theme.color.success.regular
      }
    }}
  }
`;

export const InputStyled = styled.input`
  border:none;
  background:transparent;
  padding:.40px 20px;
  margin-top: 20px;
  :focus{
     outline-width: 0;
  }
`;


export const ErrorMessageField = styled(ErrorMessage) `
  position:relative;
`;


export const LabelContainer = styled.div `
  position:relative;
  padding:.40px 20px;
`;

export const Fieldset = styled.fieldset `
  border:none;
  padding:0;
`;

export const FieldLabel = styled.div `
  position:absolute;
  margin-top:${props => props.isFocus || props.valid ? "10px" : "20px"};
  font-size:${props => props.isFocus || props.valid  ? "10px" : "14px"};
  color: ${props =>  props.isDisabled ? props.theme.color.black.lighter : props.theme.color.orange.light};
  transition: all .2s;
`;


export const ButtonSubmit = styled(Button)`
  width:100%;
  height:100%;
  min-height: 100%;
  &.ant-btn{
    text-align:left;
    border: none;
    color:white;
    font-weight:bold;
    font-family:'Roboto';
    background-color: ${props => props.theme.color.blue.regular}
  }

  i{
    color:white;
  }
  > span {
    width: 90%;
  }

  :hover{
    i { color: black;}
  }
`


