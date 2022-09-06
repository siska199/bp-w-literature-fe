/* eslint-disable eqeqeq */
import React, { useState, useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { Modal } from "react-bootstrap";
import InputGroup from "./../InputGroup";
import { API } from "../../config/api";
import Alert from "./../Alert";
import Swal from "sweetalert2";
import Loading from "../Loading";

export default function ModalRegister({ handelLogin }) {
  const initialValue = {
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    gender: "",
  };
  const label = [
    "Full Name",
    "Email",
    "Password",
    "Phone",
    "Address",
    "Gender",
  ];
  const [formValue, setFormValue] = useState(initialValue);

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.getAttribute("id")]: e.target.value,
    });
  };

  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const { register, setRegister, setLogin } = useContext(ModalContext);
  const [loading, setLoading] = useState(false)
  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true)
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(formValue);
      const response = await API.post("/register", body, config);
      setLoading(false)
      if (response.data.status == "success") {
        sweetAlert(true, "success", `Register Success`);
        handelOnHide();

        setTimeout(() => {
          setLogin(true);
        }, 500);
      } else {
        showAlert(true, "danger", `${response.data.status}`);
      }
    } catch (error) {
      showAlert(true, "danger", `${error.response.data.message}`);
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const sweetAlert = (show = false, type = "", msg = "") => {
    Swal.fire({
      icon: type,
      title: msg,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handelOnHide = () => {
    setRegister(false);
    setFormValue(initialValue);
  };
  return (
    <>
      <Modal className="c-modal-auth" show={register} onHide={handelOnHide}>
        <Modal.Body className="modal-body-auth px-lg-5 px-md-5 px-sm-5 px-4 py-4">
          <div className="row pt-1">
            <p className="title-auth">Register</p>
          </div>
          <form autoComplete="off" onSubmit={handleOnSubmit} action="">
            {alert.show && <Alert {...alert} removeAlert={showAlert} />}
            {Object.entries(formValue).map(([key, value], i) => (
              <InputGroup
                register={true}
                key={i}
                handleChange={handleChange}
                label={label[i]}
                keyId={key}
                value={value}
              />
            ))}
            <div className="mb-3 mt-4 ">
              <button  className="btn-auth-in sign-up container-btn-auth">
                Register
                {loading &&  <Loading/>}
              </button>
            </div>
          </form>

          <div className="mt-2 text-center">
            Don't have an account? ? Klik{" "}
            <span className="klik-here" onClick={handelLogin}>
              Here
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}