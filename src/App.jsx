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
import VideoPage from './components/VideoPage';

function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setActiveVideo(null);
    window.scrollTo(0, 0);
  };

  const handleStartLearning = (video) => {
    setActiveVideo(video);
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      {activeVideo ? (
        <VideoPage 
          course={selectedCourse} 
          initialVideo={activeVideo} 
          onBack={() => setActiveVideo(null)} 
        />
      ) : selectedCourse ? (
        <CourseDetails 
          course={selectedCourse} 
          onBack={() => setSelectedCourse(null)} 
          onStartLearning={handleStartLearning}
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
