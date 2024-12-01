/* eslint-disable eqeqeq */
import React from 'react'
import {Col} from 'react-bootstrap';

export default function TabNav(props) {
    return (
        <Col lg={4} md={4} sm={4} xs={4} className="border">
            <div className="row">
                <button className={props.toggleTab==props.index ? "tab active-tab":"tab"}
                onClick={()=>props.handleToggleTab(props.index)}
                >
                    {props.tabLabel}
                </button>
            </div>
        </Col>
    )
}
