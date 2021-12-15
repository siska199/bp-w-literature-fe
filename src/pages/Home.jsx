/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, {useEffect, useState} from 'react'
import {Col} from "react-bootstrap";
import CardPDF from './../components/card/CardPDF';
import Search from '../components/search/Search';
import Empty from '../components/Empty';
import Pagination from '../components/Pagination';
import { RiQuillPenFill } from 'react-icons/ri';
import { API } from "../config/api";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

export default function Home() {
    let { status } = useParams();

    const [search, setSearch] = useState(false)
    const [filter, setFilter] = useState({
        title: '',
        year : 'All'
    })
    const [years, setYears] = useState([])
    const [data, setData] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(()=>{
        if(status=="list-of-books"){
            setSearch(true)
            getBook(`/literatures?status=Approve&title=${filter.title}&year=All`)
        }else{
            setSearch(false)
        }
        getYears()
    },[])


    const getYears =  async() => {
        await API.get('/years')
        .then((res)=>{
            if (res?.status === 200) {
                const dataYears = res.data.data.map(d=>d.year)
                dataYears.sort(function(a, b){return b - a});
                setYears(dataYears)
            }else{
                sweetAlert(false, "error", `${res.data.status}`);
            }
        })
        .catch((err)=>{
            sweetAlert(true, "error", `${err.response.data.message}`);
        })
    }

    const handleOnChange = (e) => {
        setFilter({
            ...filter,
            [e.target.getAttribute("name")]: e.target.value,
        });
        if(e.target.getAttribute("name")=="year"){
            handleSearch("year", e.target.value)
        }
        if(search){
            if(e.target.value==''){
                handleSearch('')
            }
        }
 
    }

    useEffect(()=>{
        setCurrentPage(1)
    },[filter.year])

    const handleSearch =  async(type,value) => {
        if(!search){
            setSearch(true)
        }
        if(value && type=="year"){
            getBook(`/literatures?status=Approve&title=${filter.title}&year=${value}`)
        }else{
            getBook(`/literatures?status=Approve&title=${filter.title}&year=${filter.year}`)
        }
    }

    const postsPerPage = 12
    const [totalPagination, setTotalPagination] = useState(5)
    const [maxPage, setMaxPage] = useState(0)

    const getBook = async(url)=>{
        await API.get(url)
        .then((res)=>{
            if(res.status==200){
                setData([...res.data.data])
                setMaxPage(Math.ceil(res.data.data.length/postsPerPage))
                if(res.data.data.length<=60){
                    setTotalPagination(Math.ceil(res.data.data.length/postsPerPage))
                }
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
        <>
            {
                search?(
                    <HomeSearchResult maxPage={maxPage}  setCurrentPage={ setCurrentPage} currentPage={currentPage} postsPerPage={postsPerPage} totalPagination={totalPagination} handleSearch={handleSearch} years={years} filter={filter} handleOnChange={handleOnChange} data={data}  />
                ):(
                    <HomeSearch filter={filter} handleOnChange={handleOnChange}  handleSearch ={handleSearch }/>
                )
            }
        </>
    )
}
function HomeSearch (props){
    return(
        <div className="container container-page-search">
            <div className="row justify-content-center container-search">
                <p className="search-title text-center">
                    Literature
                    <RiQuillPenFill/>
                </p>
                <div className="text-center">
                    <Search big={true}  value={props.filter.title} handleOnChange={props.handleOnChange} handleSearch={props.handleSearch} />
                </div>
            </div>
        </div>
    )
}

function HomeSearchResult(props){
    const indexOfLastPost = props.currentPage * props.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - props.postsPerPage;
    const currentPosts = props.data.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber)=>{
        props.setCurrentPage(pageNumber)
    }
    const preview = ()=>{
        const page = props.currentPage-1
        props.setCurrentPage(page)
    }
    const next = ()=>{
        const page = props.currentPage+1
        props.setCurrentPage(page)
    }

    return(
            <div className="container mt-5">
                <div className="row">
                    <div>
                        <Search value={props.filter.title} handleOnChange={props.handleOnChange} handleSearch={props.handleSearch}/>
                    </div>
                </div>
    
                <div style={{"paddingBottom":"30px"}} className="mt-5 row">
    
                    <Col  lg={2} md={12} sm={12} xs={12} >
                        <div className="years-container">
                            <div className="label-select-years mb-1 ">Anytime</div>
                            <select name="year" value={props.filter.year} onChange={props.handleOnChange} id="year-filter" className="option-years" >
                                <option  value="All" >
                                    Since All Years
                                </option>
                                {
                                    props.years.map((y,i)=>(
                                        <option key={i} value={y}>Since {y}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </Col>
                    
                    <Col  lg={10} md={12} sm={12} xs={12} >
                        {
                            props.data&&
                            <>
                                {
                                    props.data[0]?(
                                        <div className="row container-result-pdf justify-content-lg-start justify-content-md-start  justify-content-sm-start justify-content-center">
                                            {
                                                currentPosts.map((d,i)=>(
                                                    <CardPDF key={i} data={d} small={true}/>
                                                ))
                                            }
                                        </div>
                                    ):(
                                        <Empty/>
                                    )
                                }
                            </>
                        }
                    </Col>
                </div>
                {
                    props.maxPage?(
                    <Pagination  maxPage={props.maxPage}  next={next} preview ={preview} currentPage={props.currentPage} totalPagination={props.totalPagination} paginate={paginate} />

                    ):(
                        <>
                        </>
                    )
                }
            </div>
    )
}