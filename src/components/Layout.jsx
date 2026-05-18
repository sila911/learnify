import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SearchModal from './SearchModal';
import SavedDrawer from './SavedDrawer';
import SuccessModal from './SuccessModal';

const Layout = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  return (
    <div className="min-h-screen bg-secondary dark:bg-gray-900 text-gray-700 dark:text-white transition-colors duration-300">
      <Navbar
        onSearchClick={() => setIsSearchOpen(true)}
        onSavedClick={() => setIsSavedOpen(true)}
      />

      <main className="mt-16">
        {children}
      </main>

      <Footer />

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <SavedDrawer isOpen={isSavedOpen} onClose={() => setIsSavedOpen(false)} />
      <SuccessModal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />
    </div>
  );
};

export default Layout;
