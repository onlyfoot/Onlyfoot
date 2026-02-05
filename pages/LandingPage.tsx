import React, { useState, useEffect } from 'react';
import { AgeGate, NavbarLanding, Hero, Gallery, Features, Footer } from '../components/Page';

const LandingPage = () => {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const isVerified = localStorage.getItem('age-verified');
    if (isVerified === 'true') {
      setVerified(true);
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem('age-verified', 'true');
    setVerified(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-brand-50 font-sans selection:bg-brand-900 selection:text-white">
      {!verified && <AgeGate onVerify={handleVerify} />}
      
      <div className={!verified ? 'blur-sm h-screen overflow-hidden' : ''}>
        <NavbarLanding />
        <main>
          <Hero />
          <Features />
          <Gallery />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
