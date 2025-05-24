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
            for route calculations and{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.openstreetmap.org/"
            >
              OpenStreetMap
            </a>{" "}
            ,{" "}
            <a
              href="https://github.com/skorotkiewicz/tripcost"
              target="_blank"
              rel="noreferrer"
            >
              OpenSource
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
