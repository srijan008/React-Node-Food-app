import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="text-center bg-body-tertiary">
      <div className="container pt-4">
        <section className="mb-4">
          <a
            data-mdb-ripple-init
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fab fa-facebook-f"></i>
          </a>

          <a
            data-mdb-ripple-init
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fab fa-twitter"></i>
          </a>

          <a
            data-mdb-ripple-init
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fab fa-google"></i>
          </a>

          <a
            data-mdb-ripple-init
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fab fa-instagram"></i>
          </a>

          <a
            data-mdb-ripple-init
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fab fa-linkedin"></i>
          </a>

          <a
            data-mdb-ripple-init
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fab fa-github"></i>
          </a>
        </section>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className="text-body" >Go Food</a>
      </div>
    </footer>
  );
};

export default Footer;
