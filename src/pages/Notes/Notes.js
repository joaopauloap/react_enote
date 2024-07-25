import React, { useContext, useEffect, useState } from "react";
import API_URLS from "../../config/apiUrls";
import CardNote from "../../components/CardNote/CardNote";
import Button from "../../components/Button/Button";
import axiosInstance from "../../services/axiosInstance";
import { AlertContext } from "../../contexts/AlertContext";
import { MdOutlineNoteAdd } from "react-icons/md";
import './Notes.css';
import { render } from "@testing-library/react";
import Alert from "../../components/Alert/Alert";

function Notes() {

    const [data, setData] = useState([])
    const { showAlert } = useContext(AlertContext)

    useEffect(() => {
        axiosInstance.get(API_URLS.NOTES)
            .then(res => {
                setData(res.data)
            })
            .catch(error => {
                console.log(error)
                showAlert((error.response?.data || error.message).slice(0, 100));
            })
    }, [])



    function btnNewNoteHandler(){
        render(<Alert message={"teste"} onClose={createNewNote}></Alert>)
    }

    function createNewNote(){
        alert("nota criada")
    }

    return (
        <div className="container">
            <div className="page-title"><h1>Notas</h1>
                <div className="page-options">
                    <Button id="btnNewNote" value="Novo" icon={<MdOutlineNoteAdd onClick={btnNewNoteHandler}/>}></Button>
                    {/* <Button id="btnOrdenar" value="Ordenar"></Button> */}
                </div>
            </div>
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