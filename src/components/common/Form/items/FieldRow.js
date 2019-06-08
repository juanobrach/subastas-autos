import React from 'react';
import SelectField from './selectField';
import Button from './Button';
import Input from './Input';

import {
  LabelContainer,
  FieldLabel,
  FieldContainer
} from '../style';


const options_brands = [
    { value: 'bmw', label: 'BMW' },
    { value: 'audi', label: 'Audi' },
    { value: 'fiat', label: 'fiat' }
  ]

const options_years =[
  { value: '2010', label: '2010' },
  { value: '2017', label: '2017' },
  { value: '2018', label: '2018' },
]

const options_models = [
  { value: 'a1', label: 'A1' },
  { value: 'a3', label: 'A3' },
  { value: 'a4', label: 'A4' },  
]

const options_version = [
  { value: 'v1', label: '1.4 TFSI (125cv) MT Pack Cuero 3Ptas.' },
  { value: 'v2', label: 'RS3 2.5 TFSI Tiptronic Quattro (400cv) 4Ptas.' },
  { value: 'v3', label: '2.0 TFSI S-Tronic Front (252cv)' },  
]


  const filterColors = (inputValue) => {
    let options_arr = [];
    options_arr = options_years.filter(i =>{
       return i
    });
    return options_arr;
  };

  const promiseOptions = (inputValue) =>{
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });}


export default class FieldRow extends React.Component{
  constructor( props ){
    super(props);
    this.state = {
     isFocus: false,
     select: { value:'' },
     selected: '',
     valid: ( this.props.errors === undefined  )
   }
   this.fieldRef = React.createRef();

   console.log( 'props fieldrow', props )
  }
  



  componentWillReceiveProps(nextProps) {
  // You don't have to do this check first, but it can help prevent an unneeded render
    console.log('nextProps', nextProps )
    if( nextProps.field.value === "" ){
      this.setState( {select: { value: "" }})
    }
  }
   
   toggleFocus = (props) => {
     // console.log( props )
     if( !this.state.isFocus ){
      // console.log( 'toggleFocus inner',this )

     }
   }

   onBlur = () =>{
     this.setState( state => (
       { isFocus: false }
     ));
   }

   onFocus = ( props ) => {
     this.setState( state => (
       { isFocus: true }
     ));
   }

  setValue = (value) => {
    // console.log( 'setValue', value)
     this.setState({
       select: { value }
     })
     this.fieldRef.current.blur()
   };



   handleChange = (element, ref ) => {
     console.log( 'change props', this.props )
     console.log( 'element', element );
     this.setValue( element.value);
     this.props.setFieldValue( this.props.field.name ,element.value)
     this.props.setFieldTouched( this.props.field.name, true, true);
    //  if( ref.name === 'brand'){
    //     // this.props.getYears( element.value, ref.name );
    //     console.log('ref', element )
    //     this.props.setFieldValue( 'year', '', false);
    //     this.props.setFieldTouched('year', false, false)
    //     this.props.handleChange('year');

    //     this.props.setFieldValue( 'model','', true );
    //     this.props.setFieldTouched( 'model', true, true);
    //  }
    };

  render(){

    const {
      field,
      type,
      label,
      value,
      onChange,
      errors,
      options,
      form,
      dirty,
      disabled,
      loadOptions,
      defaultOptions,
      model_selected,
      openOnLoad
    } = this.props;
    const { isFocus } = this.state;
    // console.log('field', field)
    // console.log('errors', errors);
    // console.log('name', field.name)
    // console.log('dirty', dirty);
    const isValid = ( openOnLoad  ||  field.name !== undefined && field.value !== '' || errors && errors[field.name] === undefined && field.name !== undefined && field.value !== '');
    // console.log( 'errors' ,errors );
    console.log('value', options )
    return(
      <FieldContainer htmlFor={field.name}  valid={ isValid } isFocus={isFocus} isDisabled={disabled} >

       { type !== 'submit' && 
          <LabelContainer >
             <div>
               <FieldLabel isFocus={this.state.isFocus} valid={isValid} isDisabled={disabled} >
                   {label}
               </FieldLabel>
             </div>
           </LabelContainer>
         }
           { type === 'select' && <SelectField 
              id={field.name}   
              ref={this.fieldRef} 
              field={field} 
              label={label}  
              onChange={this.handleChange} 
              onFocus={this.onFocus} 
              onBlur={this.onBlur} 
              isFocus={this.state.isFocus}
              options={ options }
              form={form}
              isValid={isValid}
              disabled={disabled}
              dirty={dirty}
              loadOptions={loadOptions}
              defaultOptions={defaultOptions}
              name={field.name}
              value={value}
                /> }
           { ( type === 'text' || type === 'tel' )  && <Input 
                name={field.name}
                errors={errors}  
                value={value} 
                id={field.name} 
                fieldType={type} 
                field={field}  
                fieldRef={this.fieldRef} 
                label={label}  
                onChange={onChange} 
                onFocus={this.onFocus} 
                onBlur={this.onBlur} 
                isFocus={this.state.isFocus} /> }
           { type === 'submit' && <Button type="submit" fieldRef={this.fieldRef} label={label} /> }          
      </FieldContainer>
    )
  }
}