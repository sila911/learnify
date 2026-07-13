import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SearchModal from './SearchModal';
import SavedDrawer from './SavedDrawer';
import SuccessModal from './SuccessModal';
import { trendingCourses } from '../data/trendingCourses';

const Layout = ({
  children,
  isSearchOpen,
  setIsSearchOpen,
  isSavedOpen,
  setIsSavedOpen,
  isSuccessOpen,
  setIsSuccessOpen,
  savedCourses,
  onToggleSave,
  onCourseClick
}) => {
  return (
    <div className="min-h-screen bg-secondary dark:bg-gray-900 text-gray-700 dark:text-white transition-colors duration-300">
      <Navbar
        onSearchClick={() => setIsSearchOpen(true)}
        onSavedClick={() => setIsSavedOpen(true)}
        savedCount={savedCourses.length}
      />

      <main className="mt-16">
        {children}
      </main>

      <Footer />

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        trendingCourses={trendingCourses}
        onCourseClick={onCourseClick}
      />
      
      <SavedDrawer 
        isOpen={isSavedOpen} 
        onClose={() => setIsSavedOpen(false)} 
        savedCourses={savedCourses}
        trendingCourses={trendingCourses}
        onToggleSave={onToggleSave}
        onCourseClick={onCourseClick}
      />

      <SuccessModal 
        isOpen={isSuccessOpen} 
        onClose={() => setIsSuccessOpen(false)} 
      />
    </div>
  );
};

export default Layout;
