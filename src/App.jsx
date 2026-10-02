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

  const [completedVideos, setCompletedVideos] = useState(() => {
    try {
      const saved = localStorage.getItem('learnify_completed_videos');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('learnify_completed_videos', JSON.stringify(completedVideos));
  }, [completedVideos]);

  const toggleVideoCompletion = (courseId, videoId) => {
    setCompletedVideos((prev) => {
      const courseVideos = prev[courseId] || [];
      const updated = courseVideos.includes(videoId)
        ? courseVideos.filter((id) => id !== videoId)
        : [...courseVideos, videoId];
      return { ...prev, [courseId]: updated };
    });
  };

  useEffect(() => {
    if (selectedCourse && activeVideo) {
      setCompletedVideos((prev) => {
        const courseVideos = prev[selectedCourse.id] || [];
        if (!courseVideos.includes(activeVideo.id)) {
          return { ...prev, [selectedCourse.id]: [...courseVideos, activeVideo.id] };
        }
        return prev;
      });
    }
  }, [selectedCourse, activeVideo]);

  const [completedQuizzes, setCompletedQuizzes] = useState(() => {
    try {
      const saved = localStorage.getItem('learnify_completed_quizzes');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('learnify_completed_quizzes', JSON.stringify(completedQuizzes));
  }, [completedQuizzes]);

  const [userName, setUserName] = useState(() => {
    try {
      return localStorage.getItem('learnify_username') || 'Sila SEM';
    } catch (e) {
      return 'Sila SEM';
    }
  });

  useEffect(() => {
    localStorage.setItem('learnify_username', userName);
  }, [userName]);

  const [lastWatched, setLastWatched] = useState(() => {
    try {
      const saved = localStorage.getItem('learnify_last_watched');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (selectedCourse && activeVideo) {
      const info = {
        courseId: selectedCourse.id,
        videoId: activeVideo.id,
        videoTitle: activeVideo.title
      };
      localStorage.setItem('learnify_last_watched', JSON.stringify(info));
      setLastWatched(info);
    }
  }, [selectedCourse, activeVideo]);

  const onResumeLearning = (courseId, videoId) => {
    const course = trendingCourses.find(c => c.id === Number(courseId));
    if (course) {
      const video = course.curriculum.find(v => v.id === videoId);
      if (video) {
        setSelectedCourse(course);
        setActiveVideo(video);
        window.history.pushState({ learnify: true }, '', `/course/${courseId}/video/${videoId}`);
        window.scrollTo(0, 0);
      }
    }
  };

  const handleQuizComplete = (courseId, score) => {
    setCompletedQuizzes(prev => ({
      ...prev,
      [courseId]: score
    }));
  };

  // Compute Gamified XP
  const completedVideosCount = Object.values(completedVideos).reduce((acc, curr) => acc + curr.length, 0);
  const completedQuizzesCount = Object.keys(completedQuizzes).length;
  const totalXP = (completedVideosCount * 250) + (completedQuizzesCount * 500);
  const userLevel = Math.floor(totalXP / 1000) + 1;
  const currentLevelXP = totalXP % 1000;

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
      xp={totalXP}
      level={userLevel}
      currentLevelXP={currentLevelXP}
      userName={userName}
      setUserName={setUserName}
      onLogoClick={handleBackToHome}
    >
      {activeVideo ? (
        <VideoPage 
          course={selectedCourse} 
          activeVideo={activeVideo} 
          onVideoChange={handleVideoChange}
          onBack={handleBackToCourse} 
          completedVideos={completedVideos}
          toggleVideoCompletion={toggleVideoCompletion}
          onQuizComplete={handleQuizComplete}
        />
      ) : selectedCourse ? (
        <CourseDetails 
          course={selectedCourse} 
          onBack={handleBackToHome} 
          onStartLearning={handleStartLearning}
          isSaved={savedCourses.includes(selectedCourse.id)}
          onToggleSave={() => handleToggleSave(selectedCourse.id)}
          completedVideos={completedVideos}
        />
      ) : (
        <>
          <Hero lastWatched={lastWatched} onResumeLearning={onResumeLearning} />
          <Logos />
          <TrendingCourses 
            onCourseClick={handleCourseClick} 
            savedCourses={savedCourses}
            onToggleSave={handleToggleSave}
            completedVideos={completedVideos}
          />
          <About />
          <ContactSection onSuccess={() => setIsSuccessOpen(true)} />
        </>
      )}
    </Layout>
  );
}

export default App;
