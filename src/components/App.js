import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';
import auth from '../utils/authApi.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [emailUser, setEmailUser] = useState('');
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getPersonInfo(), api.getCards()])
        .then(([dataUser, card]) => {
          setCurrentUser(dataUser);
          setCards(card);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [loggedIn]);

  function handleRegister(userInfo) {
    auth.register(userInfo)
      .then(data => {
        setIsSuccess(true);
        navigate("/sing-in");
      })
      .catch((error) => {
        setIsSuccess(false);
        console.log(error);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      })
  }

  function handleAuthorize(userInfo) {
    auth.authorize(userInfo)
      .then(data => {
        if (data.token) {
          console.log(data);
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          setEmailUser(userInfo.email);
          navigate('/');
        }
      })
      .catch((error) => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(error)
      })
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setEmailUser('');
    setLoggedIn(false);
    navigate('/sign-in');
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then(({ data }) => {
          setLoggedIn(true);
          setEmailUser(data.email);
          navigate('/', { replace: true });
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function handleUpdateAvatar(userAvatar) {
    api.setUserAvatar(userAvatar)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleAddPlaceSubmit(dataCard) {
    api.addCard(dataCard)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) =>
            item._id === card._id ? newCard : item))
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => setCards(
        state => state.filter(
          item => item._id !== card._id
        )
      ))
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Routes>
          <Route path="/" element={
            <>
              <Header
                title="Выйти"
                email={emailUser}
                path="/sign-in"
                onSignOut={handleSignOut}
              />
              <ProtectedRoute
                element={Main}
                onEditProfile={setIsEditProfilePopupOpen}
                onAddPlace={setIsAddPlacePopupOpen}
                onEditAvatar={setIsEditAvatarPopupOpen}
                onCardClick={setSelectedCard}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                loggedIn={loggedIn}
              />
            </>
          } />
          <Route path="/sign-up" element={
            <>
              <Header
                title="Войти"
                path="/sign-in"
              />
              <Register
                onRegister={handleRegister}
              />
            </>
          } />
          <Route path="/sign-in" element={
            <>
              <Header
                title="Регистрация"
                path="/sign-up"
              />
              <Login
                onAuthorize={handleAuthorize}
              />
            </>
          } />
          <Route path='*' element={
            <Navigate to='/' />
          } />
        </Routes>
        {loggedIn && <Footer />}

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          buttonText="Да"
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <InfoTooltip
          name={"success"}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
