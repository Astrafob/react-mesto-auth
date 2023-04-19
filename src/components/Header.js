import headerLogo from '../image/logo.svg';
import { Link } from 'react-router-dom';

function Header({ title, path, email }) {
  return (
    <header className="header">
      <img src={headerLogo} className="logo-header" alt="Логотип Место" />
      <p className='header__title'>{email}<Link to={path} className='header__link' type='button'>{title}</Link></p>
    </header>
  );
}

export default Header;