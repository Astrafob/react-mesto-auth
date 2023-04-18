import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [nameNewPlace, setNameNewPlace] = useState('');
  const [linkNewPlace, setLinkNewPlace] = useState('');

  useEffect(() => {
    setNameNewPlace('');
    setLinkNewPlace('');
  }, [isOpen]);

  function handleChangeNamePlace(event) {
    setNameNewPlace(event.target.value);
  }

  function handleChangeLinkPlace(event) {
    setLinkNewPlace(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name: nameNewPlace,
      link: linkNewPlace
    });
  }

  return (
    <PopupWithForm
      name="newPlace"
      title="Новое место"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input className="popup__input-text" id="placeName" name="name" type="text" maxLength="30" minLength="2"
        placeholder="Название" value={nameNewPlace} onChange={handleChangeNamePlace} required />
      <span className="popup__input-error placeName-error"></span>
      <input className="popup__input-text" id="placePhotoURL" name="link" type="url" placeholder="Ссылка на картинку" value={linkNewPlace} onChange={handleChangeLinkPlace}
        required />
      <span className="popup__input-error placePhotoURL-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;