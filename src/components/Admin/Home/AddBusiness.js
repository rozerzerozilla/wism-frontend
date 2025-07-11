import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import AdminFooter from "./layout/admin.footer";
import AdminHeader from "./layout/admin.header";
import AdminNavMenu from "./layout/admin.navmenu";
import FormAddBusiness from "./support/form.add.business";
import ActionTypes from "../../../helpers/action.types";
import { AddBusiness } from "../../../helpers/admin.joi";
import * as Actions from "../../../redux/actions/admin.actions";
import { toast } from "react-toastify";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
//const format = "DD-MM-YYYY";
const AdminAddBusiness = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const [allTime, setAllTime] = useState(false);
  const [userData, setuserData] = useState({
    name: "",
    phone: "",
    bname: "",
    telephone: "",
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
  const DefaultZoom = 12;
  const [defaultLocation, setDefaultLocation] = useState(Loc);
  const [location, setLocation] = useState(Loc);
  const [zoom, setZoom] = useState(DefaultZoom);
  const [postal_localities, setPostalLocalities] = useState([]);

  function handleChangeLocation(lat, lng) {
    // console.log(rest)
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  const dispatch = useDispatch();
  var categories = [];
  var subcategories = [];
  categories = useSelector((state) => {
    return state.clients.categories;
  });
  subcategories = useSelector((state) => {
    return state.clients.subcategory;
  });
  var latlng = [];
  latlng = useSelector((state) => {
    return state.clients.latlng;
  });

  useEffect(() => {
    console.log(latlng);
    setDefaultLocation({
      lat: latlng.lat,
      lng: latlng.lng,
    });
    setLocation({ lat: latlng?.lat, lng: latlng?.lng });
    var postalData = latlng?.address_components;
    postalData?.map((ele, idx) => {
      if (ele.types[0] === 'administrative_area_level_1') {
        setuserData(prevState => ({
          ...prevState,
          state: ele.long_name,
        }))
      } else if (ele.types[0] === 'administrative_area_level_2') {
        setuserData(prevState => ({
          ...prevState,
          city: ele.long_name,
        }))
      } else if (ele.types[0] === 'locality') {
        setuserData(prevState => ({
          ...prevState,
          street: ele.long_name,
        }))
      }
    })
    setPostalLocalities(latlng.postal_localities)
  }, [latlng])

  const getSubcategories = (id) => {
    // console.log(id)
    if (id !== "") {
      dispatch(
        Actions.getPData(
          ActionTypes.GET_SUBCATEGORY,
          `/subcategories/${id}`,
          setErrors,
          setIsLoading
        )
      );
    } else {
      dispatch({
        type: ActionTypes.GET_SUBCATEGORY,
        payload: []
      })
      setuserData(ps=>({...ps, subcategories:[]}))
    }
  };

  useEffect(() => { getSubcategories("") }, []);

  //add the client
  const onSubmit = (event) => {
    event.preventDefault();
    const validInputs = validateForm();
    if (!validInputs) {
      toast.error("Kindly Check All input fields");
      return null;
    }
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("phone", userData.phone);
    formData.append("bname", userData.bname);
    formData.append("telephone", userData.telephone);
    formData.append("website", userData.website);
    formData.append("info", userData.info);
    if (userData.photo) {
      formData.append("photo", userData.photo, userData.photo.name);
    }
    if (userData.ad1) {
      formData.append("ad1", userData.ad1, userData.ad1.name);
    }
    if (userData.ad2) {
      formData.append("ad2", userData.ad2, userData.ad2.name);
    }
    formData.append("address1", userData.address1);
    formData.append("address2", userData.address2);
    formData.append("street", userData.street);
    formData.append("city", userData.city);
    formData.append("state", userData.state);
    formData.append("postalcode", userData.postalcode);
    formData.append("lat", location.lat);
    formData.append("lng", location.lng);
    formData.append("category", userData.category);
    formData.append("subcategories", userData.subcategories);
    formData.append("open_all_time", allTime);
    formData.append("monday", JSON.stringify(userData.monday));
    formData.append("tuesday", JSON.stringify(userData.tuesday));
    formData.append("wednesday", JSON.stringify(userData.wednesday));
    formData.append("thursday", JSON.stringify(userData.thursday));
    formData.append("friday", JSON.stringify(userData.friday));
    formData.append("saturday", JSON.stringify(userData.saturday));
    formData.append("sunday", JSON.stringify(userData.sunday));
    const newDates = [];
    if (holidays.length > 0) {
      holidays.map((date) => newDates.push(date.format()));
    }
    formData.append("holidays", newDates);
    formData.append(
      "holidays_working",
      JSON.stringify(userData.holidays_working)
    );
    // setIsLoading(true);
    console.log(userData)
    dispatch(
      Actions.postData(
        ActionTypes.POST_CLIENT_BUSINESS,
        "/home/business",
        formData,
        setErrors,
        setSuccess,
        setIsLoading
      )
    );
    // setuserData({});
    subcategories = [];
    window.scrollTo(0, 0);
  };

  useEffect(()=>{
    if(errors){
      toast.error(errors)
    }
    if(success){
      toast.success('Business Added Successfully')
    }
  },[errors, success])

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
    try {
      navigator.geolocation.getCurrentPosition(function (position) {
        if (position) {
          console.log(position)
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
    } catch (e) { }
    getStates();
    getCities();
  }, [dispatch]);

  const getLatLng = async (zipcode) => {
    try {
      if (zipcode.length === 6) {
        dispatch(
          Actions.getData(
            ActionTypes.GET_LATLNG,
            `/home/getlatlng?address=${zipcode}`,
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
      }
    } catch (e) {}
  };


  useEffect(() => {
    const newDates = [];
    holidays.map((date) => {
      console.log(date.format())
      newDates.push(date.format())
    });
    
  },[holidays])

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  async function getStates() {
    const response = await axios.post("https://countriesnow.space/api/v0.1/countries/states", { "country": "India" });
    setStates(response.data.data.states);
  }
  async function getCities() {
    const response = await axios.post("https://countriesnow.space/api/v0.1/countries/cities", { "country": "India" });
    setCities(response.data.data);
  }

  return (
    <>
      <AdminNavMenu path="business" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <AdminHeader header="Business Details" />
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
                {/* {errors && toast.error(errors)} */}
                {success && <Redirect to="/admin/business"/>}

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
                    errors={errors}
                    states={states}
                    cities={cities}
                    postalLocalities={postal_localities}
                    handleBackRoute={()=>{
                      history.goBack()
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <AdminFooter />
      </main>
    </>
  );
};

export default AdminAddBusiness;
