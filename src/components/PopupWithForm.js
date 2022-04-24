import React from "react";
import closeBtn from "../images/close.svg";

function PopupWithForm(props) {
    return (
        <section className={`popup popup_${props.name}` + (props.isOpen && ' popup_opened')}>
            <div className="popup__container ">
                <button className="button popup__close" type="button"
                        aria-label="закрыть">
                    <img className="popup__close-img" src={closeBtn}
                         alt="закрыть попап" onClick={props.onClose}/>
                </button>
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" name={props.name} method="post" noValidate>
                    {props.children}
                    <button className="popup__button popup__button_edit" type="submit"
                            aria-label="сохранить">{props.buttonText}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm