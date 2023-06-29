import logo from "../Logo.png";
import { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "../api/axios";
import PopupLogin from './Popup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register_URL = "/register";
const SignUp = ({ setView}) => {
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const wrapperRef = useRef(null);
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errorMsg, setError] = useState(null);
  const [usernameBorderColor, setUsernameBorderColor] = useState(true);
  const [emailBorderColor, setEmailBorderColor] = useState(true);
  const [passwordBorderColor, setPasswordBorderColor] = useState(true);
  const [confirmPasswordBorderColor, setConfirmPasswordBorderColor] =useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

 
  const [moveToLogin, setMoveToLogin] = useState(false);

  const validInputClass =
    "peer h-full w-full rounded-md border border-blue-gray-300 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-300 placeholder-shown:border-t-blue-gray-300 focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50";
  const invalidInputClass =
    " peer h-full w-full rounded-md border border-red-600 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-red-600 placeholder-shown:border-t-red-600 focus:border-2 focus:border-red-600 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-red-600";
  const validLabelClass =
    "block text-gray-700 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-orange-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-orange-500 peer-disabled:text-transparent  peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500";
  const invalidLabelClass =
    "block text-red-600 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-red-600 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5before:rounded-tl-md before:border-t before:border-l before:border-red-600 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-red-600 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-red-600 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-red-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-red-600 peer-disabled:text-transparent  peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-red-600";

  
    const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const data = {
      username: formdata.get("username"),
      password: formdata.get("password"),
      firstname: formdata.get("firstname"),
      lastname: formdata.get("lastname"),
      email: formdata.get("email"),
      confirm: formdata.get("confirm"),
    };

    try {

      const responseRegister = await toast.promise(
        axios.post(Register_URL, data),
        {
          pending: 'Loading...',
          success: 'You have registered sucssfully'
        },
      ); 
      if(responseRegister.status === 201)
      {
        const responseLogin = await axios.post(
          '/login',
          JSON.stringify({ username: data.username, pwd: data.password }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(JSON.stringify(responseLogin?.data));
        const accessToken = responseLogin?.data?.accessToken;
        console.log(accessToken);
        const user = data.username;
        const pwd = data.password;
        setAuth({ user, pwd, accessToken });
        setIsLogin(false);
        navigate('/profile');
      }
      console.log(responseRegister.data);
    } catch (error) {
      // Handle error response
      if (error.response) {
        const { status, data } = error.response;
        console.log(status); 
        console.log(data.message);
        if (
          data.message === "username taken already please try somthing else."
        ) {
          setError("Username is already taken.");
          setUsernameBorderColor(false);
        } else if (
          data.message === "Some fields does not meet the requrements."
        ) {
          setError("The password and the confirm must be match."); 
          setPasswordBorderColor(false);
          setConfirmPasswordBorderColor(false);
        } else if (
          data.message === "email taken already please try somthing else."
        ) {
          setError("Email is already taken."); 
          setEmailBorderColor(false);
        } else {
          setError(data.message); 
        }
      } else {
        console.log(error.message);
        setError("An error occurred.");
      }
    }
  };

  return (
    <div>
      <form className="flex h-full flex-col items-center justify-evenly" onSubmit={handleSubmit}>
        <label htmlFor="header" className="text-4xl uppercase font-bold">Sign up</label>
        <div className="relative h-11 w-full min-w-[200px] mt-8 mb-2 ">
          <input
            className={
              usernameBorderColor ? validInputClass : invalidInputClass
            }
            type="text"
            name="username"
            minLength="4"
            id=""
            placeholder=" "
            autoFocus
            autoComplete="true"
            value={username}
            onChange={(e) => {
              setUser(e.target.value);
              setUsernameBorderColor(true);
              setError(null);
            }}
            required
          />
          <label
            className={
              usernameBorderColor ? validLabelClass : invalidLabelClass
            }
          >
            Username
          </label>
        </div>

        <div className="mt-4 relative h-11 w-full min-w-[200px]">
          <input
            className={
              passwordBorderColor ? validInputClass : invalidInputClass
            }
            type="password"
            name="password"
            id=""
            placeholder=" "
            minLength="8"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordBorderColor(true);
              setConfirmPasswordBorderColor(true);
              setError(null);
            }}
            required
          />
          <label
            className={
              passwordBorderColor ? validLabelClass : invalidLabelClass
            }
          >
            Password
          </label>
        </div>

        <div className="mt-4 relative h-11 w-full min-w-[200px]">
          <input
            className={
              confirmPasswordBorderColor ? validInputClass : invalidInputClass
            }
            type="password"
            name="confirm"
            id=""
            placeholder=" "
            minLength="8"
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
              setConfirmPasswordBorderColor(true);
              setPasswordBorderColor(true);
              setError(null);
            }}
            required
          />
          <label
            className={
              confirmPasswordBorderColor ? validLabelClass : invalidLabelClass
            }
          >
            Confirm Password
          </label>
        </div>

        <div className="mt-4 relative h-11 w-full min-w-[200px]">
          <input
            className={validInputClass}
            type="text"
            name="firstname"
            id=""
            placeholder=" "
            minLength="1"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label className={validLabelClass}>First name</label>
        </div>
        <div className="mt-4 relative h-11 w-full min-w-[200px]">
          <input
            className={validInputClass}
            type="text"
            name="lastname"
            id=""
            placeholder=" "
            minLength="1"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label className={validLabelClass}>Last name</label>
        </div>
        <div className="mt-4 relative h-11 w-full min-w-[200px]">
          <input
            className={emailBorderColor ? validInputClass : invalidInputClass}
            type="email"
            name="email"
            id=""
            placeholder=" "
            minLength="11"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailBorderColor(true);
              setError(null);
            }}
            required
          />
          <label
            className={emailBorderColor ? validLabelClass : invalidLabelClass}
          >
            Email
          </label>
          {errorMsg && errorMsg.includes("email") && (
            <p className="text-red-500 text-sm">Email is already taken.</p>
          )}
        </div>

        <div className="text-right mb-10 mt-auto">

          <button
            type="submit"
            className="mt-6 block w-full select-none rounded-lg bg-orange-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Sign Up
          </button>
   

        <p className="mt-4 block font-small text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
            Already have an account?
            <button
              type="button"
              onClick={() => setView("login")}
              className="font-medium text-orange-500 transition-colors hover:text-orange-800"
              href="#"
            >
              Login
            </button>
          </p>
          {errorMsg && <p className="bt-6 text-red-500 text-sm">{errorMsg}</p>}
              </div> 
      </form>


      <Popup className="relative bg-white rounded-lg" open={isSignUp} closeOnDocumentClick onClose={() => {
        console.log('1');
        setMoveToLogin(true)
        }}>
        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Registration Successful!
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed text-gray-500 ">
                You have successfully registered. Welcome!
                </p>
               
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button 
                onClick={() => {
                  console.log('2');
                  // setIsLogin(true) 
                   setView('login') 
                    setMoveToLogin(true) 
                   setIsSignUp(false)}
              }
                data-modal-hide="defaultModal" 
                type="button" 
                className="text-white bg-orange-500 hover:bg-black focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Close</button>   
            </div>
          
        </Popup>
        <ToastContainer/>
{/* {moveToLogin && <PopupLogin  setIsLogin={setIsLogin} setView={setView}/>}; */}
   
    </div>
  );
};

export default SignUp;
