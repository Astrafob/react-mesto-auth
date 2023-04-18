
function PopupWithForm({ name, title, buttonText, children, isOpen, onClose, onSubmit }) {
  return (
    <>
      <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container">
          <form className="popup__edit-form" name={name} onSubmit={onSubmit}>
            <h2 className="popup__title">{title}</h2>
            {children}
            <button className="popup__save-button" aria-label="сохранение данных" type="submit">{buttonText}</button>
          </form>
          <button className="popup__close-button" aria-label="закрыть попап" type="button" onClick={onClose}></button>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;