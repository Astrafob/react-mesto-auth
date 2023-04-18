import { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
  const dataUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <button onClick={() => onEditAvatar(true)} className="profile__avatar-edit" type="button">
            <img src={dataUser.avatar} className="profile__photo" alt="фото профиля" />
          </button>
          <div className="profile__wrapper">
            <div className="profile__name">
              <h1 className="profile__title">{dataUser.name}</h1>
              <button onClick={() => onEditProfile(true)} className="button button_edit_open" aria-label="редактор данных пользователя" type="button"></button>
            </div>
            <p className="profile__subtitle">{dataUser.about}</p>
          </div>
        </div>
        <button onClick={() => onAddPlace(true)} className="button button_add_open" aria-label="добавление новых картинок" type="button"></button>
      </section>
      <section className="cards">
        {cards.map(card => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;