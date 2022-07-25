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

const Landing = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [subcategoryID, setSubCategoryID] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [city, setCity] = useState(false);
  const [dist, setDist] = useState("");
  const [errors, setErrors] = useState(false);
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

  const filterForm = (event) => {
    event.preventDefault();
    const checkCity = city ? city : cityName?.address?.city || "";
    const checkDist = dist ? dist : 5;
    history.push(
      `/search?cat=${categoryID}&subcat=${subcategoryID}&city=${checkCity}&dist=${checkDist}`
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
      />
      <AdHeader />
      <HomeContent
        isLoading={isLoading}
        errors={errors}
        homeCategories={homeCategories}
        subcats={[]}
        leftad={true}
        rightad={true}
        leftadlink={adImage}
        rightadlink={adImage}
      />
      <HomeFooter />
    </div>
  );
};

export default Landing;
