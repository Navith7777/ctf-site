import { useState } from 'react';

import { navLinks } from '../constants/index.js';

const NavItems = ({ onClick = () => {} }) => (
  <ul className="nav-ul">
    {navLinks.map((item) => (
      <li key={item.id} className="nav-li">
        <a href={item.href} className="nav-li_a" onClick={onClick}>
          {item.name}
        </a>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
   <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
  <div className="max-w-7xl mx-auto">
    <div className="flex justify-between items-center py-5 mx-auto c-space">
<a href="/" className="flex items-center space-x-2">
  <img
    src="/assets/Logo.png"
    alt="CTF Logo"
    className="h-14 w-auto sm:h-16" // Increased size
  />
</a>




      <nav className="sm:flex hidden">
        <NavItems />
      </nav>

      <div className="sm:flex hidden gap-3">
        <a
          href="#signup"
          className="px-4 py-2 rounded-md border border-white text-white hover:bg-white hover:text-black transition"
        >
          Sign up
        </a>
        <a
          href="#dashboard"
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Login
        </a>
      </div>
    </div>
  </div>

  {/* Mobile Nav (optional enhancement) */}
  <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
    <nav className="p-5">
      <NavItems onClick={closeMenu} />
    </nav>
  </div>
</header>

  );
};

export default Navbar;
