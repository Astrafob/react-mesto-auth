import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__button-like ${isLiked ? 'card__button-like_active' : ''}` 
  ); 

  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      {isOwner && <button className="card__delete" aria-label="удаление карточки" type="button" onClick={handleCardDelete} />}
      <img src={card.link} className="card__image" alt={card.name} onClick={handleCardClick} />
      <div className="card__name">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName} aria-label="лайк" type="button" onClick={handleCardLike} />
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;