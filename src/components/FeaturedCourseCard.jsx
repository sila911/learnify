import React from 'react';

const FeaturedCourseCard = ({ course }) => {
  const colorClasses = {
    blue: "text-blue-700 bg-blue-100",
    yellow: "text-yellow-700 bg-yellow-100",
    indigo: "text-indigo-700 bg-indigo-100",
    purple: "text-purple-700 bg-purple-100"
  };

  return (
    <div
      data-aos="fade-left"
      className="flex flex-col p-6 bg-secondary dark:bg-gray-700 rounded-2xl border border-gray-100 dark:border-gray-600 hover:border-primary/40 transition duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colorClasses[course.categoryStyle] || colorClasses.blue}`}>
          {course.category}
        </span>
        <span className="text-gray-500 dark:text-gray-300 text-sm">{course.lessons} Video Lessons</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-primary cursor-pointer">
        {course.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow">
        {course.description}
      </p>
      <div className="flex items-center mt-4">
        <img
          className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
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
    </div>
  );
};

export default FeaturedCourseCard;
