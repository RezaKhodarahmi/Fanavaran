import React, { useRef, useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { authLogin } from "../actions/authActions";
import Loading from "../components/Loading";
import env from "react-dotenv";
import Form from "react-bootstrap/Form";

const ReCaptchaV2 = React.lazy(() => import("react-google-recaptcha"));
const Login = () => {
  //Use state variable
  const { loading, status } = useSelector((state) => state.user);
  const emailRef = useRef();
  const errRef = useRef();
  //Use Multiplie language
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
        <div
          className="login-form-container text-center s"
          style={{ width: "100%", height: "100vh" }}
        >
          <main className="form-signin w-100 mx-auto pt-5">
            <form onSubmit={handelSubmit}>
              <img
                className="img-fluid w-50 mb-4"
                style={{ maxWidth: "100px" }}
              ></img>
              <h1 className="h3 mb-3 fw-normal">{t("login-title")}</h1>

              <div className="form-floating">
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
                <Form.Label htmlFor="email">{t("email")}</Form.Label>
              </div>
              <p className="validate-error">{formErrors.email}</p>
              <div className="form-floating">
                <Form.Control
                  type="password"
                  className={formErrors.password? "is-invalid":""}
                  id="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
                <Form.Label htmlFor="password">{t("password")}</Form.Label>
              </div>
              <p className="validate-error">{formErrors.password}</p>

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
              <div className="checkbox mb-3">
                <label>
                  <input type="checkbox" value="remember-me" />
                  {t("remember-me")}
                </label>
              </div>
              <button className="w-100 btn btn-lg btn-primary">
                {t("login-title")}
              </button>
              <div className="mt-4">
                {errMsg ? (
                  <span
                    style={{
                      backgroundColor: "red",
                      color: "#fff",
                      padding: "3px",
                      borderRadius: "3px",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                  >
                    {errMsg}
                  </span>
                ) : (
                  <span></span>
                )}
              </div>
              <p className="mt-5 mb-3 text-muted">&copy; 2022–2023</p>
            </form>
          </main>
        </div>
      )}
    </>
  );
};

export default Login;
