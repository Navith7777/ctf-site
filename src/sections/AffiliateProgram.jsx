import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import comingSoonImage from '/assets/commingsoon.jpeg';

const challengeData = {
  'CTF 1': {
    rules: [
      {
        name: 'Always use a stop-loss',
        role: 'Rule 1',
        desc: 'Using a stop-loss ensures that you limit your potential losses during volatile market conditions...',
      },
      {
        name: 'Risk only what you can afford',
        role: 'Rule 2',
        desc: 'Only invest money that you are willing and financially able to lose...',
      },
      {
        name: 'Never chase losses we can afford',
        role: 'Rule 3',
        desc: 'After a loss, it’s tempting to try and win back what you lost immediately...',
      },
      {
        name: 'Use proper position sizing',
        role: 'Rule 4',
        desc: 'Calculating your position size helps manage risk more effectively...',
      },
      {
        name: 'Keep emotions out of trading',
        role: 'Rule 5',
        desc: 'Emotions like fear, greed, and FOMO can ruin a solid trading plan...',
      },
    ],
    '$250,000': {
      evaluationStage: ['Monthly 100%'],
      masterStage: ['Bi-weekly 80%', 'Tuesday 60%'],
      metrics: {
        Student: {
          profitTarget: '$8,000 (8%)',
          maxLoss: '10%',
          dailyLoss: '5%',
          minDays: '3 days',
          leverage: '1:100',
        },
        Practitioner: {
          profitTarget: '$5,000 (5%)',
          maxLoss: '10%',
          dailyLoss: '5%',
          minDays: '3 days',
          leverage: '1:100',
        },
        Master: {
          profitTarget: '-',
          maxLoss: '10%',
          dailyLoss: '5%',
          minDays: '-',
          leverage: '1:100',
        },
      },
      accountSize: '100k',
      price: '$80',
    },
    '$500,000': {
      evaluationStage: ['Monthly 100%'],
      masterStage: ['Bi-weekly 80%', 'Tuesday 60%'],
      metrics: {
        Student: {
          profitTarget: '$8,000 (8%)',
          maxLoss: '10%',
          dailyLoss: '5%',
          minDays: '3 days',
          leverage: '1:100',
        },
        Practitioner: {
          profitTarget: '$5,000 (5%)',
          maxLoss: '10%',
          dailyLoss: '5%',
          minDays: '3 days',
          leverage: '1:100',
        },
        Master: {
          profitTarget: '-',
          maxLoss: '10%',
          dailyLoss: '5%',
          minDays: '-',
          leverage: '1:100',
        },
      },
      accountSize: '100k',
      price: '$130',
    },
    '$750,000': {
      evaluationStage: ['Monthly 100%'],
      masterStage: ['Bi-weekly 80%', 'Tuesday 60%'],
      metrics: {
        Student: {
          profitTarget: '$8,000 (8%)',
          maxLoss: '10%',
          dailyLoss: '5%',
          minDays: '3 days',
          leverage: '1:100',
        },
        Practitioner: {
          profitTarget: '$5,000 (5%)',
          maxLoss: '10%',
          dailyLoss: '5%',
          minDays: '3 days',
          leverage: '1:100',
        },
        Master: {
          profitTarget: '-',
          maxLoss: '10%',
          dailyLoss: '5%',
          minDays: '-',
          leverage: '1:100',
        },
      },
      accountSize: '100k',
      price: '$180',
    },
  },
  'CTF 2': {
    rules: [
      {
        name: '-',
        role: '-',
        desc: '-',
      },
    ],
    '$250,000': {
      evaluationStage: ['-'],
      masterStage: ['-'],
      metrics: {
        Student: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
        Practitioner: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
        Master: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
      },
      accountSize: '-',
      price: '-',
    },
    '$500,000': {
      evaluationStage: ['-'],
      masterStage: ['-'],
      metrics: {
        Student: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
        Practitioner: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
        Master: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
      },
      accountSize: '-',
      price: '-',
    },
    '$750,000': {
      evaluationStage: ['-'],
      masterStage: ['-'],
      metrics: {
        Student: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
        Practitioner: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
        Master: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
      },
      accountSize: '-',
      price: '-',
    },
  },
  'CTF 3': {
    rules: [
      {
        name: '-',
        role: '-',
        desc: '-',
      },
    ],
    '$250,000': {
      evaluationStage: ['-'],
      masterStage: ['-'],
      metrics: {
        Student: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
        Practitioner: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
        Master: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
      },
      accountSize: '-',
      price: '-',
    },
    '$500,000': {
      evaluationStage: ['-'],
      masterStage: ['-'],
      metrics: {
        Student: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
        Practitioner: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
        Master: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
      },
      accountSize: '-',
      price: '-',
    },
    '$750,000': {
      evaluationStage: ['-'],
      masterStage: ['-'],
      metrics: {
        Student: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
        Practitioner: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
        Master: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
      },
      accountSize: '-',
      price: '-',
    },
  },
  'CTF 4': {
    rules: [
      {
        name: '-',
        role: '-',
        desc: '-',
      },
    ],
    '$250,000': {
      evaluationStage: ['-'],
      masterStage: ['-'],
      metrics: {
        Student: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
        Practitioner: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
        Master: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
      },
      accountSize: '-',
      price: '-',
    },
    '$500,000': {
      evaluationStage: ['-'],
      masterStage: ['-'],
      metrics: {
        Student: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
        Practitioner: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
        Master: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
      },
      accountSize: '-',
      price: '-',
    },
    '$750,000': {
      evaluationStage: ['-'],
      masterStage: ['-'],
      metrics: {
        Student: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
        Practitioner: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
        Master: {
          profitTarget: '-',
          maxLoss: '-',
          dailyLoss: '-',
          minDays: '-',
          leverage: '-',
        },
      },
      accountSize: '-',
      price: '-',
    },
  }

};

const Experience = () => {
  const navigate = useNavigate();
  const [selectedStep, setSelectedStep] = useState('CTF 1');
  const [selectedProduct, setSelectedProduct] = useState('Meta Trader 4');
  const [selectedAccountSize, setSelectedAccountSize] = useState('$250,000');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);


  const steps = ['CTF 1', 'CTF 2', 'CTF 3', 'CTF 4'];
  const products = ['Meta Trader 4', 'Meta Trader 5'];
  const accountSizes = ['$250,000', '$500,000', '$750,000'];

  const currentData = challengeData[selectedStep]?.[selectedAccountSize] || {};
  const rules = challengeData[selectedStep]?.rules || [];

  const isComingSoon =
    rules.length === 1 &&
    Object.values(rules[0]).every((val) => val.trim() === '-');

  useEffect(() => {
    if (window.innerWidth < 768 || rules.length <= 5) return;
    const maxIndex = Math.ceil(rules.length / 5);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % maxIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [rules]);

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };
  const handleBuyChallenge = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const selectedData = {
          selectedStep,
          selectedProduct,
          selectedAccountSize,
          price: currentData?.price || '-',
        };
        navigate('/kyc', { state: selectedData });
      } else {
        setShowLoginModal(true);
      }
    });
  };


  return (
    <section className="bg-[#05004D] text-white min-h-screen py-10 px-4 flex flex-col items-center rounded-xl">
      <h2 className="text-4xl font-bold text-center mb-4">Buckle Up, Your Journey Starts Here!</h2>
      <p className="text-center text-lg text-gray-300 max-w-2xl mb-8">
        We evaluate according to objectives that best fit your style. From beginners to experts, traders from 195+ countries trust our platform.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {[steps, products, accountSizes].map((group, i) => (
          <div key={i} className="flex bg-[#1D1B4C] rounded-xl p-1">
            {group.map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (i === 0) setSelectedStep(item);
                  if (i === 1) setSelectedProduct(item);
                  if (i === 2) setSelectedAccountSize(item);
                }}
                className={`px-4 py-2 rounded-lg font-semibold ${(i === 0 && selectedStep === item) ||
                  (i === 1 && selectedProduct === item) ||
                  (i === 2 && selectedAccountSize === item)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300'
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mt-6">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 flex-1">
          <h3 className="text-2xl font-bold mb-2">Evaluation Stage</h3>
          <p className="mb-6 text-gray-200">(Student & Practitioner)</p>
          <div className="space-y-4 text-sm">
            {currentData?.evaluationStage?.map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-white inline-block" />
                {text}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 flex-1">
          <h3 className="text-2xl font-bold mb-2">Master Stage</h3>
          <p className="mb-6 text-gray-200">(Master)</p>
          <div className="space-y-4 text-sm">
            {currentData?.masterStage?.map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-white inline-block" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-[#0B0B3B] text-white px-6 py-10 w-full max-w-6xl rounded-2xl mt-10">
        <div className="grid grid-cols-4 gap-6 text-sm text-left text-gray-300 px-4">
          <div></div>
          {['Student', 'Practitioner', 'Master'].map((label) => (
            <div key={label} className="font-bold text-white text-lg">
              {label}
            </div>
          ))}
          {['profitTarget', 'maxLoss', 'dailyLoss', 'minDays', 'leverage'].map((keyName) => (
            <React.Fragment key={keyName}>
              <div className="py-3 border-t border-gray-600">
                {keyName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </div>
              {['Student', 'Practitioner', 'Master'].map((role) => (
                <div key={`${role}-${keyName}`} className="py-3 border-t border-gray-600">
                  {currentData?.metrics?.[role]?.[keyName] || '-'}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-600 pt-6 flex justify-between items-center px-4">
          <div className="text-white text-lg font-semibold">
            Account size: <span className="text-2xl">{currentData?.accountSize || '-'}</span>
          </div>
          <div className="text-white text-lg font-semibold">
            Price: <span className="text-2xl text-white">{currentData?.price || '-'}</span>
          </div>
          <button
            onClick={handleBuyChallenge}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Buy Challenge
          </button>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto overflow-hidden py-12 mt-12" id="rules">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">{selectedStep} Trading Rules</h2>

        {isComingSoon ? (
          <div className="flex justify-center items-center">
            <img src={comingSoonImage} alt="Coming Soon" className="w-64 h-64 object-contain" />
          </div>
        ) : rules.length > 5 ? (
          <div
            className="hidden md:flex transition-transform duration-1000 ease-in-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / Math.ceil(rules.length / 5))}%)`,
              width: `${Math.ceil(rules.length / 5) * 100}%`,
            }}
          >
            {rules.concat(rules.slice(0, 5)).map((rule, idx) => (
              <div
                key={idx}
                className="bg-black rounded-xl shadow-lg text-center px-6 py-8 flex-shrink-0 w-[calc(100%/5)]"
              >
                <h3 className="text-xl font-semibold mb-1">{rule.role}</h3>
                <p className="text-purple-600 mb-2 font-medium">{rule.name}</p>
                <p className="text-gray-400 text-sm leading-relaxed text-left min-h-[120px]">{rule.desc}</p>
                <button className="mt-6 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-full text-sm">
                  View More
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="hidden md:flex justify-center gap-6">
            {rules.map((rule, idx) => (
              <div key={idx} className="bg-black rounded-xl shadow-lg text-center px-6 py-8 w-[200px]">
                <h3 className="text-xl font-semibold mb-1">{rule.role}</h3>
                <p className="text-purple-600 mb-2 font-medium">{rule.name}</p>
                <p className="text-gray-400 text-sm leading-relaxed text-left min-h-[120px]">{rule.desc}</p>
                <button className="mt-6 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-full text-sm">
                  View More
                </button>
              </div>
            ))}
          </div>
        )}

        {!isComingSoon && (
          <div className="md:hidden flex gap-4 overflow-x-auto scroll-smooth scroll-snap-x snap-mandatory px-4">
            {rules.map((rule, idx) => (
              <div
                key={idx}
                className="snap-center bg-black rounded-xl shadow-lg text-center px-4 py-6 min-w-[85%] max-w-[85%] flex-shrink-0"
              >
                <h3 className="text-lg font-semibold mb-1">{rule.role}</h3>
                <p className="text-purple-600 mb-2 font-medium">{rule.name}</p>
                <p className="text-gray-400 text-sm leading-relaxed text-left min-h-[100px]">{rule.desc}</p>
                <button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-full text-sm">
                  View More
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
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

export default Experience;