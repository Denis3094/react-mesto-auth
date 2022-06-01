import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";
import useCloseEscape from "../hooks/useCloseEscape";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
  closeAllPopups,
}) {
  const [avatarLink, setAvatarLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarLink }, () => setAvatarLink(""));
  }

  function handleChangeAvatar(evt) {
    setAvatarLink(evt.target.value);
  }

  useCloseEscape(isOpen, closeAllPopups);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      buttonText={isLoading ? "Обновление аватара..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      closeAllPopups={closeAllPopups}
    >
      <input
        onChange={handleChangeAvatar}
        value={avatarLink || ""}
        id="linkAvatar"
        type="url"
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        name="linkAvatar"
        required
      />
      <span id="error-linkAvatar" className="popup__error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
