import { Routes, Route } from 'react-router-dom';

import Navbar from './sections/Navbar.jsx';
import Home from './sections/Home.jsx';
import Termsofuse from './sections/Termofuse.jsx';
import Footer from './sections/Footer.jsx';
import Contact from './sections/Contact.jsx';
import Projects from './sections/Projects.jsx';
import AffiliateProgram from './sections/AffiliateProgram.jsx';
import ResetPassword from './sections/ResetPassword.jsx';
import ChallengeForm from './sections/Kyc.jsx';

const App = () => {
  return (
    <>
      <Navbar />
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
              <Footer />
            </main>
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/kyc" element={<ChallengeForm />} />

      </Routes>
    </>

  );
};

export default App;
