import React from 'react'
import {Col} from 'react-bootstrap';

export default function RecipientCard(props) {
    return (
        <div className="row  p-2 px-3 card-receiver">
            <Col lg={1}>
                <img src={props.icon} className="img-contact" alt=""/>
            </Col>
            <Col lg={11} className="d-flex align-items-center">
                <div className="username">
                    {props.fullName}
                </div>
            </Col>
        </div>
    )
}
