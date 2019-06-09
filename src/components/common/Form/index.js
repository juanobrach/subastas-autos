import React from 'react';
import styled from 'styled-components';
import { Formik, Field } from 'formik';


import {Step1, Step2 } from './steps';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const required = value => (value ? undefined : "Ruerido");

const Error = ({ name }) => (
  <Field
    name={name}
    render={({ form: { touched, errors } }) =>
      touched[name] && errors[name] ? <span>{errors[name]}</span> : null
    }
  />
);

const WizardSteps = styled.div`
    ul{
      list-style-type:none;
      padding:0;
      display:flex;
      justify-content: start;
      margin: 2em 0;
      li{
        position:relative;
        :nth-child(2),
        :nth-child(3){
          margin-left:10%;
          &:after{
            position: absolute;
            content: "";
            background: white;
            height: 2px;
            width: 6.2vw;
            right: calc(100% + 10%);
            top: 10px;
            border-radius: 25px;
            opacity:.7
          }
        }
      }
    }
`

const Step = styled.li`
    opacity: ${ props => props.isActive ? 1 : .5}
`


class Wizard extends React.Component{

  static Page = ({ children, parentState }) => {
    return children(parentState);
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues
    };
  }

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }));

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }));

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  handleSubmit = (values, bag) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values, bag);
    } else {
      this.next(values);
      bag.setSubmitting(false);
    }
  };

  render(){
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    console.log('active page',activePage);
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Formik
      initialValues={values}
      enableReinitialize={false}
      validate={this.validate}
      onSubmit={this.handleSubmit}
      render={props => (
        <div className="formWrapper">
          <WizardSteps>
            <ul>
              {
                [{ label:'Cotiza tu auto', key:0}, { label:'Agenda tu inspeccion', key:1}, {label:'Confirmacion', key:2}].map( ( step ) =>{
                   const isActive = ( step.key <= parseInt( activePage.key.replace('.','') ) ? true : false );
                    return <Step isActive={isActive}> (1) {step.label}</Step>
                })
              }
            </ul>
          </WizardSteps>
          <form onSubmit={props.handleSubmit}>
            {React.cloneElement(activePage, { parentState: { ...props } })}
            <div className="buttons">
              {page > 0 && (
                <button type="button" onClick={this.previous}>
                  « Previous
                </button>
              )}

              {!isLastPage && <button type="submit">Next »</button>}
              {isLastPage && (
                <button type="submit" disabled={props.isSubmitting}>
                  Submit
                </button>
              )}
            </div>

          </form>
        </div>
      )}
    />
    )
  }


}

const FormComponent = () =>(
  <Wizard
      initialValues={{
        brand: "",
        year: "",
        model: "",
        version: "",
        email: ""
      }}
      onSubmit={(values, actions) => {
        sleep(300).then(() => {
          window.alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        });
      }}
    >
      <Wizard.Page
       validate={values => {
        const errors = {};
        if (!values.brand) {
          errors.brand = "requerido";
        }
        return errors;
      }}
      >
        { (props)=>(
          <Step1 {...props} />
        )
      }</Wizard.Page>
            <Wizard.Page >
        { (props)=>(
          <Step2 {...props} />
        )
      }</Wizard.Page>
    </Wizard>
)

export default FormComponent
