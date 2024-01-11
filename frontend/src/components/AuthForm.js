// import { useState } from 'react';
import { Form, Link, useSearchParams, useActionData, useNavigation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import classes from './AuthForm.module.css';

function AuthForm() {
  // const [isLogin, setIsLogin] = useState(true);
  // function switchAuthHandler() {
  //   setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  // }

  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const isSubmitting = navigation.state === 'submitting';
  

  const onSubmit = () => {
    console.log(data);
  }

  const formik = useFormik({
    initialValues: {
      email: '', password: '',
    },
    onSubmit,
    validationSchema: yup.object().shape({
      email: yup.string().email('Invalid email').required('Required'),
      password: yup.string().min(6, 'Must Be 6 Characters Long').required('Required')
    }),
  })

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {data && data.errors && <ul>
          {Object.values(data.errors).map((item)=>(
            <li key={item}>{item}</li>
          ))}
          </ul>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.email && formik.touched.email && <span>{formik.errors.email}</span>}
          {data && data.errors && <span>{data.errors.email}</span>}
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.errors.password && formik.touched.password && <span>{formik.errors.password}</span>}
          {data && data.errors && <span>{data.errors.password}</span>}
        </p>
        <div className={classes.actions}>
          {/* <button onClick={switchAuthHandler} type="button">
            {isLogin ? 'Create new user' : 'Login'}
          </button> */}

          <Link to={`?mode=${ isLogin ? 'signup' : 'login' }`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
