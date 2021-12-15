/* eslint-disable eqeqeq */
import React from 'react'
import CardPDF from '../card/CardPDF';
import Empty from '../Empty';
import { useHistory } from "react-router-dom";


export default function ContentTabNavbar(props) {
    let history = useHistory();

    return (
        <div  className={`${props.toggleTab===props.index?"content active-content ":"content "} mt-3 `}>

            {
                props.data[0]?(
                    <>
                    {
                        props.tabLabel=="Cancel" &&
                        <button className="btn-complain-user mb-3 ms-0 ms-lg-3 ms-md-3" onClick={()=>history.push('/complain')}>Complain</button>

                    }

                        <div className="row justify-content-start">
                        {
                            props.data.map((d,i)=>(
                                <CardPDF key={i} myPDF={true} data={d} small={true}/>
                            ))
                        }
                        </div>
                    </>
                ):(
                    <Empty />
                )
            }
        </div>
    )
}
