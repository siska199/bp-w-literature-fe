/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import CardPDF from '../components/card/CardPDF'
import Header from '../components/Header'
import { API } from "../config/api";
import Empty from '../components/Empty';
import Swal from "sweetalert2";

export default function MyCollection() {
    const [data, setData] = useState('')

    useEffect(()=>{
        getMyCollections()
        return () => {
            setData(null);
          }
    },[])

    const getMyCollections =  async() => {
        await API.get('/my-collections')
        .then((res)=>{
            if (res?.status === 200) {
                setData([...res.data.data])
            }else{
                sweetAlert(false, "error", `${res.data.status}`);
            }
        })
        .catch((err)=>{
            sweetAlert(true, "error", `${err.response.data.message}`);
        })
    }
    
    const sweetAlert = (show = false, type = "", msg = "") => {
        Swal.fire({
          icon: type,
          title: msg,
          showConfirmButton: show,
          timer: 1500,
        });
      };
      
    return (
        <div className="container mt-5">
            <Header title="My Collections"/>
            {
                data[0] !='' &&
                <>
                    {
                        data[0]?(
                            <div className="row mt-4">
                                {
                                    data.map((d,i)=>(
                                        <CardPDF key={i} data={d} />
                                    ))
                                }
                            </div>
                        ):(
                            <Empty/>
                        )
                    }
                </>
            }
        </div>
    )
}
