import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <p>&copy; {new Date().getFullYear()} TripCost Calculator</p>
          <p>
            Using{" "}
            <a
              href="https://project-osrm.org/"
              target="_blank"
              rel="noreferrer"
            >
              Project OSRM
            </a>{" "}
            for route calculations and OpenStreetMap
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
