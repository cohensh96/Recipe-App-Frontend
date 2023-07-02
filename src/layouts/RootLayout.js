import React, { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import logo from '../Logo.png';
import { FaUser } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import Popup from '../components/Popup';

/**
 * Component representing the mobile layout for the root page.
 * Renders a responsive navigation bar with links and a menu button for smaller screens.
 *
 * @param {boolean} setIsLogin - Function to set the login state.
 * @returns {JSX.Element} Mobile layout component.
 */
export const RootMobileLayout = ({ setIsLogin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const closeButton = useRef(null);
  const { auth } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        !closeButton.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, setIsOpen, isOpen]);

  return (
    <div className="relative md:p-0">
      <button
        ref={closeButton}
        className="lg:hidden z-50 absolute top-0 right-0 bg-transparent group"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {/* Menu button */}
      </button>
      <div className={`${isOpen ? 'fixed h-screen w-screen' : ''}`}>
        <div className={`${isOpen ? 'navbar-backdrop md:absolute md:right-0 md:bg-gray-800 md:w-[50vw] md:h-screen md:opacity-25 transition-all duration-200 ease-in lg:hidden' : ''}`}></div>
        <nav
          ref={wrapperRef}
          className={`p-5 absolute w-full md:w-[50vw] h-screen left-0 opacity-100 bg-slate-100 transition-all duration-500 ease-in lg:hidden ${isOpen ? 'animate-enter-menu' : '-translate-x-full'}`}
          role="navigation"
          id="global-navigation"
        >
          <ul className="flex h-full flex-1 flex-col justify-evenly items-center">
            {/* Navigation links */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

/**
 * Component representing the desktop layout for the root page.
 * Renders a navigation bar with links for larger screens.
 *
 * @param {boolean} setIsLogin - Function to set the login state.
 * @returns {JSX.Element} Desktop layout component.
 */
export const RootLayoutDesktop = ({ setIsLogin }) => {
  return (
    <div className="hidden lg:block">
      <nav className="p-5 flex justify-evenly items-center" role="navigation" id="global-navigation">
        <ul className="flex flex-1 flex-row justify-evenly items-center">
          {/* Navigation links */}
        </ul>
      </nav>
    </div>
  );
};

/**
 * Root layout component for the entire application.
 *
 * @param {boolean} setLogin - Initial login state.
 * @returns {JSX.Element} Root layout component.
 */
export default function RootLayout({ setLogin }) {
  const headerStyle = 'header sticky top-0 bg-gradient-to-b from-zinc-200 from-60% backdrop-blur lg:px-8 lg:py-02 z-40';
  const [scrollPostion, setScrollPostion] = useState(0);
  const [isLogin, setIsLogin] = useState(setLogin);
  const { auth } = useAuth();

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPostion(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup function
    };
  }, []);

  return (
    <div className="root-layout">
      {/* Popup component for login */}
      {isLogin && !auth.accessToken && <Popup setIsLogin={setIsLogin} />}
      <header className={scrollPostion > 100 ? headerStyle + ' shadow-lg' : headerStyle}>
        {/* Mobile layout */}
        <RootMobileLayout setIsLogin={setIsLogin} />
        {/* Desktop layout */}
        <RootLayoutDesktop setIsLogin={setIsLogin} />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
