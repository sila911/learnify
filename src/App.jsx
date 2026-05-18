import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Logos from './components/Logos';
import TrendingCourses from './components/TrendingCourses';
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
    window.history.pushState({}, '', `/course/${course.id}`);
    window.scrollTo(0, 0);
  };

  const handleStartLearning = (video) => {
    setActiveVideo(video);
    window.history.pushState({}, '', `/course/${selectedCourse.id}/video/${video.id}`);
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setSelectedCourse(null);
    setActiveVideo(null);
    window.history.pushState({}, '', '/');
    window.scrollTo(0, 0);
  };

  const handleBackToCourse = () => {
    setActiveVideo(null);
    window.history.pushState({}, '', `/course/${selectedCourse.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      {activeVideo ? (
        <VideoPage 
          course={selectedCourse} 
          initialVideo={activeVideo} 
          onBack={handleBackToCourse} 
        />
      ) : selectedCourse ? (
        <CourseDetails 
          course={selectedCourse} 
          onBack={handleBackToHome} 
          onStartLearning={handleStartLearning}
        />
      ) : (
        <>
          <Hero />
          <Logos />
          <TrendingCourses onCourseClick={handleCourseClick} />
          <About />
          <ContactSection />
        </>
      )}
    </Layout>
  );
}

export default App;
