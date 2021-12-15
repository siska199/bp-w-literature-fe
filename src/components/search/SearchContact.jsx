import React from 'react'
import {Col} from 'react-bootstrap';

export default function Search(props) {
    return (
        <Col lg={12} className="mb-3">
            <input placeholder="Search" className="inp-search-contact"/>
        </Col>
    )
}
