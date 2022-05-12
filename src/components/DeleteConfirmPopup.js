import PopupWithForm from "./PopupWithForm";

function DeleteConfirmPopup({isOpen, onClose, onDeleteCard, card}) {

    function handleSubmit(evt) {
        evt.preventDefault()
        onDeleteCard(card)
    }

    return (
        <PopupWithForm
            title='Вы уверены?'
            name='delete-confirm'
            buttonText='Да'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
        </PopupWithForm>
    )
}

export default DeleteConfirmPopup