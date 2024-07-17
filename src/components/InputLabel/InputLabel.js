import React from "react";
import './InputLabel.css'
import Input from "../Input/Input";

export default function InputLabel({ id, labelValue, type, onChange, register = () => { }, validation, errors, ...rest }) {
    return (
        <div className="input-container">
            <label htmlFor={id}>{labelValue}</label>
            <Input type={type} id={id} onChange={onChange} register={register} validation={validation} errors={errors} {...rest}></Input>
        </div>
    );
}