import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Philosophy from './sections/Philosophy';
import Team from './sections/Team';
import Approach from './sections/Approach';
import Conditions from './sections/Conditions';
import Technology from './sections/Technology';
import Location from './sections/Location';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize scroll animations
    ScrollTrigger.refresh();
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F6FAFD] overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Philosophy />
        <Team />
        <Approach />
        <Conditions />
        <Technology />
        <Location />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
