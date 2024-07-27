import React from "react";
import './Textarea.css'

export default function Textarea({ id, rows, onChange, register = () => { }, validation, errors, ...rest }) {
    return (
        <>
            <textarea rows={(rows > 0) ? rows : 5} className="default-textarea" id={id} onChange={onChange} {...register(id, validation)} {...rest}>
            </textarea>
            {errors && errors[id]?.type === "required" && (
                <span className="error">{errors[id]?.message}</span>
            )}
            {errors && errors[id]?.type === "minLength" && (
                <span className="error">{errors[id]?.message}</span>
            )}
        </>
    );
}
