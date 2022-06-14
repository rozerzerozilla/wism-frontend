import { useState } from "react";
import MapPicker from "react-google-map-picker";
import { toast } from "react-toastify";
import style from "../../admin.module.css";
import FormAddTimings from "./form.add.timings";
const FormAddBusiness = ({
  categories,
  getSubcategories,
  subcategories,
  userData,
  setuserData,
  isLoading,
  defaultLocation,
  zoom,
  handleChangeLocation,
  handleChangeZoom,
  location,
  onSubmit,
  holidays,
  setHolidays,
  allTime,
  setAllTime,
  getLatLng,
  success,
  errors,
  states,
  cities,
  postalLocalities,
  handleBackRoute
}) => {
  const [showBusiness, setShowBusiness] = useState(false);
  const [showTiming, setShowTiming] = useState(false);

  return (
    <form onSubmit={onSubmit} className="mx-4 my-4">
      <div className="mt-5"></div>
      <h5 className={style["heading-h5"]}> Business Profile </h5>

      <div className="mb-3">
        <div className="row">
          <div className="col-6">
            <label className={style.label}>Owner Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Owner Name"
              name="name"
              value={userData.name || ""}
              onChange={(e) => {
                setuserData({ ...userData, name: e.target.value });
              }}
              required
            />
          </div>
          <div className="col-6">
            <label className={style.label}>Owner Phone Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Owner Phone Number"
              name="phone"
              value={userData.phone || ""}
              onChange={(e) => {
                setuserData({ ...userData, phone: (e.target.value).replace(/ /g, "") });
              }}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <label className={style.label}>Business Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Business Name (Ex: Trendz Men Saloon)"
              name="bname"
              value={userData.bname || ""}
              onChange={(e) => {
                setuserData({ ...userData, bname: e.target.value });
              }}
              required
            />
          </div>
          <div className="col-4">
            <label className={style.label}>Telephone</label>
            <input
              type="text"
              className="form-control"
              placeholder="Telephone"
              name="telephone"
              value={userData.telephone || ""}
              onChange={(e) => {
                setuserData({ ...userData, telephone: e.target.value });
              }}
              required
            />
          </div>
          <div className="col-4">
            <label className={style.label}>Website(optional)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Website"
              name="website"
              value={userData.website || ""}
              onChange={(e) => {
                setuserData({ ...userData, website: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label className={style.label}>
              Information About Business/Services
            </label>
            <textarea
              name="info"
              className="form-control"
              placeholder="Information About Business/Services"
              onChange={(e) => {
                setuserData({ ...userData, info: e.target.value });
              }}
              value={userData.info || ""}
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label className={style.label}>Choose Category</label>
            <select
              className="form-control"
              name="categoryID"
              onChange={(e) => {
                setuserData({ ...userData, category: e.target.value });
                getSubcategories(e.target.value);
              }}
            >
              <option value="">Choose Category</option>
              {categories &&
                categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            {subcategories &&
              subcategories.map((subcat) => {
                return (
                  <div className="form-check" key={subcat.id}>
                    <input
                      className="form-check-input"
                      name="subcat[]"
                      type="checkbox"
                      value={subcat.id}
                      onChange={(e) => {
                        setuserData({
                          ...userData,
                          subcategories: [
                            ...userData.subcategories,
                            e.target.value,
                          ],
                        });
                      }}
                    />
                    <label className="form-check-label">{subcat.name}</label>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label className={style.label}>
              Business Profile Photo(Recommended resolution 90w * 50h pixels)
            </label>
            <input
              type="file"
              name="photo"
              className="form-control"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0].size > 1048576) {
                  toast.error("Image should be less than 1MB")
                  e.target.value = "";
                } else {
                  setuserData({ ...userData, photo: e.target.files[0] });
                }
              }}
            />
          </div>
        </div>

        <div className="mt-1"></div>
        <label className={style.label}>Advertisement Banners</label>
        <div className="row">
          <div className="col-6">
            <label>Premiure Ad Banner(750w * 150h pixels )</label>
            <input
              type="file"
              name="ad1"
              className="form-control"
              placeholder="Select Image"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0].size > 1048576) {
                  toast.error("Image should be less than 1MB")
                  e.target.value = "";
                } else {
                  setuserData({ ...userData, ad1: e.target.files[0] });
                }
              }}
            />
          </div>
          <div className="col-6">
            <label>Classic Ad Banner(100w * 175h pixels )</label>
            <input
              type="file"
              name="ad2"
              className="form-control"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0].size > 1048576) {
                  toast.error("Image should be less than 1MB")
                  e.target.value = "";
                } else {
                  setuserData({ ...userData, ad2: e.target.files[0] });
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-5"></div>
      <div
        className={style["collapse-header"]}
        onClick={() => {
          setShowBusiness(!showBusiness);
          //setShowTiming(false);
        }}
      >
        <h5 className={style["heading-h5"]}> Business Address Details </h5>
        {showBusiness && (
          <i
            className="fa fa-minus text-lg opacity-10"
            style={{ margin: "6px" }}
          ></i>
        )}
        {!showBusiness && (
          <i
            className="fa fa-plus text-lg opacity-10"
            style={{ margin: "6px" }}
          ></i>
        )}
      </div>

      {showBusiness && (
        <div className="mb-3">
          <div className="row">
            <div className="col-6">
              <label className={style.label}>Address1 *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Address1"
                name="address1"
                value={userData.address1 || ""}
                onChange={(e) => {
                  setuserData({ ...userData, address1: (e.target.value).replace(/ /g,"") });
                }}
                required
              />
            </div>
            <div className="col-6">
              <label className={style.label}>Address2(optional)</label>
              <input
                type="text"
                className="form-control"
                placeholder="Address2"
                name="address2"
                value={userData.address2 || ""}
                onChange={(e) => {
                  setuserData({ ...userData, address2: e.target.value });
                }}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-6">
              <label className={style.label}>Postal Code *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Postal Code"
                name="postalcode"
                value={userData.postalcode || ""}
                onChange={(e) => {
                  setuserData({ ...userData, postalcode: e.target.value });
                  getLatLng(e.target.value);
                }}
                required
              />
            </div>
            <div className="col-6">
              <label className={style.label}>Choose Postal Localities *</label>
              {/* <input
                type="text"
                className="form-control"
                placeholder="Street"
                name="street"
                value={userData.street || ""}
                disabled
                onChange={(e) => {
                  setuserData({ ...userData, street: e.target.value });
                }}
              /> */}
              <select
                required
                className="form-control"
                value={userData.street || ""}
                name="street"
                disabled={postalLocalities?.length<=0}
                onChange={(e) => {
                  setuserData({ ...userData, street: e.target.value });
                }}
              >
                <option value="">Choose localities</option>
                {postalLocalities?.map((ele, idx) => <option value={ele} key={idx}>{ele}</option>)}
              </select>
            </div>
            <div className="col-6">
              <label className={style.label}>City *</label>
              <input
                type="text"
                className="form-control"
                placeholder="City"
                name="city"
                value={userData.city || ""}
                disabled
                onChange={(e) => {
                  setuserData({ ...userData, city: e.target.value });
                }}
                required
              />
              {/* <select
                className="form-control"
                name="state"
                onChange={(e) => {
                  setuserData({ ...userData, city: e.target.value });
                  getLatLng();
                }}
              >
                <option value="">Choose City</option>
                {cities?.map((ele, idx) => <option value={ele.name} key={idx}>{ele}</option>)}
              </select> */}
            </div>
            <div className="col-6">
              <label className={style.label}>State *</label>
              <input
                type="text"
                className="form-control"
                placeholder="State"
                name="state"
                value={userData.state || ""}
                disabled
                onChange={(e) => {
                  setuserData({ ...userData, state: e.target.value });
                }}
                required
              />
              {/* <select
                className="form-control"
                name="state"
                onChange={(e) => {
                  setuserData({ ...userData, state: e.target.value });
                  // getLatLng();
                }}
              >
                <option value="">Choose State</option>
                {states?.map((ele, idx) => <option value={ele.name} key={idx}>{ele.name} - {ele.state_code}</option>)}
              </select> */}
            </div>
          </div>
          <div className="row">
            
          </div>
          <div className="mt-3"></div>
          <label className={style.label}>Geospatical Coordination</label>
          <div className="row">
            <div className="col-6">
              <label className={style.label}>Latitude</label>
              <input
                type="text"
                className="form-control"
                placeholder="Latitude"
                name="lat"
                value={location.lat || ""}
                onChange={(e) => {
                  setuserData({ ...userData, lat: e.target.value });
                }}
                required
                readOnly
              />
            </div>
            <div className="col-6">
              <label className={style.label}>Longitude</label>
              <input
                type="text"
                className="form-control"
                placeholder="Longitude"
                name="lng"
                value={location.lng || ""}
                onChange={(e) => {
                  setuserData({ ...userData, lng: e.target.value });
                }}
                required
                readOnly
              />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12">
              <MapPicker
                defaultLocation={defaultLocation}
                zoom={zoom}
                mapTypeId="roadmap"
                onChangeLocation={handleChangeLocation}
                onChangeZoom={handleChangeZoom}
                apiKey="AIzaSyDcOuFij8ydq4vGwIFEGE0P9qwad7OPDng"
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-5"></div>
      <div
        className={style["collapse-header"]}
        onClick={() => {
          setShowTiming(!showTiming);
          //setShowBusiness(false);
        }}
      >
        <h5 className={style["heading-h5"]}> Timings </h5>
        {showTiming && (
          <i
            className="fa fa-minus text-lg opacity-10"
            style={{ margin: "6px" }}
          ></i>
        )}
        {!showTiming && (
          <i
            className="fa fa-plus text-lg opacity-10"
            style={{ margin: "6px" }}
          ></i>
        )}
      </div>

      {showTiming && (
        <FormAddTimings
          userData={userData}
          setuserData={setuserData}
          holidays={holidays}
          setHolidays={setHolidays}
          allTime={allTime}
          setAllTime={setAllTime}
        />
      )}

      {success && (
        <div
          className="alert alert-success mx-5"
          role="alert"
          style={{ color: "white" }}
        >
          {success}
        </div>
      )}
      {/* {errors && (
        <div
          className="alert alert-danger mx-5"
          role="alert"
          style={{ color: "white" }}
        >
          {errors}
        </div>
      )} */}
      <div className="text-center">
        <button
          type="submit"
          className="btn bg-gradient-info w-25 mt-4 mb-0 mx-auto"
          disabled={isLoading}
        >
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          &nbsp;&nbsp;Add My Business
        </button>
        <button
          type="button"
          className="btn btn-secondary w-25 mt-4 mb-0 mx-auto"
          onClick={handleBackRoute}
        >Cancel
        </button>
      </div>
    </form>
  );
};

export default FormAddBusiness;
