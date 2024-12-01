import React from 'react'
import {BsSearch} from 'react-icons/bs';

export default function Search(props) {

    return (
        <>
            <input id="search" autoComplete="off"  name="title" value={props.value} onChange={props.handleOnChange} placeholder="Search for literature" className={`${props.big?"search-big":"search-small"} input-search me-2`} />
            <button onClick={()=>props.handleSearch("title")} className="btn-search">
                <BsSearch/> 
            </button>
        </>
    )
}
