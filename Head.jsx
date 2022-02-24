import React,{useState}  from "react";


function Head({number}) {


    return (
   
        <h3 style={{
            width: '50%',
            textAlign:'center',
            }}
        >
            To Do List! ({number})
        </h3>
        
    )
}

export default Head;