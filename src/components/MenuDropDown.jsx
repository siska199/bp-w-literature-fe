import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useHistory } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import {RiDashboardFill} from "react-icons/ri";
import { Dropdown } from "react-bootstrap";
import Swal from "sweetalert2";

const style = {
  profile: {
    width: "50px",
    height: "50px",
    border: "2px solid #FFAF00",
    borderRadius: "50%",
    boxSizing: "borderBox",
    cursor: "pointer",
  },
};
export default function MenuDropDown({image}) {
  const {setDataUser } = useContext(UserContext);

  let history = useHistory();
  const handelLogOut = () => {
    localStorage.removeItem("token");
    setDataUser({
      isLogin: false,
      status: "No user",
    });
    history.push("/");
    sweetAlert(true, "success", `Logout Success`);
  };

  const sweetAlert = (show = false, type = "", msg = "") => {
    Swal.fire({
      icon: type,
      title: "<h2 style='color:red'>" + msg + "</h2>",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <Dropdown className="drop-down-admin" align="end">

      <Dropdown.Toggle className="mb-3" variant="link" bsPrefix="p-0">
        <img className="img-drop-down" style={style.profile} src={image} alt="" />
      </Dropdown.Toggle>

      <Dropdown.Menu className="menu-drop-down">
        <Dropdown.Item
            onClick={()=>history.push("/admin-page")}
            className="d-item"
            href=""
          >
          <RiDashboardFill size="30px" color="blue" />
          <span className="ms-lg-3 ms-md-2 ms-sm-2">Dashboard</span>
        </Dropdown.Item>

        <Dropdown.Item
          onClick={handelLogOut}
          className="d-item"
          href=""
        >
          <FiLogOut size="30px" color="#E50914" />
          <span className="ms-lg-3 ms-md-2 ms-sm-2">Logout</span>
        </Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
  );
}

