import React, { useRef, useState, useEffect, Suspense } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { authLogin } from "../actions/authActions";
import Loading from "../components/Loading";
import env from "react-dotenv";
import Form from "react-bootstrap/Form";

// ** Third Party Components
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee, X } from 'react-feather'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Input,
  Label,
  Alert,
  Button,
  CardText,
  CardTitle,
  FormFeedback,
  UncontrolledTooltip
} from 'reactstrap'

// ** Illustrations Imports
import source from '../assets/images/pages/login-v2.svg'

// ** Styles
import '../core/scss/react/pages/page-authentication.scss'

const ReCaptchaV2 = React.lazy(() => import("react-google-recaptcha"));
const Login = () => {
  //Use state variable
  const { loading, status } = useSelector((state) => state.user);
  const emailRef = useRef();
  const errRef = useRef();

  //Use Multiple language
  const { t } = useTranslation();
  const initialValues = { email: "", password: "", token: null };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const dispatch = useDispatch();
  //Set page title
  useEffect(() => {
    document.title = t("login-title");
    emailRef.current.focus();
  }, []);
  //Send form to server
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit && formValues.token) {
      dispatch(authLogin(formValues.email, formValues.password));
    }
  }, [formErrors]);
  //Handel form submit
  const handelSubmit = async (e) => {
    e.preventDefault();
    //Use form validation function
    setFormErrors(validate(formValues));
    //The form can be submitted
    setIsSubmit(true);
  };
  //Handel callback errors from server
  useEffect(() => {
    console.log(status);
    switch (status) {
      case 400:
        return setErrMsg(t("invalid-username-password"));
      case 500:
        return setErrMsg(t("server-error"));
      case 401:
        return setErrMsg(t("unauthorized"));
      case 403:
        return setErrMsg(t("forbidden"));
      default:
        setErrMsg("");
    }
  }, [status]);
  //Handel form input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };
  //Form validation function
  const validate = (values) => {
    const errors = {};
    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = t("email-required");
    } else if (!EmailRegex.test(values.email)) {
      errors.email = t("not-valid-email");
    }
    if (!values.password) {
      errors.password = t("password-required");
    }
    if (!values.token) {
      errors.token = t("im-not-robot");
    }
    return errors;
  };
  const handleToken = (token) => {
    setFormValues((formValues) => {
      return { ...formValues, token };
    });
  };
  const handleExpire = () => {
    setFormValues((formValues) => {
      return { ...formValues, token: null };
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="auth-wrapper auth-cover">
          <Row className='auth-inner m-0'>
            {/* Logo */}
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <img src="assets/images/Fanavaran_logo.png" alt="Fanavaran Main Logo" className="img-fluid" />
            </Link>

            {/* Side Left */}
            <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
              <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                <img className='img-fluid' src={source} alt='Login Cover' />
              </div>
            </Col>

            {/* Side Right */}
            <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
              <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                {/* Title and Desc */}
                <CardTitle tag='h2' className='fw-bold mb-1'>
                  Welcome to Fanavaran LMS
                </CardTitle>
                <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>

                {/* Alert */}
                {errMsg ? (
                  <span ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                    <Alert color='danger'>
                      <div className='alert-body font-small-2'>
                        <p>
                          <small className='me-50'>
                            <span className='fw-bold'>{errMsg}</span>
                          </small>
                        </p>
                      </div>

                      <HelpCircle
                        id='login-tip'
                        className='position-absolute'
                        size={18}
                        style={{ top: '10px', right: '10px' }}
                      />
                      
                      <UncontrolledTooltip target='login-tip' placement='left'>
                        For any questions contact support
                      </UncontrolledTooltip>
                    </Alert>
                  </span>
                ) : (
                  <span></span>
                )}

                {/* Form */}
                <Form className='auth-login-form mt-2' onSubmit={handelSubmit}>

                  {/* Username field */}
                  <div className='mb-1'>
                    <Label className='form-label' for='email'>{t("email")}</Label>
                    <Form.Control
                      type="text"
                      className={formErrors.email? "is-invalid":""}
                      id="email"
                      name="email"
                      ref={emailRef}
                      autoComplete="off"
                      value={formValues.email}
                      onChange={handleChange}
                    />
                    <p className="validate-error">{formErrors.email}</p>
                  </div>
                  
                  {/* Password */}
                  <div className='mb-1'>
                    <div className='d-flex justify-content-between'>
                      <Label className='form-label' for='password'>
                        Password
                      </Label>
                      <Link to='/forgot-password'>
                        <small>Forgot Password?</small>
                      </Link>
                    </div>

                    <Form.Control
                      type="password"
                      className={formErrors.password? "is-invalid":""}
                      id="password"
                      name="password"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                    <p className="validate-error">{formErrors.password}</p>
                  </div>

                  {/* Recaptcha */}
                  <div className="mb-1">
                    <div className="col-12 text-center">
                      <Suspense callback={<label className="text-light">Loading...</label>}>
                        <ReCaptchaV2
                          sitekey={env.RECAPTCHA_SITE_KEY}
                          onChange={handleToken}
                          onExpire={handleExpire}
                        />
                      </Suspense>
                    </div>

                    <p className="validate-error">{formErrors.token}</p>
                  </div>

                  {/* Remember me */}
                  <div className='form-check mb-1'>
                    <Input type='checkbox' id='remember-me' />
                    <Label className='form-check-label' for='remember-me'>{t("remember-me")}</Label>
                  </div>

                  <Button type='submit' color='primary' block>{t("login-title")}</Button>

                </Form>
              </Col>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Login;
