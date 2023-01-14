import React, { useRef } from "react";
import env from "react-dotenv";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Mail from "../components/Mail";
import { useDispatch } from "react-redux";
import { sendRegisterNotif } from "../actions/mailActions";

const Dashboard = () => {
  const { t } = useTranslation();
  const form = useRef();
  const dispatch = useDispatch();

  const sendEmail = (e) => {
    e.preventDefault();
    dispatch(sendRegisterNotif(form.current, "template_3h0ec5n"));
  };
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">
            <Link to="/">{t("dashboard")}</Link>
          </li>
        </ol>
      </nav>

      <div className="row mb-3">
        <div className="col-12 col-sm-6 col-md-4">
          <div className="container-fluid">CHART</div>
        </div>

        <div className="col-12 col-sm-6 col-md-4">
          <div className="container-fluid">CHART</div>
        </div>

        <div className="col-12 col-sm-6 col-md-4">
          <div className="container-fluid">CHART</div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12 col-sm-6 col-md-6">
          <div className="container-fluid">CHART</div>
        </div>

        <div className="col-12 col-sm-6 col-md-6">
          <div className="container-fluid">CHART</div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-12">
          <div className="container-fluid">CHART</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
