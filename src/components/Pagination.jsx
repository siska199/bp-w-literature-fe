/* eslint-disable eqeqeq */
import React from 'react'

export default function Pagination(props) {

    const pageNumbers = []

    let i 
    if(props.currentPage<=5){
        i = 1
    }
    else if((props.currentPage-1)%5==0){
        i = props.currentPage
    }else{
        i = props.currentPage- (props.currentPage)%5 +1
    }

    while(pageNumbers.length<5){
        pageNumbers.push(i)
        if(i==props.maxPage){
            break;
        }
        i = i+1
    }
    return (
        <div className="container-pagination mb-5">
            {
                props.currentPage!=1&&(
                    <div className="text-center me-2 ">
                        <button className="btn-prev-next py-2 px-3" onClick={props.preview}>Preview</button>
                    </div>
                )
            }
            {   
                pageNumbers.map(number=>(
                    <div  key={number} onClick={() => props.paginate(number)} className="me-2 paginate-item text-center page-link" style={props.currentPage==number?{"color":"#18b0df","backgroundColor":"#d4d0cf"}:{"color":"grey"}} >
                        {number}
                    </div>
                ))
            }
            {
                props.maxPage!==props.currentPage &&
                <div className=" text-center ">
                    <button className="py-2 px-3 btn-prev-next" onClick={props.next}>Next</button>
                </div>

            }
        </div>
    )
}