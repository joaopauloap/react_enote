import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URLS from "../../config/apiUrls";
import './Notes.css';
import CardNote from "../../components/CardNote/CardNote";

function Notes() {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(API_URLS.GET_ALL_NOTES)
            .then(res => {
                setData(res.data)
            });
    }, [])

    return (
        <div className="container">
            <div className="pageTitle"><h1>Notas</h1></div>
            <hr></hr>
            <div className="panel-cards">
                {
                    data && data.map(e => (
                        <CardNote key={e.id} title={e.title} description={e.description} />
                    ))
                }
            </div>
        </div>
    );
}

export default Notes;