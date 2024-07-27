import ReactDOM from 'react-dom';
import './Modal.css'
import Button from '../Button/Button';

export default function Modal({ children, title, show, onCloseButtonClick, onConfirmButtonClick }) {
    if (!show) return null;
    
    return ReactDOM.createPortal(

        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="close" onClick={onCloseButtonClick}>&times;</button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <Button onClick={onCloseButtonClick}>Cancelar</Button>
                        <Button onClick={onConfirmButtonClick}>Confirmar</Button>
                    </div>
                </div>
            </div>
        </div>
        , document.body
    )
}

