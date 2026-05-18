import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-secondary to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden transition-colors duration-300">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(#8487bf 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Built for Learners, By Learners
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Our mission is to make professional-level education accessible to anyone, anywhere.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div
              data-aos="fade-right"
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-primary mb-4">My Story</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                I founded this platform in 2025 with a simple idea: bridge the gap between expensive degrees and affordable skills. I realized that too many talented people were being left behind by traditional education.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm Sila, a lifelong learner passionate about technology and teaching. I built Learnify to provide the clear, structured guidance I wish I had when I started my own coding journey.
              </p>
            </div>

            <div className="space-y-8" data-aos="fade-left">
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">My Vision</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To build a vibrant, inclusive global community where knowledge flows freely. We envision a future where your potential is defined by your curiosity and dedication, not by your financial status or background.
                </p>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Core Values</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-primary mr-3 mt-1"></i>
                    <span><strong>Accessibility for all:</strong> Education should be a right, not a privilege.</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-primary mr-3 mt-1"></i>
                    <span><strong>Practical, real-world skills:</strong> We focus on tools you can use on the job immediately.</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fa-solid fa-check text-primary mr-3 mt-1"></i>
                    <span><strong>Constant innovation:</strong> Technology changes fast, and our curriculum evolves with it.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
