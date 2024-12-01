import React from 'react'
import { useHistory } from "react-router-dom";
import { Col } from "react-bootstrap";
import ThumbPDF from '../ThumbPDF'

export default function CardPDF(props) {
    let history = useHistory()
    const handleClick = () =>{
        history.push(`/detail-pdf/${props.data.id}`)
    }
    return (
        <Col className={`page ${props.small?"mb-4":"mb-5"} ${props.myPDF?"mx-0 mx-lg-3 mx-md-3 ":""}  `} lg={`${props.myPDF?2:3}`}  md={`${props.myPDF?3:4}`} sm={`${props.myPDF?6:6}`} xs={`${props.myPDF?6:6}`}>
            <div onClick={handleClick} className={`${props.small?"pdf-container-small":"pdf-container-big"} card`}>

                <ThumbPDF className="img-fluid" file={props.data.thumbnail} small={props.small}/>

                <div className="mt-4">
                    <p className={`text-overflow title-card ${props.small && "small-title-card"}`}>
                        {props.data.title}
                    </p>

                    <div className={`detail-card ${props.small && "small-detail-card"}`}>
                        <p className="">
                            {props.data.author.split(',').length>1?
                            (`${props.data.author.split(',')[0]+' et al.'}`)
                            :(props.data.author)}
                        </p>
                        <p className="text-start ">
                            {props.data.year.year}
                        </p>
                    </div>
                </div>
            </div>
        </Col>
    )
}
