import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ClientsFooter from "./layout/clients.footer";
import ClientsHeader from "./layout/clients.header";
import ClientsNavMenu from "./layout/clients.navmenu";
import FormAddBusiness from "./support/form.add.business";
import ActionTypes from "../../../helpers/action.types";
import { AddBusiness } from "../../../helpers/client.joi";
import * as Actions from "../../../redux/actions/client.actions";
const EditBusiness = () => {
  const history = useHistory();
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const [allTime, setAllTime] = useState(false);
  const [userData, setuserData] = useState({
    bname: "",
    telephone: storedData.phone || "",
    website: "",
    info: "",
    photo: "",
    ad1: "",
    ad2: "",
    address1: "",
    address2: "",
    street: "",
    city: "",
    state: "",
    postalcode: "",
    lat: "",
    lng: "",
    category: "",
    subcategories: [],
    monday: {
      monday_work_from: "",
      monday_work_to: "",
      monday_break_from: "",
      monday_break_to: "",
    },
    tuesday: {
      tuesday_work_from: "",
      tuesday_work_to: "",
      tuesday_break_from: "",
      tuesday_break_to: "",
    },
    wednesday: {
      wednesday_work_from: "",
      wednesday_work_to: "",
      wednesday_break_from: "",
      wednesday_break_to: "",
    },
    thursday: {
      thursday_work_from: "",
      thursday_work_to: "",
      thursday_break_from: "",
      thursday_break_to: "",
    },
    friday: {
      friday_work_from: "",
      friday_work_to: "",
      friday_break_from: "",
      friday_break_to: "",
    },
    saturday: {
      saturday_work_from: "",
      saturday_work_to: "",
      saturday_break_from: "",
      saturday_break_to: "",
    },
    sunday: {
      sunday_work_from: "",
      sunday_work_to: "",
      sunday_break_from: "",
      sunday_break_to: "",
    },
    holidays: [],
    holidays_working: { holiday_work_from: "", holiday_work_to: "" },
  });
  const Loc = { lat: 10, lng: 106 };
  const DefaultZoom = 10;
  const [defaultLocation, setDefaultLocation] = useState(Loc);
  const [location, setLocation] = useState(Loc);
  const [zoom, setZoom] = useState(DefaultZoom);

  const dispatch = useDispatch();
  var categories = [];
  var subcategories = [];
  var latlng = [];
  var business;
  business = useSelector((state) => state.clients.business);

  categories = useSelector((state) => {
    return state.clients.categories;
  });
  subcategories = useSelector((state) => {
    return state.clients.subcategory;
  });
  latlng = useSelector((state) => {
    return state.clients.latlng;
  });

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  const getSubcategories = (id) => {
    dispatch(
      Actions.getPData(
        ActionTypes.GET_SUBCATEGORY,
        `/subcategories/${id}`,
        setErrors,
        setIsLoading
      )
    );
  };

  //add the client
  const onSubmit = (event) => {
    event.preventDefault();

    // const validInputs = validateForm();
    // if (!validInputs) return null;

    const formData = new FormData();
    formData.append("bname", userData.bname || business.bname);
    formData.append("telephone", userData.telephone || business.telephone);
    formData.append("website", userData.website || business.website);
    formData.append("info", userData.info || business.info);
    if (userData.photo) {
      formData.append("photo", userData.photo, userData.photo.name);
    }
    if (userData.ad1) {
      formData.append("ad1", userData.ad1, userData.ad1.name);
    }
    if (userData.ad2) {
      formData.append("ad2", userData.ad2, userData.ad2.name);
    }
    formData.append("address1", userData.address1 || business.address1);
    formData.append("address2", userData.address2 || business.address2);
    formData.append("street", userData.street || business.street);
    formData.append("city", userData.city || business.city);
    formData.append("state", userData.state || business.state);
    formData.append("postalcode", userData.postalcode || business.postalcode);
    formData.append("lat", location.lat || business.lat);
    formData.append("lng", location.lng || business.lng);
    if (!userData.category) {
      formData.append("category", business.category.toString());
    } else {
      formData.append("category", userData.category);
    }

    if (userData.subcategories.length <= 0) {
      formData.append("subcategories", business.subcategories?.split(","));
    } else {
      formData.append("subcategories", userData.subcategories.join());
    }

    formData.append("open_all_time", allTime || false);
    formData.append("monday", JSON.stringify(userData.monday));
    formData.append("tuesday", JSON.stringify(userData.tuesday));
    formData.append("wednesday", JSON.stringify(userData.wednesday));
    formData.append("thursday", JSON.stringify(userData.thursday));
    formData.append("friday", JSON.stringify(userData.friday));
    formData.append("saturday", JSON.stringify(userData.saturday));
    formData.append("sunday", JSON.stringify(userData.sunday));
    if (holidays) {
      const newDates = [];
      holidays.map((date) => newDates.push(date.format()));
      formData.append("holidays", newDates);
    }
    formData.append(
      "holidays_working",
      JSON.stringify(userData.holidays_working)
    );

    setIsLoading(true);
    dispatch(
      Actions.postData(
        ActionTypes.POST_CLIENT_BUSINESS,
        "/home/editbusiness",
        formData,
        setErrors,
        setSuccess,
        setIsLoading
      )
    );
    // setuserData({});
    // window.scrollTo(0, 0);
  }; 

  //validate form
  const validateForm = () => {
    const results = AddBusiness.validate(userData);
    if (results.error) {
      setErrors(results.error.details[0].message);
      return false;
    }
    setErrors("");
    return results.value;
  };

  const getLatLng = async () => {
    try {
      // if (userData.postalcode.length === 6) {
      const add =
        userData.address1 +
        "," +
        userData.address2 +
        "," +
        userData.street +
        "," +
        userData.city +
        "," +
        userData.state;
      dispatch(
        Actions.getData(
          ActionTypes.GET_LATLNG,
          `/home/getlatlng?address=${add}`,
          setErrors,
          setIsLoading
        )
      );
      if (latlng.lat && latlng.lng) {
        setDefaultLocation({
          lat: latlng.lat,
          lng: latlng.lng,
        });
        setLocation({ lat: latlng.lat, lng: latlng.lng });
      }
      // }
    } catch (e) {}
  };

  useEffect(() => {
    if (success) {
      history.push('/clients/business')
    }
  },[success])

  //get user roles
  useEffect(() => {
    dispatch(
      Actions.getPData(
        ActionTypes.GET_CATEGORIES,
        "/categories",
        setErrors,
        setIsLoading
      )
    );
    dispatch(
      Actions.getData(
        ActionTypes.GET_CLIENT_BUSINESS,
        "/home/business",
        setErrors,
        setIsLoading
      )
    );
    try {
      navigator.geolocation.getCurrentPosition(function (position) {
        if (position) {
          // DefaultLocation.lat = position.coords.latitude;
          // DefaultLocation.lng = position.coords.longitude;
          setDefaultLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        }
      });
    } catch (e) {}
  }, [dispatch]);
  useEffect(() => {
    if (business?.timings) {
      userData.monday.monday_work_from = business?.timings[0]?.work_from || "";
      userData.monday.monday_work_to = business?.timings[0]?.work_to || "";
      userData.monday.monday_break_from =
        business?.timings[0]?.break_from || "";
      userData.monday.monday_break_to = business?.timings[0]?.break_to || "";

      userData.tuesday.tuesday_work_from =
        business?.timings[1]?.work_from || "";
      userData.tuesday.tuesday_work_to = business?.timings[1]?.work_to || "";
      userData.tuesday.tuesday_break_from =
        business?.timings[1]?.break_from || "";
      userData.tuesday.tuesday_break_to = business?.timings[1]?.break_to || "";

      userData.wednesday.wednesday_work_from =
        business?.timings[2]?.work_from || "";
      userData.wednesday.wednesday_work_to =
        business?.timings[2]?.work_to || "";
      userData.wednesday.wednesday_break_from =
        business?.timings[2]?.break_from || "";
      userData.wednesday.wednesday_break_to =
        business?.timings[2]?.break_to || "";

      userData.thursday.thursday_work_from =
        business?.timings[3]?.work_from || "";
      userData.thursday.thursday_work_to = business?.timings[3]?.work_to || "";
      userData.thursday.thursday_break_from =
        business?.timings[3]?.break_from || "";
      userData.thursday.thursday_break_to =
        business?.timings[3]?.break_to || "";

      userData.friday.friday_work_from = business?.timings[4]?.work_from || "";
      userData.friday.friday_work_to = business?.timings[4]?.work_to || "";
      userData.friday.friday_break_from =
        business?.timings[4]?.break_from || "";
      userData.friday.friday_break_to = business?.timings[4]?.break_to || "";

      userData.saturday.saturday_work_from =
        business?.timings[5]?.work_from || "";
      userData.saturday.saturday_work_to = business?.timings[5]?.work_to || "";
      userData.saturday.saturday_break_from =
        business?.timings[5]?.break_from || "";
      userData.saturday.saturday_break_to =
        business?.timings[5]?.break_to || "";

      userData.sunday.sunday_work_from = business?.timings[6]?.work_from || "";
      userData.sunday.sunday_work_to = business?.timings[6]?.work_to || "";
      userData.sunday.sunday_break_from =
        business?.timings[6]?.break_from || "";
      userData.sunday.sunday_break_to = business?.timings[6]?.break_to || "";
    }
    userData.holidays_working.holiday_work_from = business.holiday_work_from;
    userData.holidays_working.holiday_work_to = business.holiday_work_to;
  }, [business]);
  return (
    <>
      <ClientsNavMenu path="business" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <ClientsHeader header="Business Details" />
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <div className="row">
                    <div className="col-9">
                      <h6>Add Your Business Details</h6>
                    </div>
                    <div className="col-3"></div>
                  </div>
                </div>
                {errors && (
                  <div
                    className="alert alert-danger mx-5"
                    role="alert"
                    style={{ color: "white" }}
                  >
                    {errors}
                  </div>
                )}

                <div className="card-body px-0 pt-0 pb-2">
                  <FormAddBusiness
                    categories={categories}
                    getSubcategories={getSubcategories}
                    subcategories={subcategories}
                    userData={userData}
                    setuserData={setuserData}
                    isLoading={isLoading}
                    onSubmit={onSubmit}
                    defaultLocation={defaultLocation}
                    zoom={zoom}
                    handleChangeLocation={handleChangeLocation}
                    handleChangeZoom={handleChangeZoom}
                    location={location}
                    holidays={holidays}
                    setHolidays={setHolidays}
                    allTime={allTime}
                    setAllTime={setAllTime}
                    getLatLng={getLatLng}
                    success={success}
                    business={business}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ClientsFooter />
      </main>
    </>
  );
};

export default EditBusiness;
