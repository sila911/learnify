import React, { useState, useEffect } from 'react';

const SearchModal = ({ isOpen, onClose, trendingCourses, onCourseClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredCourses = searchQuery.trim() === ''
    ? []
    : (trendingCourses || []).filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredCourses.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCourses[selectedIndex]) {
        onCourseClick(filteredCourses[selectedIndex]);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

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
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              className="w-full pl-12 pr-6 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              autoComplete="off"
              autoFocus
            />
          </div>
        </div>

        <div id="search-results" className="max-h-96 overflow-y-auto">
          {searchQuery.trim() === '' ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              <p className="text-sm">Start typing to search courses...</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              <p className="text-sm">No courses found matching "{searchQuery}"</p>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {filteredCourses.map((course, idx) => (
                <div
                  key={course.id}
                  onClick={() => {
                    onCourseClick(course);
                    onClose();
                  }}
                  className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition ${
                    idx === selectedIndex 
                      ? 'bg-primary/10 text-primary dark:text-white' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <img src={course.image} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" alt={course.title} />
                  <div className="min-w-0 flex-grow">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-gray-500 dark:text-gray-400">
                        {course.category}
                      </span>
                      <span className="text-xs text-accent flex items-center gap-0.5">
                        <i className="fa-solid fa-star"></i> {course.rating}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm truncate mt-1 text-gray-900 dark:text-white">{course.title}</h4>
                  </div>
                  <i className="fa-solid fa-chevron-right text-gray-400 text-xs"></i>
                </div>
              ))}
            </div>
          )}
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
