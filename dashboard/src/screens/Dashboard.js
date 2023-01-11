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

      <div className="container-fluid">Dashboard</div>

      <div className="container-fluid mt-3">
        <h1>Form</h1>

        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>

          <div className="mb-3">
            <label for="formFile" className="form-label">
              Default file input example
            </label>
            <input className="form-control" type="file" id="formFile" />
          </div>

          <div className="mb-3">
            <label for="exampleColorInput" className="form-label">
              Color picker
            </label>
            <input
              type="color"
              className="form-control form-control-color"
              id="exampleColorInput"
              value="#563d7c"
              title="Choose your color"
            />
          </div>

          <div className="mb-3">
            <select className="form-select" aria-label="Default select example">
              <option selected="">Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      <div className="container-fluid mt-3">
        <h1>Table</h1>

        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
