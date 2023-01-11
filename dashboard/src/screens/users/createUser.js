import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "../../actions/userActions";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Success from "../../components/messages/success";
import Danger from "../../components/messages/Danger";
import { sendRegisterNotif } from "../../actions/mailActions";

const CreateUser = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  const form = useRef();
  const { status,error,message} = useSelector((state) => state.createUserNew);

  const initialState = {
    e_verification: "active",
    userName: "",
    email: "",
    userNicename: "",
    userUrl: "",
    avatar: "",
    userStatus: "1",
    role: "0",
    displayName: "",
    pwd: "",
    membership:"active",
    membership_acc:""
  };
  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isEmailInfo, setEmailInfo] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(createNewUser(formValues, token));
      if (isEmailInfo) {
        dispatch(
          sendRegisterNotif(form.current, env.MAILER_TEMPLATE_UPDATE_USER)
        );
      }
    }
  }, [formErrors]);
  
  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormValues((formValues) => {
      return {
        ...formValues,
        [name]: value,
      };
    });
  };
  const handelPwdGeneratoe = (e) => {
    var chars =
      "0123!@#$%^&*()456789abcde!@#$%^&*()fghijklmnopq123456789rstuvwxyz!@#$%^&*()ABCDEFGHI!@#$%^&*()JKLMNOPQR123456789STUVWXYZ";
    var passwordLength = 12;
    var password = "";
    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    setFormValues((formValues) => {
      return {
        ...formValues,
        pwd: password,
      };
    });
  };
  const handelCreate = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  const validate = (values) => {
    const errors = {};
    const urlEx =
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    const regexUserName = /^[a-zA-Z]*$/;
    const regexUserNic = /^[a-zA-Z\s]*$/;
    const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const PasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    if (!values.userName) {
      errors.userName = "Username is require";
    } else if (!regexUserName.test(values.userName)) {
      errors.userName = "Only a-z or A-Z character";
    }
    if (!values.email) {
      errors.email = t("email-required");
    } else if (!EmailRegex.test(values.email)) {
      errors.email = t("not-valid-email");
    }
    if (!regexUserNic.test(values.userNicename)) {
      errors.userNicename = "Not valid Nicname";
    }
    if (!values.e_verification) {
      errors.e_verification = "Verify Email is require";
    } else if (!regexUserName.test(values.e_verification)) {
      errors.e_verification = "Not valid verify status";
    } else if (values.e_verification != "active") {
      if (values.e_verification != "inactive") {
        errors.e_verification = "Not valid verify status555";
      }
    }
    if (!values.displayName) {
      errors.displayName = "Display Name is required";
    } else if (!regexUserNic.test(values.displayName)) {
      errors.displayName = "Not valid Display Name";
    }
    if (values.userUrl) {
      if (!urlEx.test(values.userUrl)) {
        errors.userUrl = "Invalid URL";
      }
    }
    if (!values.role) {
      errors.role = "Role is require";
    } else if (values.role != "0") {
      if (values.role != "1") {
        if (values.role != "2") {
          errors.role = "Not valid Role";
        }
      }
    }
    if (!values.userStatus) {
      errors.userStatus = "User Status is require";
    } else if (values.userStatus != "0") {
      if (values.userStatus != "1") {
        errors.userStatus = "Not valid Status";
      }
    }

    if (!values.pwd) {
      errors.pwd = "Password is required";
    } else if (!PasswordRegex.test(values.pwd)) {
      errors.pwd = "Weak password![1-9,A-Z,a-z,*/&^%$#@!]";
    }

    return errors;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1>{t("add-new-user")}</h1>
        </div>
      </div>
      <Form ref={form} onSubmit={handelCreate}>
        <div className="row">
          <Col sm="6" md="6" className="px-5 d-inline-block">
            <Form.Label htmlFor="username">{t("username")}</Form.Label>
            <Form.Control
              className={formErrors.userName ? "is-invalid" : ""}
              id="username"
              type="text"
              name="userName"
              value={formValues.userName}
              onChange={handelChange}
            />
            <span className="validate-error">{formErrors.userName}</span>
          </Col>

          <Col sm="6" md="6" className="px-5 d-inline-block">
            <Form.Label htmlFor="email">{t("email")}</Form.Label>
            <Form.Control
              className={formErrors.email ? "is-invalid" : ""}
              id="email"
              type="text"
              name="email"
              value={formValues.email}
              onChange={handelChange}
            />
            <span className="validate-error">{formErrors.email}</span>
          </Col>
          <Col sm="6" md="6" className="px-5 d-inline-block">
            <Form.Label htmlFor="email_verification">
              {t("verify-email")}
            </Form.Label>
            <Form.Select
              className={formErrors.e_verification ? "is-invalid" : ""}
              name="e_verification"
              value={formValues.e_verification}
              onChange={handelChange}
            >
              <option value="inactive">{t("not-active")}</option>
              <option value="active">{t("active")}</option>
            </Form.Select>
            <span className="validate-error">{formErrors.e_verification}</span>
          </Col>
          <Col sm="6" md="6" className="px-5 d-inline-block">
            <Form.Label htmlFor="display-name">{t("display-name")}</Form.Label>
            <Form.Control
              className={formErrors.displayName ? "is-invalid" : ""}
              id="display-name"
              type="text"
              name="displayName"
              value={formValues.displayName}
              onChange={handelChange}
            />
            <span className="validate-error">{formErrors.displayName}</span>
          </Col>
          <Col sm="6" md="6" className="px-5 d-inline-block">
            <Form.Label htmlFor="nicname">{t("nicname")}</Form.Label>
            <Form.Control
              className={formErrors.userNicename ? "is-invalid" : ""}
              id="nicname"
              type="text"
              name="userNicename"
              value={formValues.userNicename}
              onChange={handelChange}
            />
            <span className="validate-error">{formErrors.userNicename}</span>
          </Col>

          <Col sm="6" md="6" className="px-5 d-inline-block">
            <Form.Label htmlFor="url">{t("url")}</Form.Label>
            <Form.Control
              className={formErrors.userUrl ? "is-invalid" : ""}
              id="url"
              type="text"
              name="userUrl"
              value={formValues.userUrl}
              onChange={handelChange}
            />
            <span className="validate-error">{formErrors.userUrl}</span>
          </Col>
          <Col sm="6" md="6" className="px-5 d-inline-block">
            <Form.Label htmlFor="role">{t("role")}</Form.Label>
            <Form.Select
              name="role"
              className={formErrors.role ? "is-invalid" : ""}
              value={formValues.role}
              onChange={handelChange}
            >
              <option value="0">{t("user")}</option>
              <option value="2">{t("instructor")}</option>
              <option value="1">{t("manager")}</option>
            </Form.Select>
            <span className="validate-error">{formErrors.role}</span>
          </Col>
          <Col sm="6" md="6" className="px-5 d-inline-block">
            <Form.Label htmlFor="status">{t("status")}</Form.Label>
            <Form.Select
              name="userStatus"
              className={formErrors.userStatus ? "is-invalid" : "valid"}
              value={formValues.userStatus}
              onChange={handelChange}
            >
              <option value="0">{t("not-active")}</option>
              <option value="1">{t("active")}</option>
            </Form.Select>
            <span className="validate-error">{formErrors.userStatus}</span>
          </Col>
          <Col sm="6" md="6" className="px-5 d-inline-block">
            <Form.Label htmlFor="membership">{t("membership")}</Form.Label>
            <Form.Select
              name="membership"
              className={formErrors.membership ? "is-invalid" : "valid"}
              value={formValues.membership}
              onChange={handelChange}
            >
              <option value="0">{t("not-active")}</option>
              <option value="1">{t("active")}</option>
            </Form.Select>
            <span className="validate-error">{formErrors.membership}</span>
          </Col>
          <Col sm="6" md="6" className="px-5 d-inline-block">
            <Form.Label htmlFor="membership_acc">{t("membership-access")}</Form.Label>
            <Form.Control
              name="membership_acc"
              className={formErrors.membership_acc ? "is-invalid" : "valid"}
              value={formValues.membership_acc}
              onChange={handelChange}
              type="date"
            />
            <span className="validate-error">{formErrors.membership_acc}</span>
          </Col>
          <Col sm="6" md="6" className="px-5 d-inline-block">
            <Form.Label htmlFor="pwd">{t("password")}</Form.Label>
            <div className="d-flex">
              <Form.Control
                className={formErrors.pwd ? "is-invalid" : ""}
                name="pwd"
                id="pwd"
                type="text"
                value={formValues.pwd}
                onChange={handelChange}
              />
              <a
                onClick={(e) => handelPwdGeneratoe(e)}
                className="btn btn-primary btn-sm"
              >
                {t("generate")}
              </a>
            </div>

            <span className="validate-error">{formErrors.pwd}</span>
          </Col>
          <Col sm="6" md="6" className="px-5 d-inline-block">
            <Form.Label htmlFor="sendEmail">{t("sendEmail")}</Form.Label>
            <Form.Check
              name="sendEmail"
              type="checkbox"
              label={t("sendEditInfo")}
              onChange={(e) => setEmailInfo(e.target.checked)}
            />
          </Col>

          <Col sm="12" className=" w-100">
            <button className="btn btn-primary" type="submit">
              {t("create")}
            </button>
          </Col>
        </div>
      </Form>
      {status ? <Success message="User created successfully!" /> : <></>}
      {error ? <Danger  message={message}/> : <></>}
    </div>
  );
};

export default CreateUser;
