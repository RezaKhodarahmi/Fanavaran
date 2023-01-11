import { useRef, useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import { authLogin } from "../actions/authActions"
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../src/fav.svg";
import './login.css';
import Profile from './dashboard/userDashboard';
const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const emailRef = useRef();
    const errRef = useRef();
    const [items, setItems] = useState([]);
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState(false);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        emailRef.current.focus();
    }, []);
    useEffect(() => {
        document.title = t('login-title')
        setErrMsg('');
    }, [email, pwd]);


    async function fetchData() {
        dispatch(authLogin(email, pwd));
    }
    const loggedInUser = useSelector(state => state.loggedInUser);



    const handelSubmit = async (e) => {

        e.preventDefault();
        fetchData();
        // loggedInUser?.user?.success === 1 ? console.log("yes") : console.log(loggedInUser?.user?.message);


    }
    useEffect(() => {

        if (loggedInUser?.user?.success === 1) {
            navigate("/profile");
            setEmail('');
            setPwd('');
            setSuccess(true);
        } else if (loggedInUser?.status === 500) {
            setErrMsg(t("server-error"));
        } else if (loggedInUser?.status === 401) {
            setErrMsg(t("unauthorized"));
        } else if (loggedInUser?.status === 403) {
            setErrMsg(t('invalid-username-password'));
        } else {
            setErrMsg("");
        }
    })
    useEffect(() => {
        const token = localStorage.getItem('token', items);
        if (token) {
            // setSuccess(true);
        } else {
            // setSuccess(false);
        }
    })
    return (

        <>
            {
                success ?
                    (
                        <Profile></Profile>
                    ) : (
                        <div className='login-form-container text-center' style={{ backgroundColor: "#F5F5F5", width: "100%", height: "100vh" }}>
                            <main className="form-signin w-100 m-auto pt-5">
                                <form onSubmit={handelSubmit}>
                                    <img className="img-fluid w-50 mb-4" style={{maxWidth:"100px"}} src={Logo}></img>
                                    <h1 className="h3 mb-3 fw-normal">{t('login-title')}</h1>
                                    {
                                        errMsg? <span style={{backgroundColor:"red",color:"#fff",padding:"5px",borderRadius:"5px"}} ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</span> : <span></span>
                                    }
                                    <div className="form-floating">
                                        <input type="email"
                                            className="form-control"
                                            id="email"
                                            ref={emailRef}
                                            autoComplete="off"
                                            onChange={e => setEmail(e.target.value)}
                                            value={email}
                                            required />
                                        <label htmlFor="email">{t('email')}</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="password"
                                            className="form-control"
                                            id="password"

                                            onChange={e => setPwd(e.target.value)}
                                            value={pwd}
                                            required />
                                        <label htmlFor="password">{t('password')}</label>
                                    </div>

                                    <div className="checkbox mb-3">
                                        <label>
                                            <input type="checkbox" value="remember-me" />{t('remember-me')}
                                        </label>
                                    </div>
                                    <button className="w-100 btn btn-lg btn-primary" >{t("login-title")}</button>
                                    <small className="my-3">{t("need_an_account")} <Link to="/register">{t("sign-up")}</Link></small>
                                    <p className="mt-5 mb-3 text-muted">&copy; 2022–2023</p>
                                </form>
                            </main>
                        </div>
                    )}
        </>
    );
}

export default Login;
