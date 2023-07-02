import { Outlet, NavLink } from "react-router-dom";
import logo from '../Logo.png'
import {FaUser} from 'react-icons/fa';
import { useState, useEffect, useRef } from "react";
import useAuth from '../hooks/useAuth';
import Popup from '../components/Popup';

export const RootMobileLayout = ({isLogin, setIsLogin}) => {
  const [isOpen,setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const closeButton = useRef(null);
  const {auth} = useAuth();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && wrapperRef.current && !wrapperRef.current.contains(event.target) && !closeButton.current.contains(event.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    
  }, [wrapperRef, setIsOpen, isOpen]);

  return(
    <div className="relative md:p-0">
      <button ref={closeButton} className="lg:hidden z-50 absolute top-0 right-0 bg-transparent group" onClick={() => setIsOpen(prev => !prev)}>
        <div className="relative left-0 flex overflow-hidden items-center justify-center rotate-180 rounded-full w-[50px] h-[50px] transform transition-all bg-orange-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
          <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
            <div className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${isOpen ? "rotate-[42deg]" : ""}`}></div>
            <div className={`bg-white h-[2px] w-1/2 rounded transform transition-all duration-300 ${isOpen ? "-translate-x-10" : ""} `}></div>
            <div className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${isOpen ? "-rotate-[42deg]" : ""} `}></div>
          </div>
        </div>
      </button>
      <div className={`${isOpen ? "fixed h-screen w-screen" : ""}`}>
        <div className={`${isOpen ? "navbar-backdrop md:absolute md:right-0 md:bg-gray-800 md:w-[50vw] md:h-screen md:opacity-25 transition-all duration-200 ease-in lg:hidden" : ""}`}></div>
        <nav ref={wrapperRef} className={`p-5 absolute w-full md:w-[50vw] h-screen left-0 opacity-100 bg-slate-100 transition-all duration-500 ease-in lg:hidden ${isOpen ? "animate-enter-menu" : "-translate-x-full"}`} role="navigation" id="global-navigation" >
              <ul className='flex h-full flex-1 flex-col justify-evenly items-center'>
                  <li onClick={() => setIsOpen(prev => !prev)}>
                    <NavLink to="/"><img src={logo} alt="logo" width={100} height={100}/></NavLink>
                  </li>
                  <li onClick={() => setIsOpen(prev => !prev)} className="p-4 font-bold uppercase hover:text-orange-500 duration-200 cursor-pointer">
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li onClick={() => setIsOpen(prev => !prev)} className="p-4 font-bold uppercase hover:text-orange-500 duration-200 cursor-pointer">
                    <NavLink to="AboutUs">About</NavLink>
                  </li>
                  <li onClick={() => setIsOpen(prev => !prev)} className="p-4 font-bold uppercase hover:text-orange-500 duration-200 cursor-pointer">
                    <NavLink to="recipe">Recipes</NavLink>
                  </li>
                  <li onClick={() => setIsOpen(prev => !prev)} className="p-4 font-bold uppercase hover:text-orange-500 duration-200 cursor-pointer">
                    <NavLink to="StartHere">Start Here</NavLink>
                  </li>   
                  <li onClick={() => {
                    setIsOpen(prev => !prev)
                    setIsLogin(true)
                    }} className="block px-9 py-4 mb-2 leading-loose text-xs text-center text-white font-semibold bg-orange-400 hover:bg-orange-500  rounded-xl">
                    <NavLink to="profile">{auth.accessToken ? `My Profile` : `Sign in`}</NavLink>
                  </li>
              </ul>
        </nav>
      </div>
    </div>
  )
}

export const RootLayoutDesktop = ({isLogin, setIsLogin}) => {
  const {auth} = useAuth();
  return (
    <div className="hidden lg:block">
        <nav className='p-5 flex justify-evenly items-center' role="navigation" id="global-navigation" >
            <ul className='flex flex-1 flex-row justify-evenly items-center'>
                <NavLink to="/profile">
                  <li className="border-2 text-xl border-black p-2 rounded-full hover:border-orange-500 hover:text-orange-500 duration-200 cursor-pointer">
                    <FaUser onClick={() => {
                        setIsLogin(true)
                      } 
                    }
                      />              
                  </li>
                </NavLink> 
                <li className="p-4 font-bold uppercase hover:text-orange-500 duration-200 cursor-pointer">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="p-4 font-bold uppercase hover:text-orange-500 duration-200 cursor-pointer">
                  <NavLink to="AboutUs">About</NavLink>
                </li>
                <NavLink to="/"><img src={logo} alt="logo" width={100} height={100}/></NavLink>
                <li className="p-4 font-bold uppercase hover:text-orange-500 duration-200 cursor-pointer">
                  <NavLink to="recipe">Recipes</NavLink>
                </li>
                <li className="p-4 font-bold uppercase hover:text-orange-500 duration-200 cursor-pointer">
                  <NavLink to="StartHere">Start Here</NavLink>
                </li>   
            </ul>
        </nav>
        </div>
  )
}
export default function RootLayout({setLogin}) {
  const headerStyle = "header sticky top-0 bg-gradient-to-b from-zinc-200 from-60% backdrop-blur lg:px-8 lg:py-02 z-40"
  const [scrollPostion, setScrollPostion] = useState(0);
  const [isLogin, setIsLogin] = useState(setLogin);
  const [view, setView] = useState(isLogin);
  const {auth} = useAuth();

  const handleScroll = () => {
    const postion = window.scrollY;
    setScrollPostion(postion);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {passive:true});
    return () => {
      window.removeEventListener('scroll', handleScroll)// Cleanup function
    }
  }, [])
  return (
    <div className="root-layout">
    {isLogin && !auth.accessToken && <Popup setIsLogin={setIsLogin} setView={setView}/>}
    <header className={scrollPostion > 100 ? headerStyle + " shadow-lg" :headerStyle}>
        
        <RootMobileLayout isLogin={isLogin} setView={setView} setIsLogin={setIsLogin}/>
        <RootLayoutDesktop isLogin={isLogin} setView={setView} setIsLogin={setIsLogin}/>
    </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}


