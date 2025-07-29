import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './sections/Navbar.jsx';
import Home from './sections/Home.jsx';
import Termsofuse from './sections/Termofuse.jsx';
import Footer from './sections/Footer.jsx';
import Contact from './sections/Contact.jsx';
import Projects from './sections/Projects.jsx';
import AffiliateProgram from './sections/AffiliateProgram.jsx';
import ResetPassword from './sections/ResetPassword.jsx';
import ChallengeForm from './sections/Kyc.jsx';
import History from './sections/History.jsx';
import CtfSection from './sections/CtfSection.jsx'
const App = () => {
  const location = useLocation();

  const hideHeaderFooterRoutes = ['/kyc', '/history'];
  const hideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <main className="max-w-7xl mx-auto relative">
              <Home />
              <Termsofuse />
              <AffiliateProgram />
              <Projects />
              {/* <Contact /> */}
              <CtfSection/>
              <Footer />
            </main>
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/kyc" element={<ChallengeForm />} />
        <Route path="/history" element={<History />} />
      </Routes>

      {!hideHeaderFooter && location.pathname !== '/' && <Footer />}
    </>
  );
};

export default App;
