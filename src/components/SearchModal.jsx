import React from 'react';

const SearchModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-md transition-opacity duration-300 flex items-start justify-center pt-20"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl mx-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700/50">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            <input
              type="text"
              id="search-input"
              placeholder="Search courses (e.g., React, Python, JavaScript)..."
              className="w-full pl-12 pr-6 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              autoComplete="off"
              autoFocus
            />
          </div>
        </div>

        <div id="search-results" className="max-h-96 overflow-y-auto">
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            <p className="text-sm">Start typing to search courses...</p>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700/50 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>
            <kbd className="bg-white dark:bg-gray-700 px-2 py-1 rounded border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">Esc</kbd> to close
          </span>
          <span>
            <kbd className="bg-white dark:bg-gray-700 px-2 py-1 rounded border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">↑↓</kbd> to navigate
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
