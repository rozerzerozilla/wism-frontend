import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Actions from "../../redux/actions/home.actions";
import ActionTypes from "../../helpers/action.types";

import HomeHeader from "./layout/Header";
import HomeContent from "./layout/HomeConent";
import HomeFooter from "./layout/Footer";
import AdHeader from "./layout/AdHeader";
import adImage from "../../assets/c.jpg";
import "./support/support.css";
import "../../assets/home/fonts/line-icons.css";
import "../../assets/home/css/responsive.css";
const Home = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [subcategoryID, setSubCategoryID] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [city, setCity] = useState(false);
  const [inputBusiness, setInputBusiness] = useState("");
  const [dist, setDist] = useState("");
  const [errors, setErrors] = useState(false);
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const dispatch = useDispatch();
  var categories = [];
  var subcategories = [];
  var cityName = [];
  var homeCategories = [];

  categories = useSelector((state) => {
    return state.home.categories;
  });
  subcategories = useSelector((state) => {
    return state.home.subcategory;
  });

  cityName = useSelector((state) => {
    return state.home.city;
  });

  homeCategories = useSelector((state) => {
    return state.home.homecategories;
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

  useEffect(() => {
    console.log(cityName);
  }, [cityName])

  const filterForm = (event) => {
    event.preventDefault();
    const checkCity = city ? city : cityName?.address?.city || "";
    const checkDist = dist ? cityName?.address?.city : 5;
    const checkBusiness = inputBusiness ? inputBusiness : "";
    history.push(
      `/search??business=${checkBusiness}&cat=${categoryID}&subcat=${subcategoryID}&city=${checkCity}&dist=${checkDist}&lat=${location.lat}&lng=${location.lng}`
    );
  };

  const filterForm2 = (event) => {
    event.preventDefault();
    const checkCity = city ? city : cityName?.address?.city || "";
    const checkBusiness = inputBusiness ? inputBusiness : "Yoga";
    history.push(
      `/search?business=${checkBusiness}&city=${checkCity}&lat=${location.lat}&lng=${location.lng}`
    );
  };

  useEffect(() => {
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
        setInputBusiness={setInputBusiness}
        filterForm2={filterForm2}
      />
      <br />
      <AdHeader />
      <HomeContent
        isLoading={isLoading}
        errors={errors}
        homeCategories={homeCategories}
        subCat={[]}
        businesses={[]}
        leftad={true}
        rightad={true}
        leftadlink={adImage}
        rightadlink={adImage}
        homeSubCategories={[]}
        location={location}
      />
      <HomeFooter />
    </div>
  );
};

export default Home;
