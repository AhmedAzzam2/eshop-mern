import Header from '../../header/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { urlHome } from '../../api/Product';

import './singup.css'
import { useNavigate } from 'react-router-dom';

import React, { useContext } from 'react';
import {ThemeContext} from '../../App';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import Login from '../../Components/google';



const SignupSchema = Yup.object().shape({
  name: Yup.string() , 
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export const ValidationSchemaExample = () => {

  const user = useContext(ThemeContext);
  const navigate = useNavigate();

  if (user.user !=null) {
    navigate('/');
  }
 

  return (
  <div>
    <h1><Link to={'/singup'}>singup </Link> / login </h1>
    <Login /> 
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        // same shape as initial values
        
        // axios.post(urlHome+'/api/v1/users/login', values)
        // .then((response) => {
        //   console.log(response);
        //   user.setUser(
        //     response.data  
        //   )
        //   navigate('/');
        // }, (error) => {
        //   console.log(error);
        // });
        fetch(urlHome+'/api/v1/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          user.setUser(
            data  
          )
          navigate('/');
        })
        .catch((error) => {
          console.error('Error:', error);
        }); 
        
 

      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="email" type="email"  placeholder='Enter your email' />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <Field name="password" type="password"  placeholder='Enter your password' />
          {errors.password && touched.password ? <div>{errors.password}</div> : null}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
  );
}

function Singup() {
  return (
    <div>
      <Header />
      <div className="form"> 
      <ValidationSchemaExample/>
      </div>
    </div>
  );
}


export default Singup;