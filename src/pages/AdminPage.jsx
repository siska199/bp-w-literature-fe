/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, {useState, useEffect} from 'react'
import Empty from "../components/Empty";
import {BsCheckCircleFill } from "react-icons/bs";
import {MdCancel } from "react-icons/md";
import { Col } from "react-bootstrap";
import { API } from "../config/api";
import Swal from "sweetalert2";

export default function AdminPage() {

    const [data, setData] = useState('');
    const [render, setRender] = useState(false);
    const [totalData, setTotalData] =useState('')
    useEffect(() => {
      setTimeout(()=>{
        getData();
      },500)
    }, [render]);


    const handelRender = () => {
        setRender(!render);
    };

    const getData = async () => {
        try {
            const res = await API.get("/literatures")
            setData([...res.data.data]);
            setTotalData(res.data.totalData)
        } catch (error) {
          sweetAlert(true, "error", `${error.response.data.message}`);
        }
    };
    const sweetAlert = (show = false, type = "", msg = "") => {
        Swal.fire({
        icon: type,
        title: msg,
        showConfirmButton: false,
        timer: 1500,
        backdrop: show,
        });
    };
    return (
        <div style={{overflow:"hidden"}} className="container verify-container my-5">
            <div className="row mt-5">
                <p className=" title-admin">
                    Book Verification
                </p>
            </div>

            <div  className="container ">
            {
              totalData && (
                <DataCount totalData={totalData}/>
              )
            }
            </div>

            <div style={{ fontSize: "14px" }} className="container ">
              {
                data && 
                <>
                    {data?.length != 0 ? (
                      <>
                          <ListHeader />
                          {data?.map((d, i) => {
                              return (
                              <ListData sweetAlert={sweetAlert}
                                  handelRender={handelRender}
                                  key={i}
                                  no={i + 1}
                                  d={d}
                              />
                              );
                          })}
                      </>
                      ) : (
                          <Empty/>
                      )
                  }

                </>
              }
            </div>

        </div>
    )
}

function ListHeader() {
  return (
    <div
      style={{ fontWeight: "bold", backgroundColor: "white" }}
      className="row pt-4 h-list-transaction"
    >
      <Col xl={2} md={1} sm={1} xs={1}>
        No
      </Col>
      <Col xl={2} md={2} sm={2} xs={2}>
        Users of Authors
      </Col>
      <Col xl={2} md={3} sm={3} xs={2}>
        ISBN
      </Col>
      <Col xl={2} md={2} sm={2} xs={3}>
        Literature
      </Col>
      <Col xl={2} md={2} sm={2} xs={2}>
        <div className="text-center">
            Status
        </div>
      </Col>
      <Col className="text-center" xl={2} md={2} sm={2} xs={2}>
        Action
      </Col>
      <hr style={{ height: "2px", marginBottom: "-0px" }} className="mt-3" />
    </div>
  );
}

function DataCount(props){
  return(
    <div className="row justify-content-center">
      <Col className="text-center" xl={4} md={4} sm={4} xs={4}>
        <div className="d-pending ">
          Literature Pending {props.totalData.pending}
        </div>
      </Col>
      <Col className="text-center" xl={4} md={4} sm={4} xs={4}>
        <div className="d-approve">
          Literature Approve {props.totalData.approve}
        </div>
      </Col>
      <Col className="text-center" xl={4} md={4} sm={4} xs={4}>
        <div className="d-rejected">
          Literature Rejected {props.totalData.reject}
        </div>
      </Col>
      <hr style={{ height: "2px", marginBottom: "-0px" }} className="mt-3" />
    </div>
  )
}


function ListData({ no, d, handelRender, sweetAlert }) {

  const handelApprove = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      let formData = new FormData();
      formData.append("status", "Approve");
      await API.patch(`/literature/${id}`, formData, config);
      sweetAlert(true, "success", "Approve Literature Success");
      handelRender();
    } catch (error) {
      sweetAlert(true, "error", `${error.response.data.message}`);
    }
  };

  const handelRejected = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      let formData = new FormData();
      formData.append("status", "Rejected");
      await API.patch(`/literature/${id}`, formData, config);
      sweetAlert(true, "info", "Rejected Literature Success");
      handelRender();
    } catch (error) {
      sweetAlert(true, "error", `${error.response.data.message}`);
    }
  };


  return (
    <>
      <div
        style={{ backgroundColor: `${no % 2 === 0 ? "white" : "#F9F9F9"}` }}
        className="row pt-3 p-list-transaction"
      >
        <Col xl={2} md={1} sm={1} xs={1}>
          {no}
        </Col>
        <Col xl={2} md={2} sm={2} xs={2}>
            <div className="text-overflow">
                {d.user.fullName}
            </div>
        </Col>
        <Col xl={2} md={3} sm={3} xs={2}>
            <div className="text-overflow">
                {d.isbn}
            </div>
        </Col>
        <Col xl={2} md={2} sm={2} xs={3}>
          <div  onClick={()=>window.open(d.file, "_blank")} className="text-overflow check-pdf">
            {d.title}
          </div>
        </Col>
        <Col xl={2} md={2} sm={2} xs={2} >
          <div
            className="status text-center"
            style={{
              color: `${(() => {
                switch (d.status) {
                  case "Pending":
                    return "#F7941E";
                  case "Approve":
                    return "#0ACF83";
                  case "Rejected":
                    return "#FF0742";
                  default:
                    return "";
                }
              })()}`,
            }}
          >
            {(() => {
              switch (d.status) {
                case "Pending":
                  return "Pending";
                case "Approve":
                  return "Approve";
                case "Rejected":
                  return "Cancel";
                default:
                  return "";
              }
            })()}
          </div>
        </Col>
        <Col  className="text-center px-2"  xl={2} md={2} sm={2} xs={2}>
            {
                d.status=="Pending"?(
                <>
                    <button onClick={()=>handelApprove(d.id)} style={{"backgroundColor":"#AC47F5"}} className="py-2 btn-admin ms-1">
                        Approve
                    </button>
                    <button onClick={()=>handelRejected(d.id)} style={{"backgroundColor":"#FFD35C"}} className="py-2 btn-admin ms-lg-2  ms-1">
                        Cancel
                    </button>
                </>
                ):(
                    <>
                        {d.status=="Approve"?(
                            <BsCheckCircleFill
                                color="#2FC5F7"
                                className="ms-2"
                                size="25px"
                            />
                        ):(
                            <MdCancel 
                                color="red"
                                className="ms-2"
                                size="30px"
                            />
                        )}
                    </>

                )
            }

        </Col>
        <hr style={{ height: "2px", marginBottom: "-0px" }} className="mt-3" />
      </div>
    </>
  );
}