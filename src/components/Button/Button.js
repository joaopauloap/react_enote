import React from "react";
import '../Button/Button.css';

function Button(props){
    return(
        <button className="default-button" id={props.id} onClick={props.onClick}>{props.value}</button>
    );
}

export default Button;