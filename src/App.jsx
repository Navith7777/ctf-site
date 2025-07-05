import Navbar from './sections/Navbar.jsx';
import Home from './sections/Home.jsx';
import Termsofuse from './sections/Termofuse.jsx';
import Footer from './sections/Footer.jsx';
import Contact from './sections/Contact.jsx';
import Projects from './sections/Projects.jsx';
import AffiliateProgram from './sections/AffiliateProgram.jsx';

const App = () => {
  return (
    <main className="max-w-7xl mx-auto relative">
      <Navbar />
      <Home />
      <Termsofuse />
      <AffiliateProgram />
      <Contact />
      <Projects />
      <Footer />
    </main>
  );
};

export default App;
