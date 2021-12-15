import React from 'react'
import {Col} from 'react-bootstrap';

export default function Message(props) {
    return (
        <div className={`row mb-1 ${props.receiver?"justify-content-start ":"justify-content-end"}`}>
            <Col lg={5} className={`d-flex align-items-center  ${props.receiver?"justify-content-start ":"justify-content-end"}`}> 
                {
                    props.receiver?(
                        <>
                            <div className={`receiver-img`}>
                                <img src={props.image} className="img-contact-message rounded-circle border" alt=""/>
                            </div>
                            <div className={`text-message receiver ms-2`}>
                                {props.msg}
                            </div>
                        </>
                    ):(
                        <>
                            <div className={`text-message sender me-2`}>
                                {props.msg}
                            </div>
                            <div className={`sender-img`}>
                                <img src={props.image} className="img-contact-message rounded-circle border" alt=""/>
                            </div>
                        </>
                    )
                }

            </Col>
        </div>
    )
}
