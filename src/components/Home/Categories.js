import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Actions from "../../redux/actions/home.actions";
import ActionTypes from "../../helpers/action.types";
import HomeHeader from "./layout/Header";
import HomeFooter from "./layout/Footer";
import BusinessLists from "./support/BusinessLists";
import BlankHeader from "./layout/BlankHeader";
const Categories = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const dispatch = useDispatch();
  var businesses = [];
  businesses = useSelector((state) => {
    return state.home.businesses;
  });
  useEffect(() => {
    dispatch(
      Actions.getData(
        ActionTypes.PUBLIC_GET_BUSINESSES,
        `/search?cat=${id}`,
        setErrors,
        setIsLoading
      )
    );
  }, [dispatch]);
  return (
    <>
      <BlankHeader />
      <HomeHeader />
      <br />
      <div className="mt-5"></div>
      <BusinessLists
        businesses={businesses}
        title="Your Search Results"
        isLoading={isLoading}
        errors={errors}
      />
      <HomeFooter />
    </>
  );
};

export default Categories;
