import React from "react";

var currentDate;
currentDate = new Date();
currentDate =
currentDate.getUTCFullYear() +
  "-" +
  ("00" + (currentDate.getUTCMonth() + 1)).slice(-2) +
  "-" +
  ("00" + currentDate.getUTCDate()).slice(-2) +
  " " +
  ("00" + currentDate.getUTCHours()).slice(-2) +
  ":" +
  ("00" + currentDate.getUTCMinutes()).slice(-2) +
  ":" +
  ("00" + currentDate.getUTCSeconds()).slice(-2);
export default currentDate;
