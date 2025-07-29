import { useMediaQuery } from 'react-responsive';
import Globe from 'react-globe.gl';
import { calculateSizes } from '../constants/index.js';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase.js';

const Hero = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleBuyChallenge = () => {
    if (currentUser) {
      navigate('/kyc');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleLoginNavigate = () => {
    setShowLoginModal(false);
    navigate('/');
  };

  return (
    <section
      className="pt-32 sm:pt-40 pb-20 w-full flex flex-col justify-center items-center bg-gradient-to-b from-black via-[#0d0d0d] to-[#1a1a1a] text-white relative px-4 sm:px-12"
      id="home"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-7xl gap-12 sm:gap-20">
        <div className="flex-shrink-0">
          <Globe
            height={320}
            width={320}
            backgroundColor="rgba(0, 0, 0, 0)"
            backgroundImageOpacity={0.5}
            showAtmosphere
            showGraticules
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            labelsData={[
              { lat: 40, lng: -100, text: '', color: 'white', size: 15 },
            ]}
          />
        </div>

        <div className="text-center sm:text-left max-w-2xl">
          <p className="text-md sm:text-lg text-gray-300 font-medium mb-2">
            <span className="text-white font-semibold">🚀 Hiring On The </span>
            <span className="text-green-400 font-semibold">Go</span>
          </p>

          <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
            Hiring Of <br />
            <span className="text-green-400">Continue Profitable</span> <br />
            <span className="text-white">Traders!</span>
          </h1>

          <p className="mt-4 text-md sm:text-lg text-gray-400">
            1,000,000 traders in the world’s leading firm.
          </p>
          <p className="mt-2 text-md sm:text-lg text-gray-400">
            Trade in a fully simulated environment and earn up to 100% rewards.
          </p>

          <div className="flex flex-wrap sm:justify-start justify-center gap-4 mt-8">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              onClick={handleBuyChallenge}
            >
              Buy Challenge
            </button>

            <button className="border border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white font-semibold py-2 px-6 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
              Join Competition
            </button>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6">
          <div className="w-full max-w-lg min-h-[380px] bg-[#111827]/90 text-white backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-gray-700 text-center relative">

            <img
              src="/assets/user.png"
              alt="Login Required"
              className="w-16 h-16 mx-auto mb-6"
            />

            <h2 className="text-2xl font-semibold mb-3">Please Login</h2>

            <p className="text-base mb-8 text-gray-300">You need to login to continue.</p>

            <div className="flex justify-center">
              <button
                onClick={handleCloseModal}
                className="px-6 py-2 border border-gray-400 rounded-md bg-white text-black hover:bg-gray-100 transition"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Hero;
