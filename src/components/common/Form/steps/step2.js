import React from 'react';

import { Field } from 'formik';
import FieldRow from '../items/FieldRow';


const Step2 = props =>{
    const {  values,
      handleChange,
      handleBlur
    } = props;
    return (
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
    )
  }

  export default Step2