import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Logos from './components/Logos';
import TrendingCourses from './components/TrendingCourses';
import FeaturedCourses from './components/FeaturedCourses';
import About from './components/About';
import ContactSection from './components/ContactSection';
import CourseDetails from './components/CourseDetails';

function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      {selectedCourse ? (
        <CourseDetails 
          course={selectedCourse} 
          onBack={() => setSelectedCourse(null)} 
        />
      ) : (
        <>
          <Hero />
          <Logos />
          <TrendingCourses onCourseClick={handleCourseClick} />
          <FeaturedCourses onCourseClick={handleCourseClick} />
          <About />
          <ContactSection />
        </>
      )}
    </Layout>
  );
}

export default App;
