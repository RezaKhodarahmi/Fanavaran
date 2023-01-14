import React, { useRef, useState } from "react";
import env from "react-dotenv";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Mail from "../components/Mail";
import { useDispatch } from "react-redux";
import { sendRegisterNotif } from "../actions/mailActions";
// Components
import BarChart from "../components/charts/BarChart";
import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
// Data
import { UserData } from "../Data";

const Dashboard = () => {
  // Charts
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "#675ed6",
          "#826af9",
          "#d2b0ff",
          "#f8d3ff",
          "#7b6ff1",
        ],
        borderColor: "black",
        borderWidth: 0,
      },
    ],
  });

  //
  const { t } = useTranslation();
  const form = useRef();
  const dispatch = useDispatch();

  const sendEmail = (e) => {
    e.preventDefault();
    dispatch(sendRegisterNotif(form.current, "template_3h0ec5n"));
  };
  return (
    <>
      <div className="row">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">
              <Link to="/">{t("dashboard")}</Link>
            </li>
          </ol>
        </nav>
      </div>

      <div className="row mb-3">
        <div className="col-12 col-sm-6 col-md-4">
          <div className="container-fluid"><BarChart chartData={userData}/></div>
        </div>

        <div className="col-12 col-sm-6 col-md-4">
          <div className="container-fluid"><PieChart chartData={userData}/></div>
        </div>

        <div className="col-12 col-sm-6 col-md-4">
          <div className="container-fluid"></div>
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
          <div className="container-fluid"><LineChart chartData={userData}/></div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
