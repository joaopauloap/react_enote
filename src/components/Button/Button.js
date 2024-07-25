import React from "react";
import '../Button/Button.css';

function Button(props) {

    if (props.icon) {
        return (<button className="button-icon" id={props.id} onClick={props.onClick}>{props.icon}</button>)
    } else {
        return (<button className="default-button" id={props.id} onClick={props.onClick}>{props.value}</button>)
    }



}

export default Button;