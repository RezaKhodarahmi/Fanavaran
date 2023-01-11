import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authRegister } from "../actions/authActions";
import Logo from "../../src/fav.svg";
import { Link } from 'react-router-dom'
import Profile from './dashboard/userDashboard';


const Register = () => {

    const form = useRef();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const errRef = useRef();
    const emailRef = useRef();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState(false);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const registeredUser = useSelector(state => state.registeredUser);


    useEffect(() => {
        document.title = t('register-title')

    }, [])
    async function fetchData() {
        dispatch(authRegister(username, email, pwd));
    }
    const handelregister = async (e) => {
        e.preventDefault();
        fetchData();
    }

    useEffect(() => {
        if (registeredUser?.registeredUser?.data?.status === 200) {
           navigate('/profile')
            setEmail('');
            setPwd('');
           setSuccess(true);
            setErrMsg("");
        } else if (registeredUser.err === 1062) {
            setErrMsg(t("duplicate-entry"));
        } else if (registeredUser?.status === 500) {
            setErrMsg(t("server-error"));
        } else if (registeredUser?.status === 401) {
            setErrMsg(t("unauthorized"));
        } else if (registeredUser?.status === 403) {
            setErrMsg(t('invalid-username-password'));
        } else if (registeredUser?.status === 400) {
            setErrMsg("مقدار .ارد شده ");
        } else {
            setErrMsg();
        }
    })
    return (
        <>
            {
                success ? (
                    <Profile></Profile>
                ) : (
                    <div className='login-form-container text-center' style={{ backgroundColor: "#F5F5F5", width: "100%", height: "100vh" }}>
                        <main className="form-signin w-100 m-auto pt-5">
                            <form onSubmit={handelregister} ref={form}>
                                <img className="img-fluid w-50 mb-4" style={{ maxWidth: "100px" }} src={Logo}></img>
                                <h1 className="h3 mb-3 fw-normal">{t('register-title')}</h1>
                                {
                                    errMsg ? <span style={{ backgroundColor: "red", color: "#fff", padding: "5px", borderRadius: "5px" }} ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</span> : <span></span>
                                }
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        id="username"
                                        className='form-control'
                                        value={username}

                                        onChange={e => setUsername(e.target.value)}
                                    />
                                    <label htmlFor="username">{t('username')}</label>
                                </div>
                                <div className="form-floating">
                                    <input type="email"
                                        id="email"
                                        className='form-control'
                                        value={email}
                                        ref={emailRef}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <label htmlFor="email">{t('email')}</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password"
                                        id="password"
                                        className='form-control'
                                        value={pwd}
                                        onChange={e => setPwd(e.target.value)}
                                    />
                                    <label htmlFor="password">{t('password')}</label>
                                </div>


                                <button className="w-100 btn btn-lg btn-primary" >{t("register-title")}</button>
                                <small className="my-3">{t("already-joined-us")} <Link to="/login">{t("login-title")}</Link></small>
                                <p className="mt-5 mb-3 text-muted">&copy; 2022–2023</p>
                            </form>
                        </main>
                    </div>
                )
            }
        </>

    );
}

export default Register;
