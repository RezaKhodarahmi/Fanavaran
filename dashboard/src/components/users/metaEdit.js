import React from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserMeta } from "../../actions/userActions";
import { useTranslation } from "react-i18next";
import Success from "../messages/success";
import Danger from "../messages/Danger";
const MetaEdit = (props) => {
  var {success,err} = useSelector(state=>state.updatedUserMeta);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(updateUserMeta(data, props.userID, props.token));
    

  
  };

  // console.log(watch("example")); // watch input value by passing the name of it
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      {props.data?.map((item) => (
        <div key={item.meta_key} className="col-6 px-5 d-inline-block">
          <Form.Label htmlFor={item.meta_key}>
            {t(`${item.meta_key}`)}
          </Form.Label>
          <Form.Control
            defaultValue={item.meta_value}
            id={item.meta_key}
            className="form-control"
            {...register(`${item.meta_key}`, { required: false })}
          />
        </div>
      ))}
      <div className="col-12 px-5 d-inline-block">
        <button type="submit" className="btn btn-primary">
          {t("update")} 
        </button>
      </div>
    </form>
    {
      success? (<Success  message="Meta updated succesfuly!"/>):(<p></p>)
    }
    {
      err? (<Danger message="Error was happend!" />):(<p></p>)
    }
    </>
  );
};

export default MetaEdit;
