import React, { useState, useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import { APIUrl } from "../config/APIUrlConfig";
import { checkValidData } from "../utils/validate";
import { BACKGROUND_IMG } from "../utils/constants";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { addLoggedInUser } from "../utils/loginStateSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [popupMessage, setPopupMessage] = useState("Invalid Login");

  // Define a state variable to track whether the password is visible or not
  const [showPassword, setShowPassword] = useState(false);
  // Function to handle toggling between showing and hiding the password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const firstname = useRef(null);
  const lastname = useRef(null);
  const mobno = useRef(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude.toString());
            setLongitude(position.coords.longitude.toString());
          },
          (error) => {
            setErrorMessage(error.message);
          }
        );
      } else {
        setErrorMessage("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  // Empty dependency array means this effect runs once after the first render
  const handleButtonClick = async (e) => {
    e.preventDefault();

    const message = checkValidData(email.current.value, password.current.value);

    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign up Logic
      const reg_url = APIUrl.baseURL.baseurl + APIUrl.auth.register;

      axios
        .post(
          reg_url,
          {
            email: email.current.value,
            password: password.current.value,
            first_name: firstname.current.value,
            last_name: lastname.current.value,
            mob_no: mobno.current.value,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          const status = response?.data?.success;
          console.log(status);
          if (status === false) {
            const msg = response?.data?.msg;
            console.log(msg);
            setShowPopup(true);
            setPopupMessage(msg);
            return;
          }
          navigate("/browse");
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      // Sign In Logic

      // First Axios POST request for user authentication
      axios
        .post(
          APIUrl.baseURL.baseurl + APIUrl.auth.login,
          {
            email: email.current.value,
            password: password.current.value,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              accept: "application/json",
            },
          }
        )
        .then((response) => {
          dispatch(addLoggedInUser());
          const userRefData = response?.data?.body?.content;

          const { first_name, last_name, email, mob_no } = userRefData;

          console.log(email);
          console.log(mob_no);

          // Dispatch user data
          dispatch(
            addUser({
              full_name: first_name + " " + last_name,
              email: email,
              mob_no: mob_no,
            })
          );

          // Navigate to "/browse" page
          navigate("/browse");

          // Second Axios POST request for fetching the token
          return axios.post(
            "http://localhost:8000/auth/main/token",
            {
              username: email,
              password: password.current.value,
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                accept: "application/json",
              },
            }
          );
        })
        .then((tokenResponse) => {
          console.log("Token Response", tokenResponse.data);
          // Handle token response as needed
          // Third Axios POST request to send the email notification with longitude and latitude

          const sendData = async () => {
            const url = "http://localhost:8000/user/send/location";
            const token = tokenResponse.data.access_token;
            const data = {
              name: tokenResponse.data.user_name,
              email: tokenResponse.data.user_email,
              latitude: latitude,
              longitude: longitude,
            };
            const headers = {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              accept: "application/json",
            };

            try {
              const response = await axios.post(url, data, { headers });
              console.log("Response:", response.data);
              // Handle response as needed
            } catch (error) {
              console.log("Erorr occured in third axios-----");
              console.error("Error:", error);
              // Handle error as needed
            }
          };

          // Call the function to send the data
          sendData();
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error as needed
          setShowPopup(true);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="fixed h-screen object-cover md:w-screen"
          src={BACKGROUND_IMG}
          alt="background_img"
        />
      </div>
      <form className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <div>
            <input
              ref={firstname}
              type="text"
              placeholder="First Name"
              className="p-4 my-4 w-full bg-gray-700 rounded-lg"
            />

            <input
              ref={lastname}
              type="text"
              placeholder="Last Name"
              className="p-4 my-4 w-full bg-gray-700 rounded-lg"
            />

            <input
              ref={mobno}
              type="text"
              placeholder="Mob No"
              className="p-4 my-4 w-full bg-gray-700 rounded-lg"
            />
          </div>
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
        />

        <input
          ref={password}
          type={showPassword ? "text" : "password"} // Toggle between "text" and "password" based on showPassword state
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
        />
        {/* Add a checkbox or button to toggle password visibility */}
        <input type="checkbox" onChange={togglePasswordVisibility} />
        <label> Show Password</label>

        <p className="text-red-600 font-bold text-lg m-2 p-2">{errorMessage}</p>

        <button
          className="bg-red-700 w-full p-4 my-6 rounded-lg cursor-pointer"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm ? (
            <span>
              <span className="text-lg text-gray-400">New to Netflix? </span>
              Sign Up Now
            </span>
          ) : (
            <span className="text-lg text-gray-400">
              Already registered?{" "}
              <span className="text-lg text-white">Sign In Now.</span>
            </span>
          )}
        </p>

        {showPopup && <p className="text-red-900  font-bold">{popupMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
