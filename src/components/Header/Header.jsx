import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__logo">
            <h1>TripCost</h1>
            <p className="header__tagline">
              Calculate your journey's fuel expenses
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
