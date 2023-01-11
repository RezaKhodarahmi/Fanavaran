import React from "react";
import emailjs from "@emailjs/browser";
import env from "react-dotenv";

export const sendRegisterNotif =
  (data, template) => async (dispatch, getState) => {
    emailjs
      .sendForm(env.MAILER_SERVICE_ID, template, data, env.MAILER_PUBLIC_KEY)
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
