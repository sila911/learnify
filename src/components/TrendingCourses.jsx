import React from 'react';
import CourseCard from './CourseCard';
import { trendingCourses } from '../data/trendingCourses';

const TrendingCourses = ({ onCourseClick, savedCourses, onToggleSave, completedVideos }) => {
  return (
    <section id="courses" className="py-20 bg-secondary dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      <div
        className="absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#8487bf 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Trending Now
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our highest-rated courses, handpicked for you based on current industry trends.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onClick={() => onCourseClick(course)}
              isSaved={(savedCourses || []).includes(course.id)}
              onToggleSave={(e) => {
                e.stopPropagation();
                onToggleSave(course.id);
              }}
              completedVideos={completedVideos}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingCourses;
