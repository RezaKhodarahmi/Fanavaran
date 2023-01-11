import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.loggedInUser);
  const { registeredUser } = useSelector((state) => state.registeredUser);
  const navigate = useNavigate();
  console.log(registeredUser?.data?.token);
  useEffect(() => {
    if (registeredUser?.data?.user && registeredUser?.data?.token) {
      navigate("/email-verification");
    } else if (!user?.token && !user?.data) {
      navigate("/login");
    } else if (user?.data?.status === 0) {
      navigate("/email-verification");
    }
  }, []);

  return (
    <>
      <section className="container">
        <h1>{t("profile")}</h1>
        <br />
        <p>
          {t("email")}:{user?.data?.email}
        </p>
        <br />
        <p>
          {t("display-name")}:{user?.data?.display_name}
        </p>
      </section>
    </>
  );
};

export default UserDashboard;
