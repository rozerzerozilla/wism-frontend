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
import {URL as HomeURL} from "../../api/home.api"
import axios from "axios";
import PincodeDetails from "./support/PincodeDetails";
import { toast } from "react-toastify";


const Home = () => {
	const history = useHistory();
	const [openPicodeModal, setPincodeModal] = useState(false)
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

	useEffect(() => {
		const city = localStorage.getItem("city");
		const state = localStorage.getItem("state");
		const latitude = localStorage.getItem("lat");
		const longitude = localStorage.getItem("lng");
		if (longitude && latitude) {
			setLocation({ lat: latitude, lng: longitude });
		}
		if (city) {
			setCity(city)
		}
		const pin = localStorage.getItem("current-web-pincode");
		if (pin !== null && pin !== undefined && pin !== "") {
			handleGetPincodeDetails(pin)
		}
	},[])

	const filterForm = (event) => {
		event.preventDefault();
		const checkCity = city ? city : cityName?.address?.city || "";
		const checkDist = dist ? cityName?.address?.city : 5;
		const checkBusiness = inputBusiness ? inputBusiness : "";
		history.push(`/search??business=${checkBusiness}&cat=${categoryID}&subcat=${subcategoryID}&city=${checkCity}&dist=${checkDist}&lat=${location.lat}&lng=${location.lng}`);
	};

	const filterForm2 = (event) => {
		event.preventDefault();
		const checkCity = city ? city : cityName?.address?.city || "";
		const checkBusiness = inputBusiness ? inputBusiness : "Yoga";
		history.push(`/search?business=${checkBusiness}&city=${checkCity}&lat=${location.lat}&lng=${location.lng}`);
	};

	const handleGetPincodeDetails = async (pincode) => {
		localStorage.setItem("current-web-pincode",pincode)
		try {
			const { data } = await axios.get(`${HomeURL}/getlatlang?address=${pincode}`)
			console.log(data)
			if (data) {
				setLocation({ lat: data.lat, lng: data.lng });
				const response = await axios.get(`${HomeURL}/getcityname?lat=${data.lat}&lng=${data.lng}`)
				if (response) {
					localStorage.setItem("places_details", JSON.stringify(data));
					localStorage.setItem("city", response.data.address.city);
					localStorage.setItem("state", response.data.address.state);
					localStorage.setItem("lat", data.lat);
					localStorage.setItem("lng", data.lng);
					dispatch({
						type: ActionTypes.GET_CITY_NAME,
						payload: response.data.address.city + ", " + response.data.address.state,
					});
					dispatch({
						type: ActionTypes.GET_PINCODE_DETAILS,
						payload: data,
					});
					setCity(response.data.address.city + ", " + response.data.address.state)
					setPincodeModal(false)
					return
				}
				console.log(response);
				setPincodeModal(true)
			} else {
				setPincodeModal(true)
				toast.error("unable to get the pincode details")
			}
		} catch (error) {
			setPincodeModal(true)
			toast.error("error:" + error)
		}
		
	}

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

		// try {
		// 	navigator.geolocation.getCurrentPosition(function (position) {
		// 		if (position.coords.latitude && position.coords.longitude) {
		// 			setLocation({
		// 				lat: position.coords.latitude,
		// 				lng: position.coords.longitude,
		// 			});
		// 			dispatch(
		// 				Actions.getData(
		// 					ActionTypes.GET_CITY_NAME,
		// 					`/getcityname?lat=${position.coords.latitude}&lng=${position.coords.longitude}`,
		// 					setErrors,
		// 					setIsLoading
		// 				)
		// 			);
		// 		}
		// 	});
		// } catch (e) { }
	}, [dispatch]);

	return (<>
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
				setPincodeModal={setPincodeModal}
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
		<PincodeDetails
			open={openPicodeModal}
			handleClose={() => setPincodeModal(false)}
			handleSubmitPincode={handleGetPincodeDetails}
		/>
	</>);
};

export default Home;
 