import Header from '../../header/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './singup.css'
import { useNavigate } from 'react-router-dom';
import { urlHome } from '../../api/Product';

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
    <h1>Signup / <Link to={'/singin'}>login </Link> </h1>
    <Login /> 
    <Formik
      initialValues={{
        name: '', 
        email: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
         
        // axios.post(urlHome+'/api/v1/users/register', values)
        // .then((response) => {
        //   console.log(response);
        //   user.setUser(
        //     response.data  
        //   )
        //   navigate('/');
        // }, (error) => {
        //   console.log(error);
        // });
        // with fix Singup.js:54          POST http://localhost:5000/api/v1/users/register 500 (Internal Server Error)
        // axios.post(urlHome+'/api/v1/users/register', values)
        // .then((response) => {
        //   console.log(response);
        //   // check user create in db 
        //   if (response.data._id) {
        //     user.setUser(
        //       response.data
        //     )
        //     navigate('/');
        //   }

        // }, (error) => {
        //   console.log(error);
        // });
        
        axios.post(urlHome+'/api/v1/users/register', values)
        .then((response) => {
          console.log(response);
          // check user create in db 
          if (response.data._id) {
            user.setUser(
              response.data
            )
            navigate('/');
          }
           console.log(response + 'response');

        }
        );

        

 

      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="name"  placeholder='Enter your name' />
          {errors.name && touched.name ? (
            <div>{errors.name}</div>
          ) : null} 
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