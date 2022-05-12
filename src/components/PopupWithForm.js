import closeBtn from "../images/close.svg";
import useCloseEscape from "../utils/useCloseEscape";

function PopupWithForm({
  name,
  title,
  buttonText,
  onSubmit,
  isOpen,
  onClose,
  children,
  closeAllPopups,
}) {

  useCloseEscape(isOpen, closeAllPopups)

  return (
    <section
      className={`popup popup_${name} ${isOpen && " popup_opened"}`}
      onMouseDown={onClose}
    >
      <div
        className="popup__container"
        onMouseDown={(evt) => evt.stopPropagation()}
      >
        <button
          className="button popup__close"
          type="button"
          aria-label="закрыть"
        >
          <img
            className="popup__close-img"
            src={closeBtn}
            alt="закрыть попап"
            onClick={onClose}
          />
        </button>
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          className="popup__form"
          name={name}
          method="post"
          noValidate
        >
          {children}
          <button
            className="popup__button popup__button_edit"
            type="submit"
            aria-label="сохранить"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
