/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

export default function Alert({ type, msg, removeAlert }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div
      style={{ fontSize: "15px" }}
      className={`alert alert-${type} py-1 text-center`}
      role="alert"
    >
      {msg}
    </div>
  );
}