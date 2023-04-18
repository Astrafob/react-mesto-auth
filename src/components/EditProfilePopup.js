import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name: name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input className="popup__input-text" id="name" name="name" type="text" maxLength="40" minLength="2"
        placeholder="Имя" value={name || ""} onChange={handleChangeName} required />
      <span className="popup__input-error name-error"></span>
      <input className="popup__input-text" id="about" name="about" type="text" maxLength="200" minLength="2"
        placeholder="Увлечение" value={description || ""} onChange={handleChangeDescription} required />
      <span className="popup__input-error about-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;