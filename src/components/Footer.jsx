import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary dark:bg-gray-900 pt-20 pb-10 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-10 mb-10">
          <a href="#" className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white text-sm">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Learnify</span>
          </a>
          <div className="flex space-x-6">
            <a
              href="https://github.com/sila911"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition text-xl"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/sila-sem-78b3872b8/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition text-xl"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="https://www.instagram.com/siladc/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-600 transition text-xl"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://www.facebook.com/silaadc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition text-xl"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm">
          &copy; 2025 Learnify E-learning Platform. All rights reserved. Created by Sila.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
