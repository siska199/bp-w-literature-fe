/* eslint-disable eqeqeq */
import React from 'react'
import {Col} from 'react-bootstrap';

export default function Contact(props) {
    return (
        <Col onClick={!props.user ? ()=>props.handleActiveContact(props.idUser) :null }  lg={12} className={` ${!props.user?"c-contact":" "}`}>
            <div className={`row py-2  ${props.cotactId==props.idUser && !props.user?" active-contact ":" non-active-contact "}`}>
                <Col lg={2} className="">
                    <img src={props.image} className="img-contact" alt=""/>
                </Col>
                <Col lg={8} className="container-contact-text">
                    <div className="username">
                        {props.fullName}
                    </div>
                    <div className="new-message">
                        {props.msg}
                    </div>
                </Col>
                <Col className="time-container d-grid align-items-center justify-content-center" lg={2}>
                    {
                        !props.user &&
                        <>
                            {
                                <div className={`text-center  ${props.active ?"":" notif-msg "} `}>
                                </div>
                            } 
                        </>
                    }
                </Col>
            </div>
        </Col>
    )
}
