import React from 'react';

const CourseDetails = ({ course, onBack }) => {
  if (!course) return null;

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden">
        <img
          src={course.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000'}
          className="w-full h-full object-cover"
          alt={course.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 md:p-12">
          <div className="container mx-auto">
            <button 
              onClick={onBack}
              className="mb-6 flex items-center gap-2 text-white/80 hover:text-white transition group"
            >
              <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition"></i>
              Back to Courses
            </button>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {course.category}
              </span>
              <span className="text-white/80 text-sm flex items-center gap-1">
                <i className="fa-solid fa-star text-accent"></i>
                {course.rating} (1.2k reviews)
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              {course.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About This Course</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                {course.fullDescription || course.description}
              </p>
            </section>

            {course.learningPoints && (
              <section className="bg-secondary dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.learningPoints.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="fa-solid fa-check text-primary text-xs"></i>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Instructor</h2>
              <div className="flex items-center gap-6 p-6 border border-gray-100 dark:border-gray-700 rounded-2xl">
                <img
                  src={course.instructor?.avatar || 'https://i.pravatar.cc/150'}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
                  alt={course.instructor?.name || 'Instructor'}
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{course.instructor?.name || 'Expert Instructor'}</h3>
                  <p className="text-primary font-medium mb-2">{course.instructor?.role || 'Senior Software Engineer'}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {course.instructor?.bio || "Teaching over 50,000 students worldwide with a passion for web technologies and design."}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar / Checkout */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Free
                <span className="text-lg font-normal text-gray-400 line-through ml-3">$99.99</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500"><i className="fa-regular fa-clock mr-2"></i> Duration</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{course.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500"><i className="fa-solid fa-video mr-2"></i> Lessons</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{course.lessons}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500"><i className="fa-solid fa-certificate mr-2"></i> Certificate</span>
                  <span className="font-semibold text-gray-900 dark:text-white">Yes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500"><i className="fa-solid fa-infinity mr-2"></i> Access</span>
                  <span className="font-semibold text-gray-900 dark:text-white">Lifetime</span>
                </div>
              </div>

              <button className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-primary/25 mb-4">
                Enroll Now
              </button>
              
              <button className="w-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-4 rounded-xl font-bold transition hover:bg-gray-50 dark:hover:bg-gray-700">
                Add to Favorites
              </button>

              <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 text-center">
                <p className="text-sm text-gray-500 mb-4">Share this course</p>
                <div className="flex justify-center gap-4">
                  <button className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                    <i className="fa-brands fa-facebook-f"></i>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center hover:bg-sky-500 hover:text-white transition">
                    <i className="fa-brands fa-twitter"></i>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
