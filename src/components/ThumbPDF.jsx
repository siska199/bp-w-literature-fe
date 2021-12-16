import React from 'react'


// <img className={`${props.small?"small-pdf-thumb":"big-pdf-thumb"}`} src={props.file}   alt=" "/>

export default function ThumbPDF(props) {

    return (
        <>
            <img className={`${props.small?"small-pdf-thumb":"big-pdf-thumb"}`} src={props.file}   alt=" "/>
        </>
    )
}
