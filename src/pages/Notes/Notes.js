import React, { useContext, useEffect, useState } from "react";
import API_URLS from "../../config/apiUrls";
import CardNote from "../../components/CardNote/CardNote";
import Button from "../../components/Button/Button";
import axiosInstance from "../../services/axiosInstance";
import useToggle from "../../hooks/useToggle";
import Input from "../../components/Input/Input";
import Modal from "../../components/Modal/Modal";
import { AlertContext } from "../../contexts/AlertContext";
import { MdOutlineNoteAdd } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io";
import { IoTrashBinOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import './Notes.css';
import InputLabel from "../../components/InputLabel/InputLabel";
import Textarea from "../../components/Textarea/Textarea";

function Notes() {

    const [data, setData] = useState([])
    const { showAlert } = useContext(AlertContext)
    const [isShowingModal, toggleModal] = useToggle();
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        refreshNotes()
    }, [])

    function refreshNotes() {
        axiosInstance.get(API_URLS.NOTES)
            .then(res => {
                setData(res.data)
            })
            .catch(error => {
                console.log(error)
                showAlert((error.response?.data || error.message).slice(0, 100));
            })
    }

    function btnDeleteHandler() {

    }

    function createNewNote(data) {
        let dataAtual = new Date(Date.now()).toISOString()
        axiosInstance
            .post(API_URLS.NOTES, { title: data.titulo, description: data.conteudo, date: dataAtual, userid: 1 })
            .then((response) => {
                console.log(response.data)
                if (response.data) {
                    toggleModal()
                    refreshNotes()
                }
            })
            .catch((error) => {
                console.log(error)
                showAlert((error.response?.data || error.message).slice(0, 100));
            })
    }

    return (
        <div className="container">
            <div className="page-title"><h3>Notas</h3></div>
            <hr></hr>
            <div className="page-content">
                <Modal title="Criar nova nota" show={isShowingModal} onCloseButtonClick={toggleModal} onConfirmButtonClick={handleSubmit(createNewNote)}>
                    <div>
                        <InputLabel placeholder="Título" id="titulo" register={register} validation={{
                            required: "Título é obrigatório",
                            minLength: {
                                value: 3,
                                message: "Digite o mínimo de 3 caracteres"
                            }
                        }} errors={errors} />

                        <Textarea placeholder="Escreva aqui seu conteúdo..." id="conteudo" register={register} />
                    </div>
                </Modal>

                <div className="page-options">
                    <Button id="btnNewNote" value="Novo" icon={<MdOutlineNoteAdd onClick={toggleModal} />}></Button>
                    <Button id="btnRefresh" value="Atualizar" icon={<IoMdRefresh onClick={refreshNotes} />}></Button>
                    <Button id="btnDelete" value="Apagar" icon={<IoTrashBinOutline onClick={btnDeleteHandler} />}></Button>
                </div>

                <div className="panel-cards">
                    {
                        data && data.map(e => (
                            <CardNote key={e.id} title={e.title} description={e.description} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Notes;