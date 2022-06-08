import { useState } from "react";
import MapPicker from "react-google-map-picker";
import style from "../../clients.module.css";
import FormAddTimings from "./form.add.timings";
import FormEditTimings from "./form.edit.timings";
import {toast} from "react-toastify"
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
  business,
  postalLocalities,
}) => {
  const [showBusiness, setShowBusiness] = useState(false);
  const [showTiming, setShowTiming] = useState(false);

  return (
    <form onSubmit={onSubmit} className="mx-4 my-4">
      <div className="mt-5"></div>
      <h5 className={style["heading-h5"]}> Business Profile </h5>

      <div className="mb-3">
        <div className="row">
          <div className="col-4">
            <label className={style.label}>Business Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Business Name (Ex: Trendz Men Saloon)"
              name="bname"
              value={userData.bname || business.bname || ""}
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
              value={userData.telephone || business.telephone || ""}
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
              value={userData.website || business.website || ""}
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
              value={userData.info || business.info || ""}
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
                  <option
                    value={category.id}
                    key={category.id}
                    selected={
                      category.id === business.category ? true : false
                    }
                  >
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            {business.subcats && (
              <>
                <b>Selected : </b>
                {business.subcats.map((sb) => (
                  <b>{sb.name}, </b>
                ))}
              </>
            )}
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
            {business.image && (
              <img
                src={`${business.image}`}
                className="img-fluid"
                width={100}
                height={100}
              />
            )}
            <br />
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
            {business.ad1 && (
              <img
                src={`${business.ad1}`}
                className="img-fluid"
                width={100}
                height={100}
              />
            )}
            <br />
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
            {business.ad2 && (
              <img
                src={`${business.ad2}`}
                className="img-fluid"
                width={100}
                height={100}
              />
            )}
            <br />
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
              <label className={style.label}>Address1</label>
              <input
                type="text"
                className="form-control"
                placeholder="Address1"
                name="address1"
                value={userData.address1 || business.address1 || ""}
                onChange={(e) => {
                  setuserData({ ...userData, address1: e.target.value });
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
                value={userData.address2 || business.address2 || ""}
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
                value={userData.postalcode || business.postalcode || ""}
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
                value={userData.street || business.street || ""}
                onChange={(e) => {
                  setuserData({ ...userData, street: e.target.value });
                }}
              /> */}
              <select
                required
                className="form-control"
                value={userData.street || business.street || ""}
                name="street"
                disabled={postalLocalities?.length <= 0}
                onChange={(e) => {
                  setuserData({ ...userData, street: e.target.value });
                }}
              >
                <option value="">Choose localities</option>
                {postalLocalities?.map((ele, idx) => <option value={ele} key={idx}>{ele}</option>)}
              </select>
            </div>
            <div className="col-6">
              <label className={style.label}>City</label>
              <input
                type="text"
                className="form-control"
                placeholder="City"
                name="city"
                value={userData.city || business.city || ""}
                disabled
                onChange={(e) => {
                  setuserData({ ...userData, city: e.target.value });
                }}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label className={style.label}>State</label>
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
            </div>
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
                value={location.lat || business.lat || ""}
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
                value={location.lng || business.lng || ""}
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

      {showTiming && business.length !== 0 && (
        <FormEditTimings
          userData={userData}
          setuserData={setuserData}
          holidays={holidays}
          setHolidays={setHolidays}
          allTime={allTime}
          setAllTime={setAllTime}
          business={business}
        />
      )}

      {showTiming && business.length === 0 && (
        <FormAddTimings
          userData={userData}
          setuserData={setuserData}
          holidays={holidays}
          setHolidays={setHolidays}
          allTime={allTime}
          setAllTime={setAllTime}
        />
      )}

      <div className="text-center">
        <button
          type="submit"
          className="btn bg-gradient-info w-50 mt-4 mb-0"
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
      </div>
    </form>
  );
};

export default FormAddBusiness;
