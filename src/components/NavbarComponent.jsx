/* eslint-disable eqeqeq */
import React, { useContext }  from 'react'
import { UserContext } from "../context/UserContext";
import { Navbar, Nav, Container, Col} from "react-bootstrap";
import { RiQuillPenFill } from 'react-icons/ri';
import {NavLink} from "react-router-dom"
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import MenuDropDown from './MenuDropDown';
import { TiMessages } from 'react-icons/ti';

export default function NavbarComponent() {
    const { dataUser, setDataUser} = useContext(UserContext);
    let history = useHistory();

    const handleLogout = ()=>{
        setDataUser({
            isLogin : false,
        })
        localStorage.removeItem("token");
        sweetAlert(false, "success", "Logout Success");
        history.push('/')
    }

    const sweetAlert = (show = false, type = "", msg = "") => {
        Swal.fire({
          icon: type,
          title: msg,
          showConfirmButton: show,
          timer: 1500,
        });
      };
    return (
        <Navbar fixed="top" className="navbar" expand="md">
            <Container >

                {
                    dataUser.isLogin?(
                        <>
                        {
                            dataUser.status=="user"?(
                                <>
                                    <Col className="mb-3" lg={{span:9, order: 'first'}} md={{span:9, order: 'first'}}  sm={{span:12, order: 'last'}} xs={{span:12, order: 'last'}} >
                                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                        <Navbar.Collapse  id="basic-navbar-nav">
                                            <Nav  className="toggle-container me-auto">
                                                <NavLink activeClassName="active" className="nav-text" to="/profile">
                                                    Profile
                                                </NavLink>                                        


                                                <NavLink  activeClassName="active" className="nav-text" to="/my-collection">
                                                    My Collection
                                                </NavLink>
                                                <NavLink activeClassName="active" className="nav-text" to="/add-literature">
                                                    Add Literature
                                                </NavLink>
                                                <Nav.Link style={{marginTop:"-10px"}} className="nav-text" onClick={()=>handleLogout()} to="">
                                                    Logout
                                                </Nav.Link>
                                            </Nav>
                                        </Navbar.Collapse>
                                    </Col>

                                    <Col  lg={{span:3, order: 'last'}} md={{span:4, order: 'last'}}  sm={{span:12, order: 'first'}} xs={{span:12, order: 'first'}} >
                                        <NavLink className="home-link" to="/home/list-of-books">
                                            <Nav.Item onClick={()=>window.scrollTo(0,0)} className="nav-link nav-icon nav-icon-user">
                                                Literature
                                                <span className="">
                                                    <RiQuillPenFill size="35" color="black"/>
                                                </span>
                                            </Nav.Item>
                                        </NavLink>
                                    </Col>
                                </>
                            ):(
                                <>
                                    <Col lg={10} className="">
                                            <NavLink className="home-link" to="/" activeClassName="active" >
                                                <Nav.Item className="nav-link nav-icon-admin">
                                                    Literature
                                                    <span className="">
                                                        <RiQuillPenFill size="35" color="black"/>
                                                    </span>
                                                </Nav.Item>
                                            </NavLink>
                                    </Col>
                                    
                                    <Col lg={2} className="d-flex justify-content-end">
                                        <Nav >
                                            <NavLink  activeClassName="active" className="nav-text d-flex align-items-center mb-3" to="/complain">
                                                <div className="chat-icon">
                                                    <TiMessages size="40px"/>
                                                    <div className="notif"></div>
                                                </div>
                                            </NavLink>
                                            <MenuDropDown image={dataUser.image}/>
                                        </Nav>
                                    </Col>

                                </>
                            )
                        }

                    </>
                    ):(
                        <>
                            <Navbar.Brand href="#home">
                                <Nav.Item className="nav-link nav-icon">
                                    Literature
                                    <span className="">
                                        <RiQuillPenFill size="35" color="black"/>
                                    </span>
                                </Nav.Item>
                            </Navbar.Brand>
                        </>
                    )
                }
            </Container>
        </Navbar>
    )
}
