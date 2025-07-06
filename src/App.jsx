import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './sections/Navbar.jsx';
import Home from './sections/Home.jsx';
import Termsofuse from './sections/Termofuse.jsx';
import Footer from './sections/Footer.jsx';
import Contact from './sections/Contact.jsx';
import Projects from './sections/Projects.jsx';
import AffiliateProgram from './sections/AffiliateProgram.jsx';
import ChallengeForm from './sections/kyc.jsx'; // Make sure the file is named correctly

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main page */}
        <Route
          path="/"
          element={
            <main className="max-w-7xl mx-auto relative">
              <Navbar />
              <Home />
              <Termsofuse />
              <AffiliateProgram />
              <Contact />
              <Projects />
              <Footer />
            </main>
          }
        />

        {/* KYC page */}
        <Route path="/kyc" element={<ChallengeForm />} />
      </Routes>
    </Router>
  );
};

export default App;