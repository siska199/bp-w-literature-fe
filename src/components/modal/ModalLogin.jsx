/* eslint-disable eqeqeq */
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { ModalContext } from "../../context/ModalContext";
import { useHistory } from "react-router-dom";
import { Modal, Container, Row, Col } from "react-bootstrap";
import InputGroup from "./../InputGroup";
import { API, setAuthToken } from "../../config/api";
import Alert from "./../Alert";
import Swal from "sweetalert2";
import Loading from "../Loading";
export default function ModalLogin({ handelRegister }) {
  const defaultValueForm = {
    email: "",
    password: "",
  };
  const label = ["Email", "Password"];
  const [formValue, setFormValue] = useState(defaultValueForm);
  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.getAttribute("id")]: e.target.value,
    });
  };

  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const { login, setLogin } = useContext(ModalContext);
  const { setDataUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setFormValue(null);
    };
  }, []);

  const handelOnHide = () => {
    setLogin(false);
    setFormValue(defaultValueForm);
  };

  let history = useHistory();
  const handelOnSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(formValue);
      const response = await API.post("/login", body, config);
      setLoading(false);
      if (response?.status === 200) {
        setLogin(false);
        setLoading(false);
        setDataUser({
          isLogin: true,
          ...response.data.data,
        });
        localStorage.setItem("token", response.data.data.token);
        setAuthToken(localStorage.getItem("token"));
        setFormValue("");
        sweetAlert(false, "success", "Login Success");
        if (response.data.data.status == "admin") {
          history.push("/admin-page");
        } else {
          history.push("/home/search");
        }
      } else {
        showAlert(true, "dark", `${response.data.status}`);
        setLoading(false);
      }
    } catch (error) {
      showAlert(true, "danger", `${error.response.data.message}`);
      setLoading(false);
    }
  };

  const showAlert = (show = false, type = "", msg = " ") => {
    setAlert({ show, type, msg });
  };

  const sweetAlert = (show = false, type = "", msg = "") => {
    Swal.fire({
      icon: type,
      title: msg,
      showConfirmButton: show,
      timer: 1500,
    });
  };

  return (
    <Modal
      fullscreen="sm"
      className="c-modal-auth"
      show={login}
      onHide={handelOnHide}
    >
      <Modal.Body className="px-lg-5 px-md-5 px-sm-5 px-3 modal-body-auth">
        <Container>
          <Row className="mt-4 mb-2">
            <p className="title-auth pt-3">Login</p>
          </Row>
          <Row>
            <Col>
              <form autoComplete="off" onSubmit={handelOnSubmit} action="">
                {alert.show && <Alert {...alert} removeAlert={showAlert} />}
                {Object.entries(formValue).map(([key, value], i) => (
                  <InputGroup
                    key={i}
                    handleChange={handleChange}
                    label={label[i]}
                    keyId={key}
                    value={value}
                  />
                ))}
                <div className="">
                  <button className="btn-auth-in sign-in container-btn-auth">
                    Login
                    {loading && <Loading />}
                  </button>
                </div>
              </form>
            </Col>
          </Row>
          <Row className="mb-3 mt-4 text-center">
            <Col>
              Have an account? Klik{" "}
              <span className="klik-here" onClick={handelRegister}>
                Here
              </span>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
