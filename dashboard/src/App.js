import React, { useEffect } from "react";
import "./assets/style/App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./custom";
//Start multilanguage Dep
import i18n from "i18next";
import cookies from "js-cookie";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
//Start multilanguage Dep
import Users from "./screens/users/Users";
import Dashboard from "./screens/Dashboard";
import Sidebar from "./screens/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import Login from "./screens/Login";
import UserEdit from "./screens/users/userEdit";
import { checkToken } from "./actions/authActions";
import Loading from "./components/Loading";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css confirm alert
import CreateUser from "./screens/users/createUser";
import Courses from "./screens/courses/courses";
import EditCourse from "./screens/courses/editCourse";
import CreateCourse from "./screens/courses/createCourse";
import CreatePost from "./screens/posts/createPost";
import EditPost from "./screens/posts/editPost";
import Posts from "./screens/posts/Posts";
import Transactions from "./screens/transactions/Transaction";
import Booking from "./screens/booking/Booking";
import Categories from "./screens/category/Categories"
import NewCategories from "./screens/category/createCategory"
import EditCategories from "./screens/category/editCategory"
// import ReactGA from "react-ga";
// ReactGA.initialize("UA-204902793-1");
const language = [
  {
    code: "en",
    name: "English",
    country_code: "ca",
  },
  {
    code: "fa",
    name: "فارسی",
    country_code: "ir",
    dir: "rtl",
  },
];
//Multilanguage settings
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    //Languages and setting
    supportedLngs: ["en", "fa"],
    fallbackLng: "en",
    detection: {
      order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/assets/local/lang/{{lng}}/translation.json",
    },
  });
function App() {
  // ReactGA.pageview(window.location.pathname + window.location.search);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  const tokenStatus = localStorage.getItem("tokenStatus")
    ? localStorage.getItem("tokenStatus")
    : 0;
  const loggedInUser = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : null;
  let loggedIn = null;
  if (loggedInUser != null && token != null && tokenStatus == 1) {
    loggedIn = loggedInUser;
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenStatus");
  }
  const currentTheme = cookies.get("theme") || "Dark";

  //Get current cookies
  const currentLanguageCode = cookies.get("i18next") || "en";
  //Check if current language code is same as defined language
  const currentLanguage = language.find((l) => l.code === currentLanguageCode);
  const cou_code = currentLanguageCode == "fa" ? "ir" : "ca";
  const cou_name = currentLanguageCode == "fa" ? "فارسی" : "English";
  useEffect(() => {
    //Change body DIR and CLASS if languge is RTL(FA)
    document.body.dir = currentLanguage.dir || "ltr";
    document.body.dir == "rtl"
      ? document.body.classList.add("rtl")
      : document.body.classList.remove("rtl");
    //Change app title
    document.title = t("app-title");
  }, [currentLanguage]);

  const ChangeTheme = () => {
    var element = document.body.classList;
    var table = document.getElementById("table");
    if (element.contains("Light")) {
      element.remove("Light");
      element.add("Dark");
      cookies.set("theme", "Dark");
      table.classList.remove("table-light");
      table.classList.add("table-dark");
      document.getElementById("ChangeThemeButton").innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    } else if (element.contains("Dark")) {
      element.remove("Dark");
      element.add("Light");
      cookies.set("theme", "Light");
      table.classList.remove("table-dark");
      table.classList.add("table-light");
      document.getElementById("ChangeThemeButton").innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    }
  };
  const logoutHandle = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };
  useEffect(() => {
    dispatch(checkToken(token));
  }, []);
  useEffect(() => {
    document.body.classList.remove("Dark");
    document.body.classList.remove("Light");
    document.body.classList.add(currentTheme);
  }, [currentTheme]);
  return (
    <>
      {loggedIn ? (
        <>
          {loading ? (
            <Loading />
          ) : (
            <BrowserRouter>
              <div className="container-fluid">
                <nav className="navbar navbar-expand-lg">
                  <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                      <img
                        src={"./assets/images/logo.png"}
                        className="img-fluid main-logo"
                      />
                    </a>

                    <button
                      className="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                      className="collapse navbar-collapse justify-content-end"
                      id="navbarSupportedContent"
                    >
                      <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                          <a
                            className="nav-link"
                            id="ChangeThemeButton"
                            onClick={ChangeTheme}
                            role="button"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-sun"
                            >
                              <circle cx="12" cy="12" r="5"></circle>
                              <line x1="12" y1="1" x2="12" y2="3"></line>
                              <line x1="12" y1="21" x2="12" y2="23"></line>
                              <line
                                x1="4.22"
                                y1="4.22"
                                x2="5.64"
                                y2="5.64"
                              ></line>
                              <line
                                x1="18.36"
                                y1="18.36"
                                x2="19.78"
                                y2="19.78"
                              ></line>
                              <line x1="1" y1="12" x2="3" y2="12"></line>
                              <line x1="21" y1="12" x2="23" y2="12"></line>
                              <line
                                x1="4.22"
                                y1="19.78"
                                x2="5.64"
                                y2="18.36"
                              ></line>
                              <line
                                x1="18.36"
                                y1="5.64"
                                x2="19.78"
                                y2="4.22"
                              ></line>
                            </svg>
                          </a>
                        </li>

                        <li className="nav-item dropdown">
                          <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <img
                              src={`./assets/flags/${cou_code}.svg`}
                              className="img-fluid"
                            />{" "}
                            {cou_name}
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-end">
                            {language.map(({ code, name, country_code }) => (
                              <li key={country_code}>
                                <button
                                  className="dropdown-item"
                                  onClick={() => i18n.changeLanguage(code)}
                                  disabled={code == currentLanguageCode}
                                >
                                  <img
                                    src={`./assets/flags/${country_code}.svg`}
                                    style={{
                                      opacity:
                                        code == currentLanguageCode ? 0.5 : 1,
                                    }}
                                    className="img-fluid"
                                  />

                                  {name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </li>

                        <li className="nav-item dropdown">
                          <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-user"
                            >
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            {t("profile")}
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-end">
                            <li>
                              <a className="dropdown-item" href="#">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  className="feather feather-user"
                                >
                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                  <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                {t("profile")}
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  className="feather feather-edit"
                                >
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>{" "}
                                {t("edit")}
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                style={{ cursor: "pointer" }}
                                onClick={logoutHandle}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  className="feather feather-log-out"
                                >
                                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                  <polyline points="16 17 21 12 16 7"></polyline>
                                  <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>{" "}
                                {t("logout")}
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="container-fluid mt-1 Content">
                <div className="row">
                  <div className="col-md-2 LeftSide">
                    <Sidebar />
                  </div>
                  <div className="col-md-10 RightSide">
                    <Routes>
                      <Route path="/" element={<Dashboard />} exact></Route>
                      <Route path="/users" element={<Users />}></Route>
                      <Route path="/new/user" element={<CreateUser />}></Route>
                      <Route
                        path="/user/edit/:id"
                        element={<UserEdit />}
                      ></Route>
                      <Route path="/courses" element={<Courses />}></Route>
                      <Route
                        path="/new/course"
                        element={<CreateCourse />}
                      ></Route>
                      <Route
                        path="/course/edit/:id"
                        element={<EditCourse />}
                      ></Route>
                      <Route path="/posts" element={<Posts />}></Route>
                      <Route path="/posts/new" element={<CreatePost />}></Route>
                      <Route path="/posts/edit/:id" element={<EditPost />}></Route>
                      <Route path="/transactions" element={<Transactions />}></Route>
                      <Route path="/booking" element={<Booking />}></Route>
                      <Route path="/categories" element={<Categories />}></Route>
                      <Route path="/categories/create" element={<NewCategories />}></Route>
                      <Route path="/category/edit/:id" element={<EditCategories />}></Route>
                    </Routes>
                  </div>
                </div>
              </div>
            </BrowserRouter>
          )}
        </>
      ) : (
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
