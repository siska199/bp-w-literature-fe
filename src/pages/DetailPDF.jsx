/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from 'react'
import {Col} from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import {BsBookmarkHeart} from "react-icons/bs"
import {BsCloudDownload} from "react-icons/bs"
import {TiDelete} from "react-icons/ti"
import { API } from "../config/api";
import Swal from "sweetalert2";
import FileDownload from 'js-file-download'
import { FaSpinner } from "react-icons/fa";

export default function DetailPDF() {
    const [statusColl, setStatusColl] = useState(false)
    const [collButton, setCollButton] = useState(true)
    const [render,setRender] = useState(false)
    const [idColl, setIdColl] = useState('')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const { dataUser } = useContext(UserContext);
    let { id } = useParams();

    useEffect(()=>{
        getDetailPDF()
        getStatusColl()
    },[])

    useEffect(()=>{
       getStatusColl()
    },[render])
    
    const getDetailPDF =  async() => {
        await API.get('/literature/'+id)
        .then((res)=>{

            if(res.status==200){
                if(res.data.data.idUser==dataUser.id){
                    setCollButton(false)
                }
                let publicationDate = new Date(res.data.data.publicationDate)
                publicationDate = publicationDate.toDateString().split(' ')
                publicationDate.splice(0,1)
                publicationDate.splice(1,1)
                setData({
                    ...res.data.data,
                    publicationDate : publicationDate.join(' ')
                })
            }else{
                sweetAlert(false, "error", `${res.data.status}`);
            }
        })
        .catch((err)=>{
            sweetAlert(true, "error", `${err.response.data.message}`);
         }
        )
    }

    const getStatusColl =  async() => {
        await API.get('/collection/'+id)
        .then((res)=>{            
            if(res.data.data==null){
                setStatusColl(false)
            }else{
                setIdColl(res.data.data.id)
                setStatusColl(true)
            }
        })
        .catch((err)=>{
            sweetAlert(true, "error", `${err.response.data.message}`);
        })
    }

    const handleAddCollection = async()=>{
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await API.post("/collection",JSON.stringify({idLiterature:id}), config);
            if (response?.status === 200) {
                setRender(!render)
                sweetAlert(false, "success", "Success Add To My Collections");
            }else{
                sweetAlert(false, "error", `${response.data.status}`);
            } 
        } catch (error) {
            sweetAlert(true, "error", `${error.response.data.message}`);
        }
    }
    const handleRemoveCollection = async()=>{
        try {
            const response = await API.delete("/collection/"+idColl);
            if (response?.status === 200) {
                setRender(!render)
                sweetAlert(false, "success", "Success Remove Collection");
            }else{
                sweetAlert(false, "error", `${response.data.status}`);
            } 
        } catch (error) {
            sweetAlert(true, "error", `${error.response.data.message}`);
        }
    }

      
  const sweetAlert = (show = false, type = "", msg = "") => {
    Swal.fire({
      icon: type,
      title: msg,
      showConfirmButton: show,
      timer: 1500,
    });
  };

  const handleDownload = async() =>{
    await API.get('/download-literature/'+data.id,  { responseType: 'blob' })
    .then(res=>{
        setLoading(true)
        FileDownload(res.data, `${data?.title}.pdf`)
        setLoading(false)
    })
    .catch(err=>{
        sweetAlert(true, "error", `${err.response.data.message}`);
    })
  }

// <img className="thumb-big-pdf shadow-lg" src={data.thumbnail} alt="Iframe Example"/>

    return (
        <div className="container py-3 my-5">

            <div className="row justify-content-center">
                <Col className="d-flex align-items-center justify-content-center" lg={4} md={6} sm={6} xs={12}>
                    <div style={{cursor:"pointer"}} >
                        <img className="thumb-big-pdf shadow-lg" src={data.thumbnail} alt="Iframe Example"/>
                    </div>
                </Col>
                
                <Col className="py-3" lg={`${!collButton?5:5}`} md={`${!collButton?6:6}`} sm={`${!collButton?6:6}`} xs={`${!collButton?9:9}`} >
                    <div className="row mb-lg-4 mb-md-4 mb-sm-4 mb-2">
                        <div className="title-detail-pdf ">{data.title}</div>
                        <div className="mt-lg-2 mt-md-2 mt-sm-2 p-detail-pdf">{data.author} </div>
                    </div>

                    <div className="row mb-lg-4 mb-md-4 mb-sm-4 mb-2">
                        <div className="label-detail-pdf">
                            Publication Date
                        </div>
                        <div className="mt-lg-2 mt-md-2 mt-sm-2  p-detail-pdf">
                            {data.publicationDate}
                        </div>
                    </div>

                    <div className="row mb-lg-4 mb-md-4 mb-sm-4 mb-2">
                        <div className="label-detail-pdf">
                            Pages
                        </div>
                        <div className="mt-lg-2 mt-md-2 mt-sm-2  p-detail-pdf">
                            {data.pages}
                        </div>
                    </div>


                    <div className="row mb-lg-4 mb-md-4 mb-sm-4 mb-2">
                        <div className="label-detail-pdf">
                            ISBN
                        </div>
                        <div className="mt-lg-2 mt-md-2 mt-sm-2  p-detail-pdf">
                            436788654422467899
                        </div>
                    </div>

                    <div>
                        <button onClick={()=>handleDownload()} className="btn-pdf-detail">
                            Download &nbsp;
                            {
                            loading? (<FaSpinner icon="spinner" className="spinner" />)
                            :(
                                <BsCloudDownload/>
                            )
                            }
                        </button>
                    </div>
                </Col>
                {
                    collButton && 
                    <Col className="pt-lg-3 pt-md-3 pt-sm-1 pt-0"  lg={{offset:0, span:2}} md={{offset:6, span:6}} sm={{offset:6, span:6}} xs={{offset:3, span:12}}>
                        {
                            !statusColl?(
                                <button onClick={()=>handleAddCollection()} className="btn-pdf-detail btn-coll">
                                    Add Collection <BsBookmarkHeart/>
                                </button>
                            ):(
                                <button onClick={()=>handleRemoveCollection()} className="btn-pdf-detail  btn-coll">
                                    Remove Collection <TiDelete size="30px"/>
                                </button>
                            )
                        }
                    </Col>
                }
            </div>
        </div>
    )
}
