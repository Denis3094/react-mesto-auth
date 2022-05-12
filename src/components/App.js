import {useState, useEffect, useRef} from 'react';
import "../index.css";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmPopup from "./DeleteConfirmPopup";


function App() {
    const [currentUser, setCurrentUser] = useState({})

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isCardDeleteConfirmPopupOpen, setIsCardDeleteConfirmPopupOpen] = useState(false);

    const [cards, setCards] = useState([])
    const [selectedCard, setSelectedCard] = useState({})
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const avatarRef = useRef()
    const [avatarLink, setAvatarLink] = useState('')

    const [addPlaceName, setAddPlaceName] = useState('')
    const [addPlaceLink, setAddPlaceLink] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        Promise.all([api.getProfile(), api.getInitialCards()])
            .then(([info, cards]) => {
                setCards(cards)
            })
            .catch(err => {
                console.log(err)
            });
    }, [])

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsImagePopupOpen(false)
        setIsCardDeleteConfirmPopupOpen(false);
    }

    useEffect(() => {
        function handleEscClick(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups()
            }
        }

        document.addEventListener('keydown', handleEscClick)
        return () => {
            document.removeEventListener('keydown', handleEscClick)
        }
    }, [])


    // Редактирование профиля

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleUpdateUser(info) {
        setIsLoading(true)
        api.editProfile(info)
            .then(res => {
                console.log(res)
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch(err => console.log(err))
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        api.getProfile()
            .then(res => setCurrentUser(res))
            .catch(error => console.log(error))
    }, [])


    // Добавление карточек

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleAddPlaceSubmit(newCard) {
        setIsLoading(true)
        api.addCard(newCard)
            .then(res => {
                setCards([res, ...cards]);
                closeAllPopups()
                setAddPlaceName('')
                setAddPlaceLink('')
            })
            .catch(err => console.log(err))
            .finally(() => {
                setIsLoading(false)
            })
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then(newCard => {
                setCards(state => state.map(item => item._id === card._id ? newCard : item));
            })
            .catch(err => console.log(err))
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(cardsElements => cardsElements.filter(element => element._id !== card._id))
                closeAllPopups()
            })
            .catch(err => console.log(err))
    }

    function handleDeleteClick(card) {
        setIsCardDeleteConfirmPopupOpen(true);
        setSelectedCard(card);
    }

    function handleCardClick(card) {
        setSelectedCard(card)
        setIsImagePopupOpen(true)
    }


    // Обновление аватара

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleUpdateAvatar(ava) {
        setIsLoading(true)
        api.editAvatar(ava)
            .then(res => {
                setCurrentUser(res)
                closeAllPopups()
                setAvatarLink('')
                avatarRef.current.value = ''
            })
            .catch(err => console.log(err))
            .finally(() => {
                setIsLoading(false)
            })
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">

                    <Header/>

                    <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeleteClick}
                        cards={cards}/>

                    <Footer/>

                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                      onUpdateUser={handleUpdateUser} name={name} setName={setName}
                                      description={description} setDescription={setDescription} isLoading={isLoading}/>

                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                     onUpdateAvatar={handleUpdateAvatar} avatarLink={avatarLink}
                                     setAvatarLink={setAvatarLink} avatarRef={avatarRef} isLoading={isLoading}/>

                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                                   setIsAddPlacePopupOpen={setIsAddPlacePopupOpen}
                                   onAddPlace={handleAddPlaceSubmit} addPlaceName={addPlaceName}
                                   setAddPlaceName={setAddPlaceName} addPlaceLink={addPlaceLink}
                                   setAddPlaceLink={setAddPlaceLink} isLoading={isLoading}/>


                    <DeleteConfirmPopup isOpen={isCardDeleteConfirmPopupOpen} onClose={closeAllPopups}
                                        card={selectedCard}
                                        onDeleteCard={handleCardDelete}/>

                    <ImagePopup
                        card={selectedCard}
                        isOpen={isImagePopupOpen}
                        onClose={closeAllPopups}>
                    </ImagePopup>

                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
