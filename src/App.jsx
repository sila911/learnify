import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Logos from './components/Logos';
import TrendingCourses from './components/TrendingCourses';
import FeaturedCourses from './components/FeaturedCourses';
import About from './components/About';
import ContactSection from './components/ContactSection';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Layout>
      <Hero />
      <Logos />
      <TrendingCourses />
      <FeaturedCourses />
      <About />
      <ContactSection />
    </Layout>
  );
}

export default App;
