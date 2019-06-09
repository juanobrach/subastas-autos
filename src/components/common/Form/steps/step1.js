import React from 'react';
import { useStaticQuery, graphql } from "gatsby"

import { Formik, Field } from 'formik';
import FieldRow from '../items/FieldRow';
import styled from 'styled-components';

import {
    Fieldset
  } from '../style';


const Step1 = props => {
    console.log( 'props myForm', props )
  
    const Grid = styled.div`
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      grid-gap: 15%;
  
      @media (max-width: ${props => props.theme.screen.md}) {
        grid-template-columns: 1fr;
        grid-gap: 15px;
  
        > ${Art} {
          order: 0;
        }
  
        > ${Text} {
          h1{
            font-size:12px;
          }
        }
  
      }
    `;
    const Art = styled.figure`
      width: 100%;
      margin: 0;
  
      @media (max-width: ${props => props.theme.screen.md}) {
        .gatsby-image-wrapper{
          display:none;
        }
      }
  
      > div {
        width: 120%;
        margin-bottom: -4.5%;
  
        h1{
          color:white;
        }
        @media (max-width: ${props => props.theme.screen.md}) {
          width: 100%;
          h1{
            font-size:1rem;
            line-height: 1;
          }
          img{
            display:none;
          }
        }
      }
    `;
    const Text = styled.div`
      justify-self: center;
      color:white;
      @media (max-width: ${props => props.theme.screen.md}) {
        justify-self: start;
        line-height: 1;
      }
      h1{
        font-weight:bold;
      }
    `;
  
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
    autos.forEach( (el, i)=>{
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
        if( el.Marca === brand_selected  && el.Modelo_ID === model_selected ){
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
        if( el.Marca === brand_selected && el.Modelo_ID === model_selected && el.Version_ID === version_selected ){
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
          console.log('values',props)
    return(
        <Grid>
           <Art>
            <Text>
              <h1>
              Cotiza tu auto ahora 
              <br />
              y vendelo de forma segura en mas de 30 agencias y concesionarios a la vez.
              </h1>
              <br />
            </Text>
          </Art>  
          <Fieldset>
            <Field 
            name="brand" 
            label={"Marca"} 
            type="select" 
            onBlur={handleBlur} 
            component={FieldRow}
            options={marcas}
            onChange={handleChange}
            value={brand_selected}
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
        </Grid>
    )
  }

export default Step1