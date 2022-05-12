import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, setAvatarLink, avatarRef, isLoading}) {

    function handleChangeAvatar(evt) {
        setAvatarLink(evt.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            title='Обновить аватар'
            name='edit-avatar'
            buttonText={isLoading ? 'Обновление аватара...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input ref={avatarRef} onChange={handleChangeAvatar} id="linkAvatar" type="url"
                   className="popup__input popup__input_type_link"
                   placeholder="Ссылка на картинку" name="linkAvatar" required/>
            <span id="error-linkAvatar" className="popup__error"/>
        </PopupWithForm>
    )
}

export default EditAvatarPopup