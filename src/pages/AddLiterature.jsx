/* eslint-disable eqeqeq */
import React, {useState} from 'react'
import Header from '../components/Header'
import {MdAttachFile} from "react-icons/md"
import { API } from "../config/api";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";

export default function AddLiterature() {
    const initialForm = {
        title : '',
        publicationDate : '',
        pages : '',
        isbn : '',
        author : '',
        file:''
    }
    const [form, setForm] = useState(initialForm)
    const [nameFile, setNameFile] = useState('')
    const [loading, setLoading] = useState(false)
    const label = ["Title", "Publication Date", "Pages", "ISBN", "Author", "Attache Book File"]
    const handleOnChange = (e) =>{
        if(e.target.type == "file"){
            setNameFile(e.target.files[0].name )
        }
        setForm({
            ...form,
            [e.target.getAttribute("name")]:
            e.target.type === "file" ? e.target.files[0] : e.target.value,
        })
    }

    const handelOnSubmit = async(e) =>{
        e.preventDefault();                
        Swal.fire({
            icon: "warning",
            title: "Are You Sure To Add This Literature?",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes, I am sure!",
            cancelButtonText: "No, cancel it!",
            backdrop: true,
          }).then(
            function (dismiss) {
              if (dismiss.isConfirmed) {
                addLiterature();
              }
            },
            function (dismiss) {
              if (dismiss == "cancel") {
              }
            }
          );
    }

    const addLiterature = async ()=>{
        try {
            setLoading(true)
            const config = {
              headers: {
                "Content-Type": "application/json",
              },
            };

            const formData = new FormData(); 
            for (const key in form) {
              if (key === "file") {
                formData.append("pdf", form[key]);
              } else {
                formData.append(String(key), form[key]);
              }
            }
            const response = await API.post("/literature", formData, config); 
            if (response.status == 200) {
                setForm(initialForm);
                setNameFile('')
                setTimeout(()=>{
                    setLoading(false)
                },1000)
                sweetAlert(false, "success", "Add Book Success");
              } else {
                sweetAlert(false, "info", `${response.data.status}`);
                setLoading(false)
              }
        } catch (error) {
            sweetAlert(false, "info", `${error.response.data.message}`);
            setLoading(false)
        }
    }

    const sweetAlert = (show = false, type = "", msg = "") => {
        Swal.fire({
          icon: type,
          title: msg,
          showConfirmButton: show,
          timer: 2000,
        });
      };
    return (
        <div className="container my-5">
            <Header title="Add Literature" />
            <form autoComplete="off" onSubmit={handelOnSubmit} action="">
                <div className="row">
                    {
                        Object.entries(form).map(([key, value], i)=>(
                            <InputGroup nameFile={nameFile}  key={i} name={key} label={label[i]} value={value} onChange={handleOnChange} />
                        ))
                    }
                </div>
                <div className="text-end ">
                    <button className="btn-add-literature">
                        Add Literature {
                            loading && <FaSpinner icon="spinner" className="spinner" />
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

function InputGroup (props){
    return(
        <div className="d-grid mb-3">
            {
                props.name==="file"?(
                    <div className="row">
                        <div className="col  col-4">
                            <label  htmlFor="image" style={{color:"grey",cursor:"pointer"}} className="inp-file input-add-literature">
                                {props.label}<MdAttachFile size="25px"/>
                            </label>
                            <input hidden type="file" id="image" name={props.name} onChange={props.onChange} />
                        </div>
                        <div className="col col-lg-6 col-md-6 col-sm-8 d-flex align-items-center">
                            <span className="pdf-name">
                                {props.nameFile}
                            </span>
                        </div>
                    </div>
                ):(
                    <input type={props.name=="publicationDate"?"date":"text"}  className="input-add-literature" value={props.value} onChange={props.onChange} name={props.name} placeholder={props.label} />
                )
            }
        </div>
    )
}