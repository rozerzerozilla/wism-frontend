import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Actions from "../../redux/actions/home.actions";
import ActionTypes from "../../helpers/action.types";

import HomeHeader from "./layout/Header";
import HomeContent from "./layout/HomeConent";
import MapContent from "./layout/MapContents";
import HomeFooter from "./layout/Footer";
import SearchHeader from "./support/SearchHeader";
import adImage from "../../assets/c.jpg";

const Search = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [subcategoryID, setSubCategoryID] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [city, setCity] = useState(false);
  const [dist, setDist] = useState("5");
  const [errors, setErrors] = useState(false);
  const [listView, setListView] = useState(true);
  const [inputBusiness, setInputBusiness] = useState("");
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const cat = params.get("cat");
  const subCat = params.get("subcat");
  const inputCity = params.get("city");
  const inputDist = params.get("dist");
  const inBusiness = params.get("business");
  const inLat = params.get("lat");
  const inLng = params.get("lng");
  const dispatch = useDispatch();

  var categories = [];
  var subcategories = [];
  var cityName = [];
  var businesses = [];
  var homeCategories = [];

  businesses = useSelector((state) => {
    return state.home.businesses;
  });
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
    return state.home.homecategory;
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
    window.location = `/search?cat=${categoryID}&subcat=${subcategoryID}&city=${checkCity}&dist=${checkDist}&lat=${location.lat}&lng=${location.lng}`;
  };

  const filterForm2 = (event) => {
    event.preventDefault();
    const checkCity = city ? city : cityName?.address?.city || "";
    const checkBusiness = inputBusiness ? inputBusiness : "Yoga";
    window.location = `/search?business=${checkBusiness}&city=${checkCity}&lat=${location.lat}&lng=${location.lng}`;
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
        `/search?cat=${cat ? cat : ""}&subcat=${subCat ? subCat : ""}&city=${
          inputCity ? inputCity : "Bangalore Urban"
        }&dist=${inputDist ? inputDist : "Bangalore"}&business=${
          inBusiness ? inBusiness : ""
        }&lat=${inLat ? inLat : ""}&lng=${inLng ? inLng : ""}`,
        setErrors,
        setIsLoading
      )
    );
    if (subCat) {
      dispatch(
        Actions.getData(
          ActionTypes.GET_HOME_CATEGORY,
          `/homecategories/${subCat}`,
          setErrors,
          setIsLoading
        )
      );
    } else {
      homeCategories = [];
    }

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

  useEffect(() => {
    console.log(cityName);
  }, [cityName])

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
      <SearchHeader listView={listView} setListView={setListView} />

      {listView && (
        <HomeContent
          isLoading={isLoading}
          errors={errors}
          homeCategories={[]}
          homeSubCategories={homeCategories}
          subCat={subCat}
          businesses={businesses}
          leftad={true}
          rightad={true}
          leftadlink={adImage}
          rightadlink={adImage}
          location={location}
          dist={dist}
        />
      )}
      {!listView && (
        <MapContent
          isLoading={isLoading}
          errors={errors}
          homeCategories={[]}
          homeSubCategories={homeCategories}
          subCat={subCat}
          businesses={businesses}
          leftad={true}
          rightad={true}
          leftadlink={adImage}
          rightadlink={adImage}
        />
      )}
      <HomeFooter />
    </div>
  );
};

export default Search;
