/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, {useEffect, useState, useRef} from 'react'
import Header from '../components/Header'
import DetailProfile from '../components/DetailProfile';

import TabNav from '../components/tabNavbar/TabNav'
import ContentTabNavbar from '../components/tabNavbar/ContentTabNavbar'

import { API } from "../config/api";
import {Tooltip, OverlayTrigger, Col} from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import {MdPhoneIphone} from 'react-icons/md';
import { FaAddressCard } from 'react-icons/fa';
import Swal from "sweetalert2";
export default function Profile() {
    const targetImg = useRef(null)
    const initialValue = {
        fullName : '',
        email : '',
        phone : '',
        address : ''
    }
    const [data, setData] = useState([])
    const [form, setForm] = useState(initialValue)
    const [image, setImage]=useState({
        file : '',
        url :''
    })
    const [edit, setEdit] = useState(false)

    useEffect(()=>{
        getMyLiterature()
        getMyProfile()
        window.scrollTo(0, 0)
        return()=>{
            setForm(initialValue)
            setToggleTab(null)
            setImage('')
            setData('')
        }   
    },[])

    const detailProfile = [
        {
            label : "Full Name",
            icon : <FaUser color="#AC47F5" size="25px"/>,
        },
        {
            label : "Email",
            icon : <MdEmail color="#47bef5" size="25px"/>,
        },
        {
            label : "Phone",
            icon : <MdPhoneIphone color="#f547ca" size="25px"/>,
        },
        {
            label : "Address",
            icon : <FaAddressCard color="#f5af47" size="25px"/>,

        }
    ]

    const getMyLiterature =  async() => {
        await API.get('/my-literatures')
        .then((res)=>{
            setData([...res.data.data])
        })
        .catch((err)=>{
            sweetAlert(true, "error", `${err.response.data.message}`);
        })
    }

    const getMyProfile =  async() => {

        await API.get('/profile')
        .then((res)=>{
            if (res?.status === 200) {
                setImage({
                    ...image,
                    url : res.data.data.image
                })
                setForm({
                    fullName : res.data.data.fullName,
                    email : res.data.data.email,
                    phone : res.data.data.phone,
                    address : res.data.data.address
                })
            }else{
                sweetAlert(false, "error", `${res.data.status}`);
            }
        })
        .catch((err)=>{
            sweetAlert(true, "error", `${err.response.data.message}`);
        })
    }

    const handleEdit = () =>{
        setEdit(true)
    }

    const handleSaveEdit = async()=>{
        try {
            const config = {
              headers: {
                "Content-type": "multipart/form-data",
              },
            };
            let formData = new FormData();
            for (const key in form) {
                formData.append(String(key), form[key]);
            }
            if(image.file!=''){
                formData.append("image", image.file);
            }
            const response = await API.patch("/user", formData, config);
            setEdit(false)
            if (response.status === 200) {
              sweetAlert(true, "success", "Updated Profile Success");
            }else{
                sweetAlert(false, "error", `${response.data.status}`);
            }
          } catch (error) {
            sweetAlert(true, "info", `${error.response.data.message}`);
          }
    }

    const sweetAlert = (show = false, type = "", msg = "") => {
        Swal.fire({
          icon: type,
          title: msg,
          showConfirmButton: false,
          timer: 1500,
          backdrop: show,
        });
      };

    const handleOnChange = (e)=>{
        if (e.target.files) {
            const file = e.target.files;
            const fileURL = URL.createObjectURL(file[0]);
            setImage({
                url : fileURL,
                file : file[0]
            });
        }else{
            setForm({
                ...form,
                [e.target.getAttribute("name")]:e.target.value,
            })
        }

    }

    //Logic for Key
    const [toggleTab, setToggleTab] = useState(1);
    const handleToggleTab = (index)=>{
        setToggleTab(index)
    }


    return (
        <div style={{overflow:"hidden"}} className="container my-5">
            <div className="ms-4">
                <Header title="Profile"/>
            </div>
            <div className="row justify-content-center">
                <Col lg={2} md={3} sm={3} xs={12} className="ms-2 text-center container-picture-profile ">
                    {
                        !edit?(
                            <>
                                <div className=" mb-lg-4 mb-md-4 mb-sm-4 mb-2 avatar ">
                                    <img alt="" src={image.url} className="img-fluid "/>
                                </div>
                                <button onClick={()=>handleEdit()} className="btn-edit-profile mt-3 mb-lg-0 mb-md-0 mb-sm-0 mb-4">Edit Profile</button>
                            </>
                        ):(
                            <>
                                <OverlayTrigger
                                    delay={{ hide: 450, show: 300 }}
                                    overlay={(props) => (
                                    <Tooltip {...props}>
                                        Klik to Change image profile
                                    </Tooltip>
                                    )}
                                    placement="bottom">
                                    <div style={{cursor:"pointer"}} className="avatar mb-lg-4 mb-md-4 mb-sm-4 mb-2 " onClick={()=>targetImg.current.click()}>

                                        <img alt="" src={image.url} className="img-fluid "/>
                                        <input ref={targetImg} hidden type="file" accept="image/*" onChange={handleOnChange}/>

                                    </div>
                                </OverlayTrigger>
                                <button onClick={()=>handleSaveEdit()} className="btn-save-profile  mt-3 mb-lg-0 mb-md-0 mb-sm-0 mb-4">Save Profile</button>
                            </>
                        )
                    }
                </Col>

                <Col lg={{span:8,offset:1}} md={{span:7,offset:1}} sm={{span:7, offset:1}} >

                    <form className="container-detail px-4 shadow-lg py-3" autoComplete="off" >
                    {
                        Object.entries(form).map(([key, value], i) =>(
                            <DetailProfile detailProfile={detailProfile[i]} handleOnChange={handleOnChange} edit={edit} key={i} idKey={key} value={value}/>        
                        ))
                    }
                    </form>
                </Col>

            </div>

            <div style={{marginTop:"100px"}} className="row ms-auto">
                <Header title="My Literature"/>
            </div>

            <div className="row justify-content-content-center">
                <TabNav tabLabel={"Pending"} index={1} handleToggleTab={handleToggleTab} toggleTab={toggleTab}/>
                <TabNav tabLabel={"Proove"} index={2} handleToggleTab={handleToggleTab} toggleTab={toggleTab}/>
                <TabNav tabLabel={"Cancel"} index={3} handleToggleTab={handleToggleTab} toggleTab={toggleTab}/>
            </div>

            <div className="row border justify-content-content-center py-2">
                <ContentTabNavbar data={data.filter(d=>d.status=="Pending")} index={1} toggleTab={toggleTab}/>
                <ContentTabNavbar data={data.filter(d=>d.status=="Approve")}  index={2} toggleTab={toggleTab}/>
                <ContentTabNavbar tabLabel={"Cancel"} data={data.filter(d=>d.status=="Rejected")}  index={3} toggleTab={toggleTab}/>
            </div>
        </div>
    )
}
