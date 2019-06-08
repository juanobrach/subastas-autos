import React from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup'; // for everything
import FieldRow from './items/FieldRow';
import axios from 'axios';

import { useStaticQuery, Link, graphql } from "gatsby"



import {
  Fieldset
} from './style';


const formikForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ( props ) => ({ brand: "", year: "", model: "", version:"", email:"", phone:"", budget:"" }),
  validateOnChange:false,
  validateOnBlur:false,
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required('email is required!'),
    brand: Yup.string().required('brand is required!'),
    year: Yup.string().required('year is required!'),
    model: Yup.string().required('model is required!'),
    version: Yup.string().required('version is required!'),
    phone:Yup.string().required('Phone is required!')
  }),
  handleSubmit: (values, { setSubmitting }) => {

    // axios.get('http://localhost:34567/hello_fetch',{headers: {
    //   'Access-Control-Allow-Origin': '*',
    // }})
    // .then( res => {
    //     console.log('response', res )
    //     setSubmitting(false);
    //     alert(JSON.stringify(values, null, 2));
    // })
    // .catch( () => {
    //   console.log('Message not sent')
    // })
  },
  displayName: 'BasicForm', // helps with React DevTools
});


const MyForm = props => {
  console.log( 'props myForm', props )
  const data = useStaticQuery(
    graphql`
    query Marcas{
      allAutosCsv( filter: { Marca : { ne  : "" } } ){
        distinct(  field: Marca  )
        nodes{
          Marca
          Marca_ID
          Modelo
          Modelo_ID
          Version
          Version_ID
          Moneda
          _2007
          _2008
          _2009
          _2010
          _2011
          _2012
          _2013
          _2014
          _2015
          _2016
          _2017
          _2018
          _2019
        }
      } 	
    }   
   `
  )
  
  const autos = data.allAutosCsv.nodes;
  const marcas = data.allAutosCsv.distinct.map( marca => ({ value: marca, label: marca }) );


  
  const brand_selected = props.values.brand || "";
  const year_selected = props.values.year || undefined;
  const model_selected = props.values.model || "";
  const version_selected = props.values.version || "";
  
  
  let years = [];
  let versions = [];
  let models = [];

  // by brand
  const filtered_autos = [];
  const filtered = autos.forEach( (el, i)=>{
    if( el.Marca === brand_selected ){
      filtered_autos.push( el )
    }
  })

  // Years with price available
  filtered_autos.forEach( (el, i)=>{
    const years_props = ['_2007', '_2008', '_2009', '_2010', '_2011', '_2012', '_2013', '_2014', '_2015', '_2016', '_2017', '_2018', '_2019'];
    if( el.Marca === brand_selected ){
      models=[];
       Object.keys( el ).forEach( ( key )=>{
          if( years_props.includes( key ) ){
            if( parseInt( el[key] ) > 0 ){
              if( years.filter( e =>  e.value === key).length <= 0 ){
                let year = {
                  label: key.replace("_",""),
                  value: key
                }
                years.push( year )
              }
            }
          }
       })
    }
  })
  years.sort( (a, b) =>( a.label > b.label ? -1 : 0 ) )  

  // Models based on brand and year selected with price available
  if( years.length > 0 ){
    models = []
    filtered_autos.forEach( (el, i)=>{
      const years_props = [year_selected];
      if( el.Marca === brand_selected  ){
        // Filtering if element has price available 
        Object.keys( el ).forEach( ( key )=>{
            if( years_props.includes( key ) ){
              // Year field contain the price of the car
              if( parseInt( el[key] ) > 0 ){
                // If the year doesnt exists yet, create a new model
                if( models.filter( e =>  e.value === el.Modelo_ID).length <= 0 ){
                  let modelo   = {
                    label: el.Modelo,
                    value: el.Modelo_ID
                  }
                  models.push( modelo )
                }
              }
            }
         })
      }
    })
  }else{
    models = []
  }

  // Version based on model selectecion and price available

  if( models.length > 0 ){
    filtered_autos.forEach( (el, i)=>{
      const years_props = [ year_selected ];
      if( el.Marca === brand_selected  && el.Modelo_ID == model_selected ){
        // Filtering if element has price available 
        Object.keys( el ).forEach( ( key )=>{
            if( years_props.includes( key ) ){
              if( parseInt( el[key] ) > 0 ){

                // If the year doesnt exists yet, create a new model
                if( models.filter( e =>  e.value === el.Version_ID).length <= 0 ){
                  let version   = {
                    label: el.Version,
                    value: el.Version_ID
                  }
                  versions.push( version )
                }
              }
            }
         })
      }
    })
  }else{
    versions = [];
  }

  let budget = 0;
  if( versions.length > 0 ){
    console.log( 'presupuesto')
    filtered_autos.forEach( (el, i)=>{
      let years_props = [ year_selected ];
      if( el.Marca === brand_selected && el.Modelo_ID == model_selected && el.Version_ID === version_selected ){
        // Filtering if element has price available 
        Object.keys( el ).forEach( ( key )=>{
          if( years_props.includes( key ) ){
            if( year_selected === key  ){
              // Si tiene precio
              if( parseInt( el[key] ) > 0 ){
                console.log('elemento del presupuesto', el );
                console.log( 'precio', el[key] );
                budget = el[key];
              }
            }
          }
         })
      }
    })
  }

  
  


  const {  values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        } = props;
  return(
    <Form onSubmit={handleSubmit} >
      <Fieldset>
        <Field 
        name="brand" 
        label={"Marca"} 
        type="select" 
        onBlur={handleBlur} 
        component={FieldRow}
        options={marcas}
        onChange={handleChange}
        value={values.brand}
        {...props}
        />

        <Field 
        name="year" 
        label={"Año"} 
        onBlur={handleBlur}
        type="select" 
        component={FieldRow}
        disabled={ values.brand === '' }
        options={years}
        value={values.year}
        onChange={handleChange}
        {...props}
        />

        <Field 
        name="model" 
        label={"Modelo"} 
        onBlur={handleBlur}
        type="select" 
        component={FieldRow}
        disabled={ values.year === '' }
        options={models}
        onChange={handleChange}
        {...props}
        />

        <Field 
        name="version" 
        label={"Version"} 
        onBlur={handleBlur}
        type="select" 
        component={FieldRow}
        disabled={ values.model === '' }
        options={versions}
        onChange={handleChange}
        value={ version_selected || '' }
        {...props}
        />

        <Field 
        name="email" 
        label={"Email"} 
        onBlur={handleBlur}
        type="text" 
        component={FieldRow}
        disabled={ values.model === '' }
        onChange={handleChange}
        {...props}
        />

         <Field 
        name="phone" 
        label={"Telefono"} 
        onBlur={handleBlur}
        type="tel" 
        component={FieldRow}
        disabled={ values.model === '' }
        onChange={handleChange}
        {...props}
        />


        <Field
        name="budget"
        type="text"
        label="PRECIO DEL VEHICULO"
        value={budget}
        component={FieldRow}
        openOnLoad={true}
        {...props}
        />
        
        <Field 
        onBlur={handleBlur}
        type="submit" 
        component={FieldRow}
        isSubmitting={isSubmitting}
        />
          
      </Fieldset>  
    </Form>
  )
}

const FormComponentWrapper = formikForm(MyForm);


export default class FormComponent extends React.Component{
  state = {
    year: []
  };

  getYears = (val1, val2) => {
    console.log( val2)
  };

  render(){
    return (
        <FormComponentWrapper  brands={[]} 
                               years={this.state.year} 
                               getYears={this.getYears} 
                               />
    )
  }


}
