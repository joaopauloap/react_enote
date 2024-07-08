import React from "react";
import './CardNote.css'

function CardNote(props){

    return(
        <div className="card-container">
            <div className="card-title"><h4>{props.title}</h4></div>
            <hr></hr>
            <div className="card-description">
                <p>{props.description}</p>
            </div>
        </div>
    );
    
}

export default CardNote;