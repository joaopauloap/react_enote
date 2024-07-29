import React from "react";
import './Input.css'

export default function Input({ id, type, value, onChange, register = () => { }, validation, errors, ...rest }) {
    return (
        <>
            <input type={type} value={value} className="default-input" id={id} onChange={onChange} {...register(id, validation)} {...rest}></input>
            {errors && errors[id]?.type === "required" && (
                <span className="error">{errors[id]?.message}</span>
            )}
            {errors && errors[id]?.type === "minLength" && (
                <span className="error">{errors[id]?.message}</span>
            )}
        </>
    );
}
