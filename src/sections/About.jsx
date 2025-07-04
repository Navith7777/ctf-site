import { useState } from 'react';
import Button from '../components/Button.jsx';
import { FaHandPaper, FaThumbsUp, FaTrophy, FaDollarSign } from 'react-icons/fa';
const WhyFunding = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('');
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <section className="bg-black  text-white py-20 px-4 sm:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">Why competition Trader Funding?</h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-[#010030] border border-blue-900 rounded-xl p-6 text-left hover:shadow-lg transition">
           <FaHandPaper className="text-blue-500 text-3xl mb-4" />
            <p className="text-blue-400 font-semibold">Zero Reward Denials.</p>
            <p className="font-bold">Trade with a peace of mind.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#010030] border border-blue-900 rounded-xl p-6 text-left hover:shadow-lg transition">
           <FaThumbsUp className="text-blue-500 text-3xl mb-4" />
            <p className="text-blue-400 font-semibold">Your Favorite Platforms.</p>
            <p className="font-bold">MetaTrader 5, Match-Trader and cTrader.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#010030] border border-blue-900 rounded-xl p-6 text-left hover:shadow-lg transition">
          <FaTrophy className="text-blue-500 text-3xl mb-4" />
            <p className="text-blue-400 font-semibold">Flexible Reward Cycles.</p>
            <p className="font-bold">The choice is yours: weekly, bi-weekly or monthly.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#010030] border border-blue-900 rounded-xl p-6 text-left hover:shadow-lg transition">
          <FaDollarSign className="text-blue-500 text-3xl mb-4" />
            <p className="text-blue-400 font-semibold">We Grow Together.</p>
            <p className="font-bold">Trade up to $300,000 in simulated capital.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyFunding;
