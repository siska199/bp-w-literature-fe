/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */

import React, {useContext} from "react";
import { ModalContext } from "../context/ModalContext";
import { UserContext } from "../context/UserContext";
import { useHistory } from "react-router-dom";
import { Col } from "react-bootstrap";
import image from '../assets/image.png'
import ModalRegister from "../components/modal/ModalRegister";
import ModalLogin from "../components/modal/ModalLogin";
export default function LandingPage() {
    const { dataUser} = useContext(UserContext);
    const { register, setRegister, login, setLogin } = useContext(ModalContext);
    let history = useHistory()

    const handleRegister = () => {
        setRegister(true);
        setLogin(false);
      };
      const handleLogin = () => {
        setLogin(true);
        setRegister(false);
      };

    return (
        <div className="container container-page">
            <div className="row align-items-center justify-content-center">

                <Col className="landing-auth" lg={{span:4, offset:1}} md={6} sm={6} xs={11}>
                    <div className="">
                        <div className="title">
                            Source of intelligance
                        </div>
                        <p className="paragraph my-3">
                            Sign-up and receive unlimited access to all
                            of your literatur and share your literature
                        </p>
                        <div>
                            {
                                dataUser.isLogin!==true? (
                                    <>
                                        <button onClick={()=>handleRegister()} className="btn-auth sign-up me-3 mb-2">Sign Up</button>
                                        <button  onClick={()=>handleLogin()}  className="btn-auth sign-in">Sign In</button>
                                    </>
                                ):(
                                    <>
                                    {
                                        dataUser.status=="admin"?(
                                            <button onClick={()=>history.push('/admin-page')} style={{width:"200px"}} className="btn-auth sign-up me-3">Dashboard Admin</button>

                                        ):(
                                            <button onClick={()=>history.push('/home/search')} style={{width:"200px"}} className="btn-auth sign-up me-3">Search Book</button>
                                        )
                                    }
                                    </>
                                )
                            }
                        </div>
                    </div>
                </Col>

                <Col className="landing-img" lg={{span:5}} md={6}  sm={6} xs={12}>
                    <img className="img-landing-page" alt="" src={image} />
                </Col>
            </div>
            
            <ModalLogin
                handelLogin={handleLogin}
                handelRegister={handleRegister}
                login={login}
            />
            <ModalRegister
                handelLogin={handleLogin}
                handelRegister={handleRegister}
                register={register}
            />
        </div>
    )
}
