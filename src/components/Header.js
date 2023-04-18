import headerLogo from '../image/logo.svg'

function Header() {
  return (
    <header className="header">
      <img src={headerLogo} className="logo-header" alt="Логотип Место" />
    </header>
  );
}

export default Header;