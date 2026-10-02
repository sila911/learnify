import React, { useState, useEffect } from 'react';

const Navbar = ({ onSearchClick, onSavedClick, savedCount, xp = 0, level = 1, currentLevelXP = 0, userName, setUserName, onLogoClick }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
      <nav 
        className="fixed top-2.5 left-4 right-4 z-50 max-w-6xl mx-auto font-sans transition-all duration-300"
        style={{ transform: isVisible ? 'translateY(0)' : 'translateY(-120%)', transition: 'transform 0.4s ease-in-out' }}
      >
        <div className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_8px_30px_rgba(0,0,0,0.2)] rounded-full px-4 sm:px-6 transition-all duration-300">
          <div className="flex flex-wrap items-center justify-between mx-auto p-2 sm:p-3">
            <div className="flex items-center gap-2">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (onLogoClick) onLogoClick();
                }}
                className="flex items-center space-x-2.5 rtl:space-x-reverse group"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white border border-white/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <i className="fa-solid fa-graduation-cap text-xs"></i>
                </div>
                <span className="hidden md:block self-center text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                  Learnify
                </span>
              </a>
            </div>

            <div className="flex items-center gap-2 md:gap-3 md:order-2">
              <button
                onClick={onSearchClick}
                type="button"
                className="hidden sm:block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2 transition"
                title="Search courses (Ctrl+K)"
              >
                <i className="fa-solid fa-magnifying-glass w-5 h-5"></i>
              </button>

              <button
                onClick={toggleTheme}
                type="button"
                className="hidden sm:block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2"
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
                className="hidden sm:flex bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-gray-700 transition text-xs md:text-sm font-medium items-center gap-1.5"
              >
                <i className="fa-regular fa-bookmark"></i>
                <span>Save</span>
                {savedCount > 0 && (
                  <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    {savedCount}
                  </span>
                )}
              </button>

              {/* Gamified Level Indicator Badge */}
              <div className="relative group/profile hidden sm:block">
                <button
                  type="button"
                  className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-full border border-primary/20 transition text-xs md:text-sm font-bold focus:outline-none"
                >
                  <i className="fa-solid fa-trophy text-xs text-accent"></i>
                  <span>Lvl {level}</span>
                </button>
                
                {/* Profile & Leaderboard Dropdown */}
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl p-5 opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all duration-300 z-50 transform translate-y-2 group-hover/profile:translate-y-0">
                  <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold shrink-0">
                      <i className="fa-solid fa-graduation-cap"></i>
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-1.5 border-b border-transparent hover:border-gray-200 dark:hover:border-gray-700 focus-within:border-primary transition">
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="bg-transparent font-bold text-gray-900 dark:text-white text-sm w-36 py-0 px-0 outline-none"
                          placeholder="Your Name"
                          title="Click to edit name"
                        />
                        <i className="fa-solid fa-pen text-[9px] text-gray-400 pointer-events-none"></i>
                      </div>
                      <p className="text-xs text-gray-500">Student & Front-End Dev</p>
                    </div>
                  </div>
                  
                  {/* XP Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1.5 font-medium">
                      <span>XP Progress</span>
                      <span>{currentLevelXP} / 1000 XP</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(currentLevelXP / 1000) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Leaderboard */}
                  <div className="text-left">
                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <i className="fa-solid fa-ranking-star"></i>
                      Weekly Leaderboard
                    </h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50/50 dark:bg-gray-900/50">
                        <span className="font-medium text-gray-500">1. Dara HENG</span>
                        <span className="font-bold text-gray-600 dark:text-gray-300">2,850 XP</span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary font-bold">
                        <span>2. {userName || 'You'} (You)</span>
                        <span>{xp} XP</span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50/50 dark:bg-gray-900/50">
                        <span className="font-medium text-gray-500">3. Sodalin SUN</span>
                        <span className="font-bold text-gray-600 dark:text-gray-300">900 XP</span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50/50 dark:bg-gray-900/50">
                        <span className="font-medium text-gray-500">4. Phirun MENG</span>
                        <span className="font-bold text-gray-600 dark:text-gray-300">450 XP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (onLogoClick) onLogoClick();
                    }}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition" 
                    aria-current="page"
                  >
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
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (onLogoClick) onLogoClick();
            }}
            className="flex items-center gap-3 bg-transparent border-none outline-none cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white border border-white/20 shadow-sm shrink-0">
              <i className="fa-solid fa-graduation-cap text-xs"></i>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Learnify</span>
          </button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* Mobile Profile & XP */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/30 text-left">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold shrink-0">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div>
              <div className="text-left">
                <div className="flex items-center gap-1.5 border-b border-transparent hover:border-gray-200 dark:hover:border-gray-700 focus-within:border-primary transition mb-1">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-transparent font-bold text-gray-900 dark:text-white text-sm w-32 py-0 px-0 outline-none"
                    placeholder="Your Name"
                    title="Click to edit name"
                  />
                  <span className="text-[10px] font-bold bg-primary/20 text-primary px-1.5 py-0.5 rounded-full shrink-0">Lvl {level}</span>
                </div>
                <p className="text-xs text-gray-500">Student & Front-End Dev</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
            <span>Level {level} Progress</span>
            <span>{currentLevelXP}/1000 XP</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-primary h-1.5 rounded-full"
              style={{ width: `${(currentLevelXP / 1000) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Quick Actions Row */}
        <div className="grid grid-cols-3 gap-2 p-5 border-b border-gray-100 dark:border-gray-700">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onSearchClick();
            }}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition"
          >
            <i className="fa-solid fa-magnifying-glass mb-1.5 text-lg"></i>
            <span className="text-xs font-medium">Search</span>
          </button>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onSavedClick();
            }}
            className="relative flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition"
          >
            <i className="fa-solid fa-bookmark mb-1.5 text-lg"></i>
            <span className="text-xs font-medium">Saved</span>
            {savedCount > 0 && (
              <span className="absolute top-2 right-4 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={toggleTheme}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition"
          >
            {isDarkMode ? (
              <i className="fa-solid fa-sun mb-1.5 text-lg text-amber-500"></i>
            ) : (
              <i className="fa-solid fa-moon mb-1.5 text-lg text-purple-600"></i>
            )}
            <span className="text-xs font-medium">{isDarkMode ? 'Light' : 'Dark'}</span>
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
