import React from 'react';
import FeaturedCourseCard from './FeaturedCourseCard';
import { featuredCourses } from '../data/featuredCourses';

const FeaturedCourses = ({ onCourseClick }) => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <h2 data-aos="fade-down" className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
          Expert-Led Featured Courses
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <FeaturedCourseCard 
              key={course.id} 
              course={course} 
              onClick={() => onCourseClick(course)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
