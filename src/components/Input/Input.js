import React from "react";
import '../Input/Input.css'

function Input({ id, type, onChange, register = () => { }, validation, errors, ...rest }) {
    return (
        <>
            <input type={type} className="default-input" id={id} onChange={onChange} {...register(id, validation)} {...rest}></input>
            {errors && errors[id]?.type === "required" && (
                <span className="error">{errors[id]?.message}</span>
            )}
            {errors && errors[id]?.type === "minLength" && (
                <span className="error">{errors[id]?.message}</span>
            )}
        </>
    );
}

export default Input;