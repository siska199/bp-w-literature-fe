import React from 'react'
import { RiQuillPenFill } from 'react-icons/ri';

export default function Header({title}) {
    return (
        <div className="row">
            <p className="title-profile">
                {title}
                <RiQuillPenFill className="profile-icon"/>
            </p>
        </div>
    )
}
