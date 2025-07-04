import { useMediaQuery } from 'react-responsive';
import Globe from 'react-globe.gl';
import { calculateSizes } from '../constants/index.js';

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <section
      className="pt-32 sm:pt-40 pb-20 w-full flex flex-col justify-center items-center bg-gradient-to-b from-black via-[#0d0d0d] to-[#1a1a1a] text-white relative px-4 sm:px-12"
      id="home"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-7xl gap-12 sm:gap-20">
        {/* Left Globe */}
        <div className="flex-shrink-0">
           <Globe
        width={360}
        height={360}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        showAtmosphere
        showGraticules
        backgroundColor="rgba(0,0,0,0)"
        labelsData={[
          { lat: 37.7749, lng: -122.4194, text: 'Coinbase HQ', color: '#f7931a', size: 2 },
          { lat: 25.2048, lng: 55.2708, text: 'Binance Dubai', color: '#f0b90b', size: 2 },
          { lat: 52.52, lng: 13.405, text: 'Berlin Node', color: '#ffffff', size: 1.5 },
        ]}
        labelSize={(d) => d.size}
        labelColor={(d) => d.color}
        labelText={(d) => d.text}
      />
        </div>

        {/* Right Text Section */}
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
            <button className="bg-lime-400 hover:bg-lime-500 text-black font-semibold py-2 px-6 rounded-md transition-all">
              Buy Challenge
            </button>
            <button className="border border-lime-400 text-lime-400 hover:bg-lime-500 hover:text-black font-semibold py-2 px-6 rounded-md transition-all">
              Join Competition
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
