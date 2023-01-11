import React, { useEffect, useState } from "react";
import "./success.css";
import { useTranslation } from "react-i18next";

const Success = (props) => {
  const { t } = useTranslation();
  const [display, setDisplay] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 5000);
  }, []);

  return (
    <div>
      {display ? (
        <div class="alert success-alert">
          <h3>{t(props.message)}</h3>
          <a class="close" onClick={(e) => setDisplay(false)}>
            &times;
          </a>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Success;
