import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Actions from "../../redux/actions/home.actions";
import ActionTypes from "../../helpers/action.types";
import { useParams } from "react-router-dom";
import HomeHeader from "./layout/Header";
import HomeFooter from "./layout/Footer";
import BlankHeader from "./layout/BlankHeader";
import BusinessDetails from "./support/BusinessDetails";
const HomeBusiness = () => {
  const { id } = useParams();
  const [tokenForm, setTokenForm] = useState({
    business_id: id,
    name: "",
    phone: "",
    mode: "",
    service: "",
    client_id: "",
    time: "",
    options: {},
  });
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isSbtDis, setIsSbtDis] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(false);
  const [subcategoryID, setSubCategoryID] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [city, setCity] = useState(false);
  const [dist, setDist] = useState("");
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [mot, setMot] = useState("");
  const dispatch = useDispatch();
  var business = [];
  var timeslots = [];
  var categories = [];
  var subcategories = [];
  var cityName = [];

  categories = useSelector((state) => {
    return state.home.categories;
  });
  subcategories = useSelector((state) => {
    return state.home.subcategory;
  });

  cityName = useSelector((state) => {
    return state.home.city;
  });
  business = useSelector((state) => {
    return state.home.business;
  });
  timeslots = useSelector((state) => {
    return state.home.timeslots;
  });
  const getSubcategories = (id) => {
    dispatch(
      Actions.getData(
        ActionTypes.GET_SUBCATEGORY,
        `/subcategories/${id}`,
        setErrors,
        setIsLoading
      )
    );
  };
  const filterForm = (event) => {
    event.preventDefault();
    const checkCity = city ? city : cityName?.address?.city || "";
    const checkDist = dist ? dist : 5;
    history.push(
      `/search?cat=${categoryID}&subcat=${subcategoryID}&city=${checkCity}&dist=${checkDist}&lat=${location.lat}&lng=${location.lng}`
    );
  };
  useEffect(() => {
    dispatch(
      Actions.getData(
        ActionTypes.PUBLIC_GET_BUSINESS,
        `/businesses/${id}`,
        setErrors,
        setIsLoading
      )
    );
    dispatch(
      Actions.getData(
        ActionTypes.GET_CATEGORIES,
        "/categories",
        setErrors,
        setIsLoading
      )
    );
    dispatch(
      Actions.getData(
        ActionTypes.PUBLIC_GET_BUSINESSES,
        "/businesses",
        setErrors,
        setIsLoading
      )
    );

    dispatch(
      Actions.getData(
        ActionTypes.GET_HOME_CATEGORIES,
        "/homecategories",
        setErrors,
        setIsLoading
      )
    );

    try {
      navigator.geolocation.getCurrentPosition(function (position) {
        if (position.coords.latitude && position.coords.longitude) {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          dispatch(
            Actions.getData(
              ActionTypes.GET_CITY_NAME,
              `/getcityname?lat=${position.coords.latitude}&lng=${position.coords.longitude}`,
              setErrors,
              setIsLoading
            )
          );
        }
      });
    } catch (e) {}
  }, [dispatch]);
  const getTimeSlot = (service_id) => {
    if (!service_id) {
      return;
    }
    dispatch(
      Actions.getData(
        ActionTypes.PUBLIC_GET_TIMESLOTS,
        `/gettimeslot?id=${service_id}&lat=${location.lat}&lng=${location.lng}&mode=${tokenForm.mode}`,
        setErrors,
        setIsLoading
      )
    );
  };
  const onPickupSubmit = (e) => {
    e.preventDefault();
    setIsSbtDis(true);
    tokenForm.options = JSON.stringify(tokenForm.options);
    dispatch(
      Actions.postData(
        ActionTypes.PUBLIC_POST_TOKEN,
        `/tokens/`,
        tokenForm,
        setErrors,
        setSuccess,
        setIsLoading
      )
    );
  };

  return (
    <div className="container-fuild" style={{ backgroundColor: "white" }}>
      <HomeHeader
        categories={categories}
        subcategories={subcategories}
        cityName={cityName}
        getSubcategories={getSubcategories}
        setCategoryID={setCategoryID}
        filterForm={filterForm}
        setSubCategoryID={setSubCategoryID}
        setCity={setCity}
        setDist={setDist}
        city={city}
      />

      <BusinessDetails
        business={business}
        tokenForm={tokenForm}
        setTokenForm={setTokenForm}
        onPickupSubmit={onPickupSubmit}
        isSbtDis={isSbtDis}
        setIsSbtDis={setIsSbtDis}
        timeslots={timeslots}
        getTimeSlot={getTimeSlot}
        errors={errors}
        success={success}
        isLoading={isLoading}
      />
      <HomeFooter />
    </div>
  );
};

export default HomeBusiness;
