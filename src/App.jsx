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
import { trendingCourses } from './data/trendingCourses';

function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  // Saved courses state persisted in localStorage
  const [savedCourses, setSavedCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('learnify_saved_courses');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Modal visibility states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('learnify_saved_courses', JSON.stringify(savedCourses));
  }, [savedCourses]);

  // Global Ctrl+K listener for Search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Parse path on initial mount
  useEffect(() => {
    const path = window.location.pathname;
    const courseMatch = path.match(/^\/course\/(\d+)/);
    if (courseMatch) {
      const courseId = parseInt(courseMatch[1], 10);
      const course = trendingCourses.find((c) => c.id === courseId);
      if (course) {
        setSelectedCourse(course);
        const videoMatch = path.match(/\/video\/([a-zA-Z0-9]+)/);
        if (videoMatch) {
          const videoId = videoMatch[1];
          const video = course.curriculum?.find((v) => v.id === videoId);
          if (video) {
            setActiveVideo(video);
          }
        }
      }
    }
  }, []);

  // Sync state with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const courseMatch = path.match(/^\/course\/(\d+)/);
      if (courseMatch) {
        const courseId = parseInt(courseMatch[1], 10);
        const course = trendingCourses.find((c) => c.id === courseId);
        if (course) {
          setSelectedCourse(course);
          const videoMatch = path.match(/\/video\/([a-zA-Z0-9]+)/);
          if (videoMatch) {
            const videoId = videoMatch[1];
            const video = course.curriculum?.find((v) => v.id === videoId);
            if (video) {
              setActiveVideo(video);
              return;
            }
          }
          setActiveVideo(null);
          return;
        }
      }
      setSelectedCourse(null);
      setActiveVideo(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleToggleSave = (courseId) => {
    setSavedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setActiveVideo(null);
    window.history.pushState({ learnify: true }, '', `/course/${course.id}`);
    window.scrollTo(0, 0);
  };

  const handleStartLearning = (video) => {
    setActiveVideo(video);
    window.history.pushState({ learnify: true }, '', `/course/${selectedCourse.id}/video/${video.id}`);
    window.scrollTo(0, 0);
  };

  const handleVideoChange = (video) => {
    setActiveVideo(video);
    window.history.pushState({ learnify: true }, '', `/course/${selectedCourse.id}/video/${video.id}`);
  };

  const handleBackToHome = () => {
    if (window.history.state && window.history.state.learnify) {
      window.history.back();
    } else {
      setSelectedCourse(null);
      setActiveVideo(null);
      window.history.pushState({}, '', '/');
      window.scrollTo(0, 0);
    }
  };

  const handleBackToCourse = () => {
    if (window.history.state && window.history.state.learnify) {
      window.history.back();
    } else {
      setActiveVideo(null);
      window.history.pushState({ learnify: true }, '', `/course/${selectedCourse.id}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <Layout
      isSearchOpen={isSearchOpen}
      setIsSearchOpen={setIsSearchOpen}
      isSavedOpen={isSavedOpen}
      setIsSavedOpen={setIsSavedOpen}
      isSuccessOpen={isSuccessOpen}
      setIsSuccessOpen={setIsSuccessOpen}
      savedCourses={savedCourses}
      onToggleSave={handleToggleSave}
      onCourseClick={handleCourseClick}
    >
      {activeVideo ? (
        <VideoPage 
          course={selectedCourse} 
          activeVideo={activeVideo} 
          onVideoChange={handleVideoChange}
          onBack={handleBackToCourse} 
        />
      ) : selectedCourse ? (
        <CourseDetails 
          course={selectedCourse} 
          onBack={handleBackToHome} 
          onStartLearning={handleStartLearning}
          isSaved={savedCourses.includes(selectedCourse.id)}
          onToggleSave={() => handleToggleSave(selectedCourse.id)}
        />
      ) : (
        <>
          <Hero />
          <Logos />
          <TrendingCourses 
            onCourseClick={handleCourseClick} 
            savedCourses={savedCourses}
            onToggleSave={handleToggleSave}
          />
          <About />
          <ContactSection onSuccess={() => setIsSuccessOpen(true)} />
        </>
      )}
    </Layout>
  );
}

export default App;
