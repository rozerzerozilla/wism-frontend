import noImage from "../../../assets/img/noi.jpg";
import { Link } from "react-router-dom";
const BusinessDetails = ({
  business,
  tokenForm,
  setTokenForm,
  onPickupSubmit,
  isSbtDis,
  setIsSbtDis,
  timeslots,
  getTimeSlot,
  errors,
  success,
  isLoading,
}) => {
  return (
    <div className="section-padding">
      <div className="container">
        <div className="product-info row">
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {errors && (
            <div
              className="alert alert-danger"
              role="alert"
              style={{ color: "white" }}
            >
              {errors}
            </div>
          )}

          <div className="col-lg-8 col-md-8 col-xs-12 col-sm-12">
            <div className="ads-details-wrapper">
              <div className="product-img">
                <img
                  className="img-fluid"
                  src={business.image ? business.image : noImage}
                  //src={noImage}
                  alt=""
                />
              </div>
            </div>
            <div className="details-box">
              <div className="ads-details-info">
                <h2>{business.bname}</h2>
                <span>
                  {business.telephone} &nbsp;&nbsp; {business.website}
                </span>
                <div className="details-meta">
                  <span></span>
                  <span>
                    <Link to="#">
                      <i className="lni-map-marker"></i>
                      {business.address1}, {business.address2}, {business.city},{" "}
                      {business.state}
                    </Link>
                  </span>
                </div>
                <p className="mb-4">{business.info}</p>
                <h4 className="title-small mb-3">Services:</h4>
                <ul
                  className="list-specification"
                  style={{ listStyle: "none" }}
                >
                  {business.services &&
                    business.services.map((ser) => (
                      <li>
                        <i className="lni-check-mark-circle" key={ser.id}></i>
                        {ser.name}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="tag-bottom">
                <div className="float-left">
                  <ul className="advertisement">
                    <li>
                      <p>
                        <strong>
                          <i className="lni-folder"></i> Categories:
                        </strong>
                        <Link to="#"> {business.category}</Link>
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>
                          <i className="lni-archive"></i> Specilised:
                        </strong>
                        {business.subcats &&
                          business.subcats.map((sc) => (
                            <>
                              &nbsp;<i key={sc.id}>{sc.name}</i> &nbsp;
                            </>
                          ))}
                      </p>
                    </li>
                  </ul>
                </div>
                {/* <div className="float-right">
                  <div className="share">
                    <div className="social-link">
                      <Link
                        className="facebook"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="facebook"
                        to="#"
                      >
                        <i className="lni-facebook-filled"></i>
                      </Link>
                      <Link
                        className="twitter"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="twitter"
                        to="#"
                      >
                        <i className="lni-twitter-filled"></i>
                      </Link>
                      <Link
                        className="linkedin"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="linkedin"
                        to="#"
                      >
                        <i className="lni-linkedin-fill"></i>
                      </Link>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-xs-12">
            {isLoading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {errors && (
              <div
                className="alert alert-danger"
                role="alert"
                style={{ color: "white" }}
              >
                {errors}
              </div>
            )}
            {success && (
              <div
                className="alert alert-success mx-5"
                role="alert"
                style={{ color: "white" }}
              >
                <h5>
                  Your token confirmed, you will receive complete details to
                  your mobile number shortly
                </h5>
              </div>
            )}
            <aside className="details-sidebar">
              <div className="widget">
                <h4 className="widget-title">Pick a token</h4>
                <div className="agent-inner">
                  <form onSubmit={onPickupSubmit}>
                    <label>Choose Mode Of Tranfer</label>
                    <select
                      className="form-control"
                      required
                      onChange={(e) =>
                        setTokenForm({
                          ...tokenForm,
                          mode: e.target.value,
                        })
                      }
                    >
                      <option value="">Choose Mode</option>
                      <option value="driving">Car</option>
                      <option value="transit">Public Transit</option>
                      {/* <option value="bicycling">Cycle</option> */}
                      <option value="walking">Walk</option>
                    </select>
                    <label>Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      name="name"
                      required
                      onChange={(e) =>
                        setTokenForm({ ...tokenForm, name: e.target.value })
                      }
                    />
                    <label>Your Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Phone Number"
                      name="phone"
                      required
                      onChange={(e) =>
                        setTokenForm({ ...tokenForm, phone: e.target.value })
                      }
                    />
                    {business.forms &&
                      business.forms.map((form) => (
                        <>
                          {form.type === "Text" || form.type === "Date" ? (
                            <>
                              <label>{form.name}</label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder={form.name}
                                name={form.name}
                                required={form.is_required ? true : false}
                                onChange={(e) =>
                                  setTokenForm({
                                    ...tokenForm,
                                    options: {
                                      ...tokenForm.options,
                                      [form.name]: e.target.value,
                                    },
                                  })
                                }
                              />
                            </>
                          ) : (
                            ""
                          )}
                          {form.type === "Dropdown" && form.given_values ? (
                            <>
                              <label>{form.name}</label>
                              <select
                                className="form-control"
                                required={form.is_required ? true : false}
                                onChange={(e) =>
                                  setTokenForm({
                                    ...tokenForm,
                                    options: {
                                      ...tokenForm.options,
                                      [form.name]: e.target.value,
                                    },
                                  })
                                }
                              >
                                <option>Choose Option</option>
                                {form.given_values
                                  .split(",")
                                  .map((v, index) => (
                                    <option value={v} key={index}>
                                      {v}
                                    </option>
                                  ))}
                              </select>
                            </>
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                    <label>Choose Services</label>
                    <select
                      className="form-control"
                      required
                      onChange={(e) => {
                        setTokenForm({
                          ...tokenForm,
                          service: e.target.value,
                        });
                        getTimeSlot(e.target.value);
                      }}
                    >
                      <option>Choose Service</option>
                      {business.services &&
                        business.services.map((serv) => (
                          <option value={serv.id} key={serv.id}>
                            {serv.name}
                          </option>
                        ))}
                    </select>

                    {timeslots &&
                      timeslots.map((ts, index) => (
                        <>
                          <input
                            key={index}
                            type="radio"
                            value={ts.time}
                            onChange={(e) => {
                              setTokenForm({
                                ...tokenForm,
                                time: ts.time,
                                client_id: ts.client,
                              });
                              setIsSbtDis(!isSbtDis);
                            }}
                          />
                          {ts.time} &nbsp;&nbsp;
                        </>
                      ))}
                    {isLoading && (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    <button
                      className="btn btn-common fullwidth mt-4"
                      disabled={isSbtDis || isLoading}
                    >
                      Confirm the token
                    </button>
                  </form>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
