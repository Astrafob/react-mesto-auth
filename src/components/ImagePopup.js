function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_overlay_dark ${card.link ? "popup_opened" : ""}`} id="popupViewPhoto">
      <div className="popup__box-image">
        <figure className="popup__figure">
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__caption-image">{card.name}</figcaption>
        </figure>
        <button className="popup__close-button" id="closePopupViewPhoto" aria-label="закрыть попап" type="button" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;