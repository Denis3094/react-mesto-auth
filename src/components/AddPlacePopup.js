import PopupWithForm from "./PopupWithForm";
import {useState} from "react";

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isLoading,
  closeAllPopups,
}) {

  const [addPlaceName, setAddPlaceName] = useState("");
  const [addPlaceLink, setAddPlaceLink] = useState("");

  function handleChangeAddPlaceName(evt) {
    setAddPlaceName(evt.target.value);
  }

  function handleChangeAddPlaceLink(evt) {
    setAddPlaceLink(evt.target.value);
  }

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    onAddPlace({
      name: addPlaceName,
      link: addPlaceLink,
    });
    setAddPlaceName("");
    setAddPlaceLink("");
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      buttonText={isLoading ? "Идет создание карточки..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      closeAllPopups={closeAllPopups}
    >
      <input
        value={addPlaceName}
        onChange={handleChangeAddPlaceName}
        id="title"
        type="text"
        className="popup__input popup__input_type_title"
        placeholder="Название"
        name="name"
        required
        minLength={2}
        maxLength={30}
      />
      <span id="error-title" className="popup__error" />
      <input
        value={addPlaceLink}
        onChange={handleChangeAddPlaceLink}
        id="link"
        type="url"
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        name="link"
        required
      />
      <span id="error-link" className="popup__error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
