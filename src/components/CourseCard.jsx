import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <a
      href={course.link}
      data-aos="fade-up"
      data-aos-duration="1000"
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={course.image}
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
          alt={course.title}
        />
        {course.tag && (
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 px-2 py-1 rounded-md text-xs font-bold text-gray-900 dark:text-white shadow-sm">
            {course.tag}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded">
            {course.category}
          </span>
          <div className="flex text-accent text-xs">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`fa-solid fa-star${i + 0.5 === course.rating ? '-half-stroke' : i >= course.rating ? '-regular' : ''}`}></i>
            ))}
          </div>
          <span className="text-gray-400 text-xs">({course.rating})</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition">
          {course.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span><i className="fa-regular fa-clock mr-1"></i> {course.duration}</span>
          <span><i className="fa-solid fa-video mr-1"></i> {course.lessons} Lessons</span>
        </div>
      </div>
    </a>
  );
};

export default CourseCard;
