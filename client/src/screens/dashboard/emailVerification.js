import React from "react";
import { useTranslation } from "react-i18next";

const EmailVerification = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h1>{t("success-sign-up")}</h1>
      <span style={{ color: "red" }}>{t("email-verify-message-title")}</span>
      <p>{t("email-verify-message")}</p>
      <form>
        <div className="form-floating">
          <input
            type="text"
            id="code"
            className="form-control"
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="code">{t("code")}</label>
        </div>
        <button className="btn btn-primary">{t('verify')}</button>
      </form>
    </div>
  );
};

export default EmailVerification;
