import React from 'react';

const SavedDrawer = ({ isOpen, onClose, savedCourses, trendingCourses, onToggleSave, onCourseClick }) => {
  const savedItems = (trendingCourses || []).filter(course => (savedCourses || []).includes(course.id));

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[90] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      <div
        className={`fixed top-0 right-0 z-[100] h-full w-[90vw] md:w-[400px] bg-white dark:bg-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-gray-200 dark:border-gray-700 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            <i className="fa-solid fa-bookmark text-primary mr-2"></i> Saved Courses
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition">
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>

        <div id="saved-list" className="p-5 overflow-y-auto h-[calc(100%-80px)] space-y-4">
          {savedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <i className="fa-regular fa-bookmark text-2xl text-gray-400"></i>
              </div>
              <p className="text-gray-500 dark:text-gray-400">No courses saved yet.</p>
            </div>
          ) : (
            savedItems.map((course) => (
              <div 
                key={course.id}
                onClick={() => {
                  onCourseClick(course);
                  onClose();
                }}
                className="group flex gap-4 p-3 rounded-xl border border-gray-100 dark:border-gray-700/50 hover:border-primary/30 hover:bg-gray-50 dark:hover:bg-gray-700/40 cursor-pointer transition"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                  <img src={course.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" alt={course.title} />
                </div>
                <div className="flex-grow min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate group-hover:text-primary transition">{course.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{course.instructor?.name}</p>
                  </div>
                  <span className="text-xs font-semibold text-primary">{course.category}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(course.id);
                  }}
                  className="self-center p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition"
                  title="Remove from saved"
                >
                  <i className="fa-solid fa-trash-can text-sm"></i>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default SavedDrawer;
