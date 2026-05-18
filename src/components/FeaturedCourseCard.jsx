import React from 'react';

const FeaturedCourseCard = ({ course, onClick }) => {
  const colorClasses = {
    blue: "text-blue-700 bg-blue-100",
    yellow: "text-yellow-700 bg-yellow-100",
    indigo: "text-indigo-700 bg-indigo-100",
    purple: "text-purple-700 bg-purple-100"
  };

  return (
    <div
      data-aos="fade-left"
      className="group flex flex-col p-6 bg-secondary dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-primary/40 hover:shadow-xl transition-all duration-300 relative"
    >
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colorClasses[course.categoryStyle] || colorClasses.blue}`}>
          {course.category}
        </span>
        <button 
          className="text-gray-400 hover:text-primary transition"
          onClick={(e) => e.stopPropagation()}
        >
          <i className="fa-regular fa-bookmark"></i>
        </button>
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        <div className="flex text-accent text-xs">
          {[...Array(5)].map((_, i) => (
            <i key={i} className={`fa-solid fa-star${i + 0.5 === course.rating ? '-half-stroke' : i >= course.rating ? '-regular' : ''}`}></i>
          ))}
        </div>
        <span className="text-gray-400 text-xs">({course.rating})</span>
      </div>

      <h3 
        className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition cursor-pointer"
        onClick={onClick}
      >
        {course.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow line-clamp-2">
        {course.description}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-6">
        <span><i className="fa-regular fa-clock mr-1"></i> {course.duration}</span>
        <span><i className="fa-solid fa-video mr-1"></i> {course.lessons} Lessons</span>
      </div>
      
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
            src={course.instructor.avatar}
            alt={course.instructor.name}
          />
          <div className="ml-3">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {course.instructor.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {course.instructor.role}
            </p>
          </div>
        </div>
        <button
          onClick={onClick}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-hover transition shadow-sm"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default FeaturedCourseCard;
