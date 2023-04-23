import headerLogo from '../image/logo.svg';
import { Link } from 'react-router-dom';

function Header({ title, path, email, onSignOut, isOpen, onClose, setIsBurgerOpen }) {

  function openBurger() {
    setIsBurgerOpen(true);
  }

  function closeBurger() {
    onClose();
  }

  return (
    <header className="header">
      <div className={`header__menu ${isOpen ? "header__menu_opened" : ""}`}>
        <p className='header__menu-title'>{email}</p>
        <Link to={path} className='header__menu-link' type='button' onClick={onSignOut}>{title}</Link>
      </div>
      <div className="header__container">
        <img src={headerLogo} className="header__logo" alt="Логотип Место" />
        <p className="header__title">{email}<Link to={path} className="header__link" type='button' onClick={onSignOut}>{title}</Link></p>
        <button className={`header__burger ${isOpen ? "header__burger_closed" : ""}`} onClick={!isOpen ? openBurger : closeBurger}></button>
      </div>
    </header>
  );
}

export default Header;