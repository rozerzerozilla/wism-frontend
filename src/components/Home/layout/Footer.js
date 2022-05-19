import { Link } from "react-router-dom";
const HomeFooter = () => {
  return (
    <footer className="footer py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mb-4 mx-auto text-center">
            <Link to="/" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
              About Us
            </Link>
            <Link to="/" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
              Businesses
            </Link>
            <Link to="/" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
              Partners
            </Link>
            <Link to="/" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
              Advertise
            </Link>
            <Link to="/" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
              Contact Us
            </Link>
            <Link to="/" className="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
              Join Us
            </Link>
          </div>
          <div className="col-lg-8 mx-auto text-center mb-4 mt-2">
            <Link
              to="/"
              target="_blank"
              className="text-secondary me-xl-4 me-4"
            >
              <span className="text-lg fa fa-facebook-official"></span>
            </Link>

            <Link
              to="/"
              target="_blank"
              className="text-secondary me-xl-4 me-4"
            >
              <span className="text-lg fa fa-instagram"></span>
            </Link>

            <Link
              to="/"
              target="_blank"
              className="text-secondary me-xl-4 me-4"
            >
              <span className="text-lg fa fa-twitter"></span>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-8 mx-auto text-center mt-1">
            <p className="mb-0 text-secondary">Copyright &copy; WiSM Team.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
