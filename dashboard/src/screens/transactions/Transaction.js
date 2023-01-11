import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Transaction = () => {
  const { t } = useTranslation();
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">
            <Link to="/">{t("dashboard")}</Link>
          </li>
        </ol>
      </nav>

      <div className="container-fluid mt-3">
        <h1>{t("transactions")}</h1>
<div className="row">
    <div className="col-12">
         <button className="btn btn-success btn-sm">{t("create")}</button>
    </div>
</div>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">{t("user")}</th>
              <th scope="col">{t("order-number")}</th>
              <th scope="col">{t("date")}</th>
              <th scope="col">{t("status")}</th>
              <th scope="col">{t("total")}</th>
              <th scope="col">{t("edit")}</th>
              <th scope="col">{t("delete")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>55884</td>
              <td>Jan 5, 2023</td>
              <td>
                <span class="badge bg-success">Completed</span>
              </td>
              <td>358$</td>
              <td>
                <button className="btn btn-success btn-sm">{t("edit")}</button>
              </td>
              <td>
                <button className="btn  btn-sm btn-danger">
                  {t("delete")}
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Mark</td>
              <td>558854</td>
              <td>Jan 5, 2023</td>
              <td>
                <span class="badge bg-secondary">Pending payment</span>
              </td>
              <td>288$</td>
              <td>
                <button className="btn btn-success btn-sm">{t("edit")}</button>
              </td>
              <td>
                <button className="btn btn-sm btn-danger">
                  {t("delete")}
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Ali</td>
              <td>558384</td>
              <td>Jan 5, 2023</td>
              <td>
                <span class="badge bg-success">Completed</span>
              </td>
              <td>458$</td>
              <td>
                <button className="btn btn-success btn-sm">{t("edit")}</button>
              </td>
              <td>
                <button className="btn  btn-sm btn-danger">{t("delete")}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Transaction;
