import React from 'react';
import AsyncSelect from "react-select/lib/Async";
import ReactSelect from 'react-select';
import styled from 'styled-components';



import {
  defaults,
  FieldIconExpand
} from '../style';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: 'black',
    margin:0,
    top:0
  }),
  menuList: (provided, state) =>({
    ...provided,
    margin:0,
    padding:0,
    paddingLeft:'0',
    position:'absolute',
    background:'white',
    left:0,
    right:0,   
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: "100%",
    height:'100%',
    minHeight:'50px',
    background:'transparent',
    border:'none',
    boxSizing:'content-box'
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    let color = "red";
    if( state.hasValue  ){
      color =  "#418a03"
    }

    let position = "absolute";
    return {  opacity, transition, color,  position};
  },
  placeholder:(provided, state )=>{
      return {
        ...provided,
        color: state.selectProps.menuIsOpen ? 'inherit' : 'transparent',
        transition:'color 300ms'
      }
  },
  valueContainer: (provided, state )=>{
    return {
      ...provided,
      height:defaults.height,
      padding:defaults.padding
    }   
  },
  container:(provided, state )=>{
    return {
      ...provided,
      height:'50px',
    }   
  }
}



const Select = styled(ReactSelect)`
  &.selectField__Select.-container  {
    height:'50px',   
  }`

  const Async = styled(AsyncSelect)`
  &.selectField__Select.-container  {
    height:'50px',   
  }`

const SelectField =   React.forwardRef( ( props, ref)=>{
  console.log( 'select field', props )  
  if( ref  && ref.current ){
    if( props.name === 'year'  &&  props.value == '' ){
      // ref.current.select.clearValue()
    }
  }                                                                                                                                                                                                                                                                                                                          

  const handleChange = ( value, ref )=>{
    props.onChange(value, ref );
  }

  const { id, value, isValid, isFocus, name, onChange, onBlur, onFocus, options, disabled, dirty, loadOptions,defaultOptions, form } = props;
    console.log('value select', value )
    return(
         <div>
            <Select 
              name={name}   
              styles={customStyles}     
              placeholder='Buscar'
              onChange={handleChange}
              onBlur={onBlur}
              onFocus={onFocus}
              options={options}
              isClearable={true}
              id={id}
              ref={ ref }
              isDisabled={disabled}
              selected={value}
              />
              <FieldIconExpand>
                { isValid && !isFocus && !disabled   ?
                   <i className="material-icons">done</i> : <i className="material-icons">expand_more</i> 
                }
              </FieldIconExpand>
         </div> 
    )
})

export default SelectField;
