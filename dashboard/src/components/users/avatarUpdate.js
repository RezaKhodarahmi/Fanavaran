import React, { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { useDispatch } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateUserAvatar } from "../../actions/userActions";
import { t } from "i18next";
import Success from "../messages/success";
import Danger from "../messages/Danger";
const AvatarUpdate = (props) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState(null);
  const [err, setErr] = useState(null);
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  const handelImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  useEffect(() => {
    setUrl(props.avatar);
    setUser(props.user);
  }, [props.avatar]);
  const handelImageSubmit = (e) => {
    e.preventDefault();
    const imageRef = ref(storage, user);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
            dispatch(updateUserAvatar(props.id, url, token));
            setSuccess("Successfull!");
          })
          .catch((error) => {
            setErr("err geting image url");
          });
        setImage(null);
      })
      .catch((error) => {
        setErr(error.message);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <form onSubmit={handelImageSubmit}>
          <div
            className="card text-center align-middle"
            style={{ maxWidth: "150px" }}
          >
            <label aria-hidden="true" className="text-dark">
              {t("avatar")}
            </label>

            <div className="card-header">
             
              <img
                src={url}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              />
            </div>
            <div className="card-body">
              <input
                style={{ display: "inline-block" }}
                type="file"
                onChange={handelImageChange}
                accept="image/*"
                className="form-control form-control-sm"
                required
                
              />
            </div>
            <div className="card-footer">
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                
              >
                {t("update")}
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
      {success ? <Success /> : <></>}
      {err ? <Danger /> : <></>}
    </div>
  );
};

export default AvatarUpdate;
