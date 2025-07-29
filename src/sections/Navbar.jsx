import { useState, useEffect } from 'react';
import { navLinks } from '../constants/index.js';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ref, set } from 'firebase/database';
import { auth, googleProvider, database } from '../lib/firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';

const NavItems = ({ onClick }) => {
  const handleClick = onClick || (() => { });
  return (
    <ul className="flex flex-col sm:flex-row gap-4">
      {navLinks.map((item, index) => (
        <li key={`${item.id}-${index}`}>
          <a
            href={item.href}
            className="text-white hover:text-green-400 transition-transform transform hover:scale-105"
            onClick={handleClick}
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

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

  const [popup, setPopup] = useState({ visible: false, message: '', type: 'info' });

  const showPopup = (message, type = 'info') => {
    setPopup({ visible: true, message, type });
  };

  const closePopup = () => {
    setPopup({ ...popup, visible: false });
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const closeModal = () => {
    setVisible(false);
    setResetMode(false);
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleSignUp = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      await set(ref(database, 'users/' + userCredential.user.uid), {
        uid: userCredential.user.uid,
        name,
        email,
        provider: 'email',
      });

      showPopup('Signup successful!', 'success');
      closeModal();
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        showPopup('This email is already registered. Please log in instead.', 'error');
      } else if (error.code === 'auth/invalid-email') {
        showPopup('Invalid email address', 'error');
      } else if (error.code === 'auth/weak-password') {
        showPopup('Password should be at least 6 characters', 'error');
      } else {
        showPopup('Signup failed', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      showPopup('Login successful!', 'success');
      closeModal();
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        showPopup('No account found. Please register first.', 'error');
      } else if (error.code === 'auth/wrong-password') {
        showPopup('Incorrect password', 'error');
      } else if (error.code === 'auth/invalid-email') {
        showPopup('Invalid email', 'error');
      } else {
        showPopup('Login failed. Try again.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await set(ref(database, 'users/' + user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        provider: 'google',
        photoURL: user.photoURL,
      });

      showPopup('Signed in with Google!', 'success');
      closeModal();
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/cancelled-popup-request') {
        showPopup('Multiple sign-in popups requested. Please try again.', 'error');
      } else if (error.code === 'auth/popup-closed-by-user') {
        showPopup('Popup was closed before sign-in completed.', 'error');
      } else {
        showPopup('Google sign-in failed.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    showPopup('Logged out successfully.', 'success');
  };

  const handlePasswordReset = async () => {
    if (!email) return showPopup('Please enter your email for reset link.', 'error');
    try {
      await sendPasswordResetEmail(auth, email);
      showPopup('Password reset link sent to your email.', 'success');
    } catch (error) {
      showPopup('Failed to send reset link.', 'error');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 shadow-lg">
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
                    closeMenu();
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
                    closeMenu();
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
              <div className="w-full max-w-md bg-[#111827]/90 text-white backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700">
                <div className="text-center mb-6">
                  <h1 className="text-3xl font-bold mb-2">✨ <span className="text-green-400">CTF</span></h1>
                  <p className="text-sm text-gray-300">
                    {resetMode ? 'Reset your password' : isSignup ? 'Create your account' : 'Login to your account'}
                  </p>
                </div>

                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className={`w-full mb-4 py-2 rounded font-medium flex justify-center items-center gap-2 transition-transform duration-300 ${loading ? 'bg-white opacity-50 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200'
                    }`}
                >
                  {loading ? (
                    <>
                      <span className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <FaGoogle /> Sign in with Google
                    </>
                  )}
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
                      className="w-full py-3 bg-gradient-to-r from-purple-400 to-blue-500 text-black font-semibold rounded-md mb-3"
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
                      onClick={isSignup ? handleSignUp : handleLogin}
                      disabled={loading}
                      className={`w-full py-3 ${loading
                        ? 'bg-green-500/50 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600'
                        } text-black font-semibold rounded-md`}
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
                  onClick={closeModal}
                  className="block text-sm text-gray-400 mt-5 text-center hover:text-white hover:scale-105 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {popup.visible && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="w-full max-w-xl min-h-[360px] bg-[#111827]/90 text-white backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-gray-700 text-center relative">
            <button
              onClick={closePopup}
              className="absolute top-5 right-5 text-gray-400 hover:text-white text-3xl font-bold"
            >
              &times;
            </button>
            <div className="flex justify-center mb-6 mt-4">
              {popup.type === 'success' && (
                <img src="/assets/check.png" alt="Success" className="w-16 h-16" />
              )}
              {popup.type === 'error' && (
                <img src="/assets/error.png" alt="Error" className="w-16 h-16" />
              )}
              {popup.type === 'info' && (
                <img src="/assets/info-icon.png" alt="Info" className="w-16 h-16" />
              )}
            </div>
            <h2 className={`text-3xl font-bold mb-3 `}>
              {popup.type === 'success' ? 'Success!' :
                popup.type === 'error' ? 'Error' : 'Info'}
            </h2>
            <p className={`text-base mb-6 px-6 `}>
              {popup.message}
            </p>

            <button
              onClick={closePopup}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-all duration-300"
            >
              OK
            </button>
          </div>
        </div>
      )}

    </header>
  );
};

export default Navbar;
