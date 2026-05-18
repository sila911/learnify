import React, { useState, useEffect } from 'react';

const Navbar = ({ onSearchClick, onSavedClick }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <>
      <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3 md:p-4">
          <div className="flex items-center gap-2">
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                <i className="fa-solid fa-graduation-cap md:fa-lg"></i>
              </div>
              <span className="hidden md:block self-center text-2xl font-bold whitespace-nowrap text-gray-900 dark:text-white">
                Learnify
              </span>
            </a>
          </div>

          <div className="flex items-center gap-2 md:gap-3 md:order-2">
            <button
              onClick={onSearchClick}
              type="button"
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2 transition"
              title="Search courses (Ctrl+K)"
            >
              <i className="fa-solid fa-magnifying-glass w-5 h-5"></i>
            </button>

            <button
              onClick={toggleTheme}
              type="button"
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              )}
            </button>

            <button
              onClick={onSavedClick}
              className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg border border-gray-700 transition text-xs md:text-sm font-medium"
            >
              <i className="fa-regular fa-bookmark md:mr-1"></i>
              <span className="hidden xs:inline">Save</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open main menu</span>
              <i className="fa-solid fa-bars fa-lg"></i>
            </button>
          </div>

          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-secondary md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <a href="#" className="block py-2 px-3 text-white bg-primary rounded md:bg-transparent md:text-primary md:p-0" aria-current="page">
                  <i className="fa-solid fa-house mr-2"></i>Home
                </a>
              </li>
              <li>
                <a href="#courses" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition">
                  <i className="fa-solid fa-book-open mr-2"></i>Courses
                </a>
              </li>
              <li>
                <a href="#about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition">
                  <i className="fa-solid fa-circle-info mr-2"></i>About
                </a>
              </li>
              <li>
                <a href="#pricing" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition">
                  <i className="fa-solid fa-tags mr-2"></i>Pricing
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[90] md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 top-0 right-0 z-[95] h-full min-h-screen overflow-hidden w-[80vw] max-w-none bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Learnify</span>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <ul className="flex-1 flex flex-col p-6 pt-4 overflow-y-auto mt-0 font-medium border-0 rounded-none bg-transparent space-y-2">
          <li>
            <a href="#" className="block py-2 px-3 text-white bg-primary rounded" aria-current="page">
              <i className="fa-solid fa-house mr-2"></i>Home
            </a>
          </li>
          <li>
            <a href="#courses" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 transition">
              <i className="fa-solid fa-book-open mr-2"></i>Courses
            </a>
          </li>
          <li>
            <a href="#about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 transition">
              <i className="fa-solid fa-circle-info mr-2"></i>About
            </a>
          </li>
          <li>
            <a href="#pricing" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 transition">
              <i className="fa-solid fa-tags mr-2"></i>Pricing
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
