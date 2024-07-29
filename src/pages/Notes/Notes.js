import React, { useContext, useEffect, useState } from "react"
import API_URLS from "../../config/apiUrls"
import CardNote from "../../components/CardNote/CardNote"
import Button from "../../components/Button/Button"
import axiosInstance from "../../services/axiosInstance"
import useToggle from "../../hooks/useToggle"
import Modal from "../../components/Modal/Modal"
import { AlertContext } from "../../contexts/AlertContext"
import { MdOutlineNoteAdd } from "react-icons/md"
import { IoMdRefresh } from "react-icons/io"
import { IoTrashBinOutline } from "react-icons/io5"
import { useForm } from "react-hook-form"
import InputLabel from "../../components/InputLabel/InputLabel"
import Textarea from "../../components/Textarea/Textarea"
import './Notes.css'

function Notes() {
    const { showAlert } = useContext(AlertContext)
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
    const [listNote, setListNote] = useState([])
    const [note, setNote] = useState(null)
    const [isShowingModal, toggleModal] = useToggle()
    const [modalHeader, setModalHeader] = useState("")

    useEffect(() => {
        refreshNotes()
    }, [])

    useEffect(() => {
        if (!isShowingModal) {
            reset({ title: "", description: "" })
            setNote(null)
        }
    }, [isShowingModal, reset])

    function refreshNotes() {
        axiosInstance.get(API_URLS.NOTES)
            .then(res => {
                setListNote(res.data)
            })
            .catch(error => {
                console.log(error)
                showAlert((error.response?.data || error.message).slice(0, 100))
            })
    }

    function btnDeleteHandler() {
        //TODO
    }

    function callModalCreateNote() {
        setModalHeader("Criar nova nota")
        setValue("title", "")
        setValue("description", "")
        toggleModal(true)
    }

    function callModalViewNote(noteId) {
        setModalHeader("Visualizar nota")
        let foundNote = listNote.find(item => item.id === noteId)
        setNote(foundNote)
        if (foundNote) {
            setValue("title", foundNote.title)
            setValue("description", foundNote.description)
        }
        toggleModal(true)
    }

    function handleSubmitAction(data) {
        if (note != null) {
            updateNote(data)
        } else {
            createNote(data)
        }
    }

    function createNote(data) {
        let dataAtual = new Date(Date.now()).toISOString()
        let newNote = { title: data.title, description: data.description, date: dataAtual, userid: 1 }

        axiosInstance
            .post(API_URLS.NOTES, newNote)
            .then((response) => {
                console.log(response.data)
                if (response.data) {
                    toggleModal()
                    //TODO: Show success
                    refreshNotes()
                }
            })
            .catch((error) => {
                console.log(error)
                showAlert((error.response?.data || error.message).slice(0, 100))
            })
    }

    function updateNote(data) {
        let updateNote = { ...note, title: data.title, description: data.description }
        axiosInstance
            .put(API_URLS.NOTES, updateNote)
            .then((response) => {
                console.log(response.data)
                if (response.data) {
                    toggleModal()
                    //TODO: Show success
                    refreshNotes()
                }
            })
            .catch((error) => {
                console.log(error)
                showAlert((error.response?.data || error.message).slice(0, 100))
            })
    }

    return (
        <div className="container">
            <div className="page-title"><h3>Notas</h3></div>
            <hr />
            <div className="">
                <Modal header={modalHeader} show={isShowingModal} onCloseButtonClick={toggleModal} onConfirmButtonClick={handleSubmit(handleSubmitAction)}>
                    <InputLabel
                        placeholder="Título da nota"
                        id="title"
                        register={register}
                        validation={{
                            required: "Título é obrigatório",
                            minLength: {
                                value: 3,
                                message: "Digite o mínimo de 3 caracteres"
                            }
                        }}
                        errors={errors}
                    />
                    <div style={{ display: 'flex' }}>
                        <Textarea
                            placeholder="Escreva aqui seu conteúdo..."
                            id="description"
                            register={register}
                        />
                    </div>
                </Modal>

                <div className="page-options">
                    <Button id="btnNewNote" value="Novo" icon={<MdOutlineNoteAdd onClick={callModalCreateNote} />} />
                    <Button id="btnRefresh" value="Atualizar" icon={<IoMdRefresh onClick={refreshNotes} />} />
                    <Button id="btnDelete" value="Apagar" icon={<IoTrashBinOutline onClick={btnDeleteHandler} />} />
                </div>

                <div className="page-content panel-cards">
                    {
                        listNote && listNote.map(e => (
                            <CardNote key={e.id} id={e.id} title={e.title} description={e.description} onCardClick={callModalViewNote} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Notes
