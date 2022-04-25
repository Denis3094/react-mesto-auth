import React from 'react';
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }
    const handleCardClick = (card) => {
        setSelectedCard(card)
        setIsImagePopupOpen(true)
    }
    const closeAllPopups = (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-img')) {
            setIsEditProfilePopupOpen(false)
            setIsAddPlacePopupOpen(false)
            setIsEditAvatarPopupOpen(false)
            setIsImagePopupOpen(false)
        }
    }

    return (
        <div className="page">
            <div className="page__container">
                <Header/>

                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                />
                <Footer/>

                <PopupWithForm
                    title='Редактировать профиль'
                    name='edit-profile'
                    buttonText='Сохранить'
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                >
                    <input id="username" type="text" className="popup__input popup__input_type_name"
                           placeholder="Имя" name="name" required minLength={2} maxLength={40}/>
                    <span id="error-username" className="popup__error"/>
                    <input id="about" type="text" className="popup__input popup__input_type_job"
                           placeholder="О себе" name="aboutMe" required minLength={2} maxLength={200}/>
                    <span id="error-about" className="popup__error"/>
                </PopupWithForm>

                <PopupWithForm
                    title='Обновить аватар'
                    name='edit-avatar'
                    buttonText='Сохранить'
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                >
                    <input id="linkAvatar" type="url" className="popup__input popup__input_type_link"
                           placeholder="Ссылка на картинку" name="linkAvatar" required/>
                    <span id="error-linkAvatar" className="popup__error"/>
                </PopupWithForm>

                <PopupWithForm
                    title='Новое место'
                    name='add-card'
                    buttonText='Создать'
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                >
                    <input id="title" type="text" className="popup__input popup__input_type_title"
                           placeholder="Название" name="name" required minLength={2} maxLength={30}/>
                    <span id="error-title" className="popup__error"/>
                    <input id="link" type="url" className="popup__input popup__input_type_link"
                           placeholder="Ссылка на картинку" name="link" required/>
                    <span id="error-link" className="popup__error"/>
                </PopupWithForm>

                <PopupWithForm
                    title='Вы уверены?'
                    name='delete-confirm'
                    buttonText='Да'>
                </PopupWithForm>

                <ImagePopup
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}
                >
                </ImagePopup>
            </div>
        </div>
    );
}

export default App;
