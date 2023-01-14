import React from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUserMeta } from "../../actions/userActions";
import { useTranslation } from "react-i18next";
import Success from "../messages/success"
import Danger from "../messages/Danger"

const CreateMeta = (props) => {

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(createUserMeta(data, props.user, props.token));
  
  };

  const dispatch = useDispatch();
  const { success,err, loading } = useSelector((state) => state.crateUserMeta);
  const regexstring = /^[a-zA-Z\s]*$/;
  const regexnumber = /^\d+$/;
const regexAdderss = /^[a-zA-Z0-9\s,'-]*$/
  return (
    <>
      {loading ? (
        <div className="col-12 text-center">
          <div
            class="spinner-border text-warning"
            style={{ width: "4rem", height: "4rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-6 px-5 d-inline-block">
              <Form.Label htmlFor="name">{t("name")}</Form.Label>
              <Form.Control
                id="name"
                className="form-control"
                {...register("name", { required: false,validate:value=>regexstring.test(value)  })}
              />
              <span className="validate-error">{errors.name? "Only valid characters":""}</span>
            </div>
            <div className="col-6 px-5 d-inline-block">
              <Form.Label htmlFor="lname">{t("lname")}</Form.Label>
              <Form.Control
                id="lname"
                className={errors.lname? "is-invalid":""}
                {...register("lname", {required:false, validate:value=>regexstring.test(value) })}
              />
              <span className="validate-error">{errors.lname? "Only valid characters":""}</span>
            </div>
            <div className="col-6 px-5 d-inline-block">
              <Form.Label htmlFor="phone">{t("phone")}</Form.Label>
              <Form.Control
                id="phone"
                className="form-control"
                {...register("phone", { required: false,validate:value=>regexnumber.test(value)})}
              />
              <span className="validate-error">{errors.phone? "Only valid characters":""}</span>

            </div>
            <div className="col-6 px-5 d-inline-block">
              <Form.Label htmlFor="mobile">{t("mobile")}</Form.Label>
              <Form.Control
                id="mobile"
                className="form-control"
                {...register("mobile", { required: false,validate:value=>regexnumber.test(value) })}
              />
              <span className="validate-error">{errors.mobile? "Only valid characters":""}</span>
            </div>
            <div className="col-6 px-5 d-inline-block">
              <Form.Label htmlFor="address">{t("address")}</Form.Label>
              <Form.Control
                id="address"
                className="form-control"
                {...register("address", { required: false,validate:value=>regexAdderss.test(value)  })}
              />
              <span className="validate-error">{errors.address? "Only valid characters":""}</span>
            </div>
            <div className="col-12 px-5 d-inline-block">
              <button type="submit" className="btn btn-primary">
                {t("create")}
              </button>
            </div>
          </form>
          {success ? <Success message="User meta created successfuly!" /> : <></>}
          {err ? <Danger message="Error was happend!"/> : <></>}
        </div>
      )}
    </>
  );
};

export default CreateMeta;
