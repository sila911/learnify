import React from 'react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-secondary to-white dark:from-gray-900 dark:to-gray-800 pt-20 pb-24 lg:pt-32 lg:pb-40 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6 text-center relative z-10">
        <div
          data-aos="fade-down"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary dark:text-purple-300 text-sm font-semibold mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          New AI-Powered Learning Paths Available
        </div>

        <h1
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 leading-tight"
        >
          Upgrade your skills,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
            Advance your career.
          </span>
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Learn from industry experts, master new skills, and achieve your goals at your own pace. Join 10,000+ learners today.
        </p>

        <div className="flex flex-row justify-center items-center gap-4">
          <a
            href="#courses"
            className="w-auto px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary/90 transform hover:-translate-y-1 transition duration-300 shadow-lg hover:shadow-primary/30"
          >
            Explore Courses
          </a>
          <a
            href="#pricing"
            className="w-auto px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-lg hover:bg-secondary dark:hover:bg-gray-700 hover:text-primary transform hover:-translate-y-1 transition duration-300"
          >
            View Pricing
          </a>
        </div>
      </div>

      <div className="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 rounded-full bg-primary/30 mix-blend-multiply filter blur-3xl opacity-30 animate-blob dark:opacity-10"></div>
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-purple-200 mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 dark:opacity-10"></div>
    </section>
  );
};

export default Hero;
