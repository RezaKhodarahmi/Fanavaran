import React, { useState, useRef, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import { DownloadTableExcel } from "react-export-table-to-excel";
import Loading from "../../components/Loading";
const List = React.lazy(() => import("../../components/users/List"));

const Users = () => {
  const { t } = useTranslation();
  const tableRef = useRef(null);
  const [searchBox, setsearchBoxText] = useState("");
  const [showNumber, setShowNumber] = useState("15");

  let inputHandler = (e) => {
    //Convert input text to lower case
    var search = e.target.value.toLowerCase();
    //Remove space
    search = search.replace(/\s+/g, "");
    //Set State
    setsearchBoxText(search);
  };
  return (
    <div>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-12 ">
            <h1>{t("users")}</h1>
          </div>
          <Suspense fallback={<Loading />}>
            <div className="col-sm-3 col-md-6 mb-3">
              <Form.Label htmlFor="inputPassword5">{t("search")}</Form.Label>
              <Form.Control
                type="text"
                id="search"
                aria-describedby="search"
                onChange={inputHandler}
                placeholder={t("search-placeholder")}
              />
            </div>
            <div className="col-sm-3 col-md-6 mb-3">
              <Form.Label htmlFor="inputPassword5">
                {t("show-number")}
              </Form.Label>
              <select
                className="form-select"
                onChange={(e) => setShowNumber(e.target.value)}
              >
                <option value="5">5</option>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="col-6 align-middle">
              <DownloadTableExcel
                filename="users table"
                sheet="users"
                currentTableRef={tableRef.current}
              >
                <button className="btn btn-success"> Export excel </button>
              </DownloadTableExcel>
            </div>
            <div className="col-sm-12 col-md-12 ">
              <div className="table-responsive">
                <table
                  className="table table-striped table-dark"
                  id="table"
                  ref={tableRef}
                >
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">{t("username")}</th>
                      <th scope="col">{t("email")}</th>
                      <th scope="col">{t("verify-email")}</th>
                      <th scope="col">{t("created-at")}</th>
                      <th scope="col">{t("edit")}</th>
                      <th scope="col">{t("delete")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <List showNumber={showNumber} search={searchBox} />
                  </tbody>
                </table>
              </div>
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Users;
