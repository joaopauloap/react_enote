import React from "react";
import Modal from "../Modal/Modal";
import InputLabel from "../InputLabel/InputLabel";
import Textarea from "../Textarea/Textarea";

export default function ModalCardNote(props) {
    <Modal title={props.title} show={isShowingModal} onCloseButtonClick={toggleModal} onConfirmButtonClick={handleSubmit(createNewNote)}>
        <InputLabel placeholder="Título" id="titulo" register={register} validation={{
            required: "Título é obrigatório",
            minLength: {
                value: 3,
                message: "Digite o mínimo de 3 caracteres"
            }
        }} errors={errors} />
        <div style={{ display: 'flex' }}>
            <Textarea placeholder="Escreva aqui seu conteúdo..." id="conteudo" register={register} />
        </div>
    </Modal>
}