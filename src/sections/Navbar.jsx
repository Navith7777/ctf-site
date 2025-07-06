import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { navLinks } from '../constants/index.js';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const NavItems = ({ onClick = () => {} }) => (
  <ul className="flex flex-col sm:flex-row gap-4">
    {navLinks.map((item, index) => (
      <li key={`${item.id}-${index}`}>
        <a
          href={item.href}
          className="text-white hover:text-green-400 transition-transform transform hover:scale-105"
          onClick={onClick}
        >
          {item.name}
        </a>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleSignup = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Signup successful! Please verify your email.');
      setIsSignup(false);
      setEmail('');
      setPassword('');
      setName('');
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Login successful!');
      setVisible(false);
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
  };

  const handleGoogleSignIn = async () => {
    const redirectTo = `${location.origin}/auth/callback`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
    if (error) toast.error(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    toast.success('Logged out successfully.');
  };

  const handlePasswordReset = async () => {
  if (!email) return toast.error('Please enter your email for reset link.');

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:5173/reset-password',
  });

  if (error) {
    toast.error(error.message);
  } else {
    toast.success('Password reset link sent. Check your email.');
  }
};


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 shadow-lg">
      <Toaster />
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center py-5">
          <a href="/" className="flex items-center gap-2">
            <img src="/assets/Logo.png" alt="CTF Logo" className="h-14 w-auto sm:h-16" />
          </a>

          <nav className="hidden sm:flex">
            <NavItems />
          </nav>

          <div className="hidden sm:flex gap-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setVisible(true);
                    setIsSignup(true);
                    setResetMode(false);
                  }}
                  className="px-4 py-2 rounded-md border border-white text-white hover:bg-white hover:text-black transition"
                >
                  Sign up
                </button>
                <button
                  onClick={() => {
                    setVisible(true);
                    setIsSignup(false);
                    setResetMode(false);
                  }}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Login
                </button>
              </>
            )}
          </div>

          <div className="sm:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white text-2xl">
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="sm:hidden bg-black/95 text-white overflow-hidden px-5 pb-5"
          >
            <NavItems onClick={closeMenu} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/80"
              style={{
                backgroundImage: `url('/assets/trading.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md bg-white/10 text-white backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">
                <div className="text-center mb-6">
                  <h1 className="text-3xl font-bold mb-2">✨ <span className="text-green-400">CTF</span></h1>
                  <p className="text-sm text-gray-300">
                    {resetMode ? 'Reset your password' : isSignup ? 'Create your account' : 'Login to your account'}
                  </p>
                </div>

                <button
                  onClick={handleGoogleSignIn}
                  className="w-full mb-4 py-2 rounded bg-white text-black font-medium hover:bg-gray-200 flex justify-center items-center gap-2 transition-transform duration-300"
                >
                  <FaGoogle /> Sign in with Google
                </button>

                <div className="text-center mb-2 text-gray-400 text-sm">OR</div>

                {resetMode ? (
                  <>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full p-3 mb-4 rounded bg-[#1c1c1c] border border-gray-600 text-white placeholder-gray-400"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      onClick={handlePasswordReset}
                      className="w-full py-3 bg-gradient-to-r from-purple-400 to-blue-500 text-black font-semibold rounded-md transition-transform duration-300 mb-3"
                    >
                      Send Reset Link
                    </button>
                    <button
                      onClick={() => setResetMode(false)}
                      className="text-sm text-gray-400 hover:text-white hover:underline"
                    >
                      Back to Login
                    </button>
                  </>
                ) : (
                  <>
                    {isSignup && (
                      <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-3 mb-3 rounded bg-[#1c1c1c] border border-gray-600 text-white placeholder-gray-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    )}
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full p-3 mb-3 rounded bg-[#1c1c1c] border border-gray-600 text-white placeholder-gray-400"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full p-3 mb-4 rounded bg-[#1c1c1c] border border-gray-600 text-white placeholder-gray-400"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                      onClick={isSignup ? handleSignup : handleLogin}
                      disabled={loading}
                      className={`w-full py-3 ${
                        loading ? 'bg-green-500/50 cursor-not-allowed' : 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600'
                      } text-black font-semibold rounded-md transition-transform duration-300`}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                          Processing...
                        </div>
                      ) : isSignup ? 'Sign Up' : 'Log In'}
                    </button>

                    {!isSignup && (
                      <button
                        onClick={() => setResetMode(true)}
                        className="text-sm text-blue-400 mt-3 hover:underline"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </>
                )}

                <div className="text-center mt-4 text-sm">
                  <span
                    onClick={() => {
                      setIsSignup(!isSignup);
                      setResetMode(false);
                    }}
                    className="text-green-400 cursor-pointer hover:underline"
                  >
                    {isSignup ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setVisible(false);
                    setResetMode(false);
                    setEmail('');
                    setPassword('');
                    setName('');
                  }}
                  className="block text-sm text-gray-400 mt-5 text-center hover:text-white hover:scale-105 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
