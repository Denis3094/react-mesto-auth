import React from "react";
import closeBtn from "../images/close.svg";

function ImagePopup(props) {
    return (
        <section className={"popup popup_pic" + (props.isOpen && ' popup_opened')}>
            <div className="popup__pic-container">
                <button className="button popup__close popup__close_pic" type="button" aria-label="закрыть">
                    <img onClick={props.onClose} className="popup__close-img" src={closeBtn} alt="закрыть попап"/>
                </button>
                <img className="popup__photo" src={props.card.link} alt={props.card.name}/>
                <p className="popup__photo-title"/>
            </div>
        </section>
    )
}

export default ImagePopup