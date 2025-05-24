import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <p>&copy; {new Date().getFullYear()} TripCost Calculator</p>
          <p>Using OpenStreetMap for route calculations</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
