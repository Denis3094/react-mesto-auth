import { useState, useEffect } from "react";
import api from "../utils/api";
import * as auth from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmPopup from "./DeleteConfirmPopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { authorize, register } from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isCardDeleteConfirmPopupOpen, setIsCardDeleteConfirmPopupOpen] =
    useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ _id: "", email: "" });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [signupError, setSignupError] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([info, cards]) => {
          setCurrentUser(info);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsCardDeleteConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  // Редактирование профиля

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleUpdateUser(info) {
    setIsLoading(true);
    api
      .editProfile(info)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Добавление карточек

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api
      .addCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cardsElements) =>
          cardsElements.filter((element) => element._id !== card._id)
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteClick(card) {
    setIsCardDeleteConfirmPopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  // Обновление аватара

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleUpdateAvatar(ava, resetForm) {
    setIsLoading(true);
    api
      .editAvatar(ava)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        resetForm();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Аутентификация

  function handleRegister(password, email) {
    setIsLoading(true);
    return register(password, email)
      .then((res) => {
        if (res.data._id) {
          setIsSignup(true);
          setIsInfoTooltipOpen(true);
          setTimeout(() => {
            setIsInfoTooltipOpen(false);
          }, 1800);
          history.push("/sign-in");
        } else {
          setIsSignup(false);
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        setSignupError(err.message);
        setIsSignup(false);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin(password, email) {
    setIsLoading(true);
    return authorize(password, email)
      .then((res) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          checkToken();
        }
      })
      .catch((err) => {
        console.log(err.message);
        setSignupError(err.message);
        setIsSignup(false);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => setIsLoading(false));
  }

  function checkToken() {
    if (localStorage.getItem("jwt")) {
      let token = localStorage.getItem("jwt");
      auth
        .getContent(token)
        .then((res) => {
          const { _id, email } = res.data;
          console.log("res.data", res.data);
          setUserData({ _id, email });
          setLoggedIn(true);
        })
        .catch((err) => console.log(err.message));
    }
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setUserData({ _id: "", email: "" });
    setLoggedIn(false);
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header userEmail={userData.email} handleLogout={handleLogout} />

          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
              cards={cards}
            />

            <Route path="/sign-up">
              <Register
                onRegister={handleRegister}
                submitBtn={
                  isLoading ? "Идет регистрация..." : "Зарегистрироваться"
                }
              />
            </Route>
            <Route path="/sign-in">
              <Login
                onLogin={handleLogin}
                submitBtn={isLoading ? "Выполняется вход..." : "Войти"}
              />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
            closeAllPopups={closeAllPopups}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
            closeAllPopups={closeAllPopups}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            setIsAddPlacePopupOpen={setIsAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
            closeAllPopups={closeAllPopups}
          />

          <DeleteConfirmPopup
            isOpen={isCardDeleteConfirmPopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
            onDeleteCard={handleCardDelete}
            closeAllPopups={closeAllPopups}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
            closeAllPopups={closeAllPopups}
          ></ImagePopup>

          <InfoTooltip
            signupError={signupError}
            isSignup={isSignup}
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
          ></InfoTooltip>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
