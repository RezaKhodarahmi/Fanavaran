//Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Style
import "./App.css";
import "./style/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

//Start multilanguage Dep
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
//Start multilanguage Dep
import "/node_modules/flag-icons/css/flag-icons.min.css";
//Components
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Header from "./screens/Header";
import Footer from "./screens/Footer";
import Profile from "./screens/dashboard/userDashboard";
import EmailVerify from "./screens/dashboard/emailVerification";
import { useSelector } from "react-redux";

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
  const {loading} = useSelector(state=>state.loggedInUser);
  
 
  return (
    <>
      {loading ? (
        <div className="container-fliud spinner-container ">
          <div className="row">
          <div className="col-12">
          <div class="spinner-border text-warning" style={{width:"5rem",height:"5rem"}} role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
          </div>
          </div>
        </div>
      ) : (
        <div className="App">
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/" element={<Home />} exact></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/email-verification"
                element={<EmailVerify />}
              ></Route>
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
