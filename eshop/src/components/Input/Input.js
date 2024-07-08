import React from "react";
import '../Input/Input.css'

function Input(props){
    return (
        <input type={props.type} className="default-input" id={props.id} onChange={props.onChange}></input>
    );
}

export default Input;