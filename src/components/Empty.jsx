import React from 'react'
import image from '../assets/image.png'
export default function Empty() {
    return (
        <div className ="row justify-content-center text-center">
            <div style={{marginTop:"-20px"}} className="">
                <img className=" img-empty" src={image} alt="" />
            </div>

            <div style={{marginTop:"-20px"}} className="text-empty text-shadow">
                Empty Data
            </div>
        </div>
    )
}
