import React from 'react'

export default function DetailProfile(props) {
    return (
        <div className="detail-profile px-4">
            <div className="label-detail-profile">
                {props.detailProfile.label}
            </div>
            <div className="row container-sub-detail-profile">
                <div className="col col-1">
                    {props.detailProfile.icon}
                </div>
                <div  className="col col-9 column-detail">
                    {
                        props.edit?(
                            <input onChange={props.handleOnChange} value={props.value} name={props.idKey} className="input-detail" />
                        ):(
                            <div className="">
                                {props.value}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
