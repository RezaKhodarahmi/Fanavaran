import { useEffect } from "react";
import { Link } from "react-router-dom";
import cookies from "js-cookie";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import Logo from "../../src/logo.svg";
import { useSelector } from "react-redux";
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
const Header = () => {
    //Get current cookies
    const currentLanguageCode = cookies.get("i18next") || "en";
    //Check if current language code is same as defined language 
    const currentLanguage = language.find((l) => l.code === currentLanguageCode);
    //Use defined translation
    const { t } = useTranslation();
    //get user
    const loggedInUser = useSelector(state => state.loggedInUser);

    useEffect(() => {
        //Change body DIR and CLASS if languge is RTL(FA)
        document.body.dir = currentLanguage.dir || "ltr";
        document.body.dir == "rtl" ? document.body.classList.add("rtl") : document.body.classList.remove("rtl");
        //Change app title
        document.title = t('app-title');
    }, [currentLanguage]);
    return (

        <header className="App_header">
           <div className="container-fluid p-0 m-0">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link to="/">
                        <img src={Logo} className="logo" alt="ّFanavaran"></img>
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {t("Select-lang")}
                                </a>
                                
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-end">
                                   
                                    {language.map(({ code, name, country_code }) => (
                                        <li key={country_code}>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => i18n.changeLanguage(code)}
                                                disabled={code == currentLanguageCode}
                                            >
                                                <span
                                                    className={`fi fi-${country_code} mx-2`}
                                                    style={{ opacity: code == currentLanguageCode ? 0.5 : 1 }}
                                                ></span>
                                                {name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            {
                                loggedInUser.user?.data?.ID ? 
                                (
                                    <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {t("profile")}
                                        <img src="../../assets/img/profile.png" class="img-fluid" />
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-end">
                                        <li><Link className="dropdown-item" to="/profile">{t("profile")}</Link></li>
                                        <li><Link className="dropdown-item" to="/profile">{t("edit")}</Link></li>
                                        <li><Link className="dropdown-item" to="/profile">{t("logout")}</Link></li>
                                    </ul>
                                </li>
                                ) : (
                                <li className="nav-item">
                                    <Link to="login" className="text-light">{t('login-title')}</Link> / 
                                    <Link to="register" className="text-light">{t('register-title')}</Link>
                                </li>
                                )
                            }
                           
                        </ul>
                    </div>
                </div>
            </nav>
            </div>
        </header>
    );
}

export default Header;
