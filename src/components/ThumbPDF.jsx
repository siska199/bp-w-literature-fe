import React from 'react'

export default function ThumbPDF(props) {

    return (
        <>
            <img className={`${props.small?"small-pdf-thumb":"big-pdf-thumb"}`} src={props.file}   alt=" "/>
        </>
    )
}
