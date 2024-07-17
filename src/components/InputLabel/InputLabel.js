import React from "react";
import './InputLabel.css'
import Input from "../Input/Input";

function InputLabel(props) {
    return (
        <div className="input-container">
            <label htmlFor={props.id}>{props.labelValue}</label>
            <Input type={props.type} id={props.id} onChange={props.onChange}></Input>
        </div>
    );
}

export default InputLabel;