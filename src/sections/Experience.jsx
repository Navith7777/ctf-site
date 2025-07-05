import { useState } from 'react';

const Experience = () => {
  const [selectedStep, setSelectedStep] = useState('2 step');
  const [selectedProduct, setSelectedProduct] = useState('FundingPips');
  const [selectedAccountSize, setSelectedAccountSize] = useState('$100K');

  const steps = ['Zero', '1 step', '2 step'];
  const products = ['FundingPips', 'FundingPips Pro'];
  const accountSizes = ['$5K', '$10K', '$25K', '$50K', '$100K'];

  return (
    <section className="bg-[#05004D] text-white min-h-screen py-10 px-4 flex flex-col items-center rounded-xl">
      <h2 className="text-4xl font-bold text-center mb-4">Buckle Up, Your Journey Starts Here!</h2>
      <p className="text-center text-lg text-gray-300 max-w-2xl mb-8">
        We evaluate according to objectives that best fit your style. From beginners to experts, traders from 195+ countries trust our platform.
      </p>

      {/* Toggle Groups */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {/* Step Selection */}
        <div className="flex bg-[#1D1B4C] rounded-xl p-1">
          {steps.map((step) => (
            <button
              key={step}
              onClick={() => setSelectedStep(step)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                selectedStep === step ? 'bg-blue-600 text-white' : 'text-gray-300'
              }`}
            >
              {step}
            </button>
          ))}
        </div>

        {/* Product Type */}
        <div className="flex bg-[#1D1B4C] rounded-xl p-1">
          {products.map((product) => (
            <button
              key={product}
              onClick={() => setSelectedProduct(product)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                selectedProduct === product ? 'bg-blue-600 text-white' : 'text-gray-300'
              }`}
            >
              {product}
            </button>
          ))}
        </div>

        {/* Account Sizes */}
        <div className="flex bg-[#1D1B4C] rounded-xl p-1">
          {accountSizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedAccountSize(size)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                selectedAccountSize === size ? 'bg-blue-600 text-white' : 'text-gray-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Evaluation + Master Stage Cards */}
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mt-6">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 flex-1">
          <h3 className="text-2xl font-bold mb-2">Evaluation Stage</h3>
          <p className="mb-6 text-gray-200">(Student & Practitioner)</p>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-white inline-block" />
              Monthly 100%
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 flex-1">
          <h3 className="text-2xl font-bold mb-2">Master Stage</h3>
          <p className="mb-6 text-gray-200">(Master)</p>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-white inline-block" />
              Bi-weekly 80%
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-white inline-block" />
              Tuesday 60%
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Metrics Section */}
      <section className="bg-[#0B0B3B] text-white px-6 py-10 w-full max-w-6xl rounded-2xl mt-10">
        {/* Step Indicators */}
        <div className="flex justify-center items-center gap-8 mb-10">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center text-white">
              <div className="w-8 h-8 rounded-full bg-[#292B6D] text-white flex items-center justify-center font-bold">
                {step}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="grid grid-cols-4 gap-6 text-sm text-left text-gray-300 px-4">
          <div></div>
          <div className="font-bold text-white text-lg">Student</div>
          <div className="font-bold text-white text-lg">Practitioner</div>
          <div className="font-bold text-white text-lg">Master</div>

          <div className="py-3 border-t border-gray-600">Profit Target</div>
          <div className="py-3 border-t border-gray-600">$8,000 (8%)</div>
          <div className="py-3 border-t border-gray-600">$5,000 (5%)</div>
          <div className="py-3 border-t border-gray-600">-</div>

          <div className="py-3 border-t border-gray-600">Maximum Loss</div>
          <div className="py-3 border-t border-gray-600">10%</div>
          <div className="py-3 border-t border-gray-600">10%</div>
          <div className="py-3 border-t border-gray-600">10%</div>

          <div className="py-3 border-t border-gray-600">Maximum Daily Loss</div>
          <div className="py-3 border-t border-gray-600">5%</div>
          <div className="py-3 border-t border-gray-600">5%</div>
          <div className="py-3 border-t border-gray-600">5%</div>

          <div className="py-3 border-t border-gray-600">Minimum Trading Days</div>
          <div className="py-3 border-t border-gray-600">3 days</div>
          <div className="py-3 border-t border-gray-600">3 days</div>
          <div className="py-3 border-t border-gray-600">-</div>

          <div className="py-3 border-t border-gray-600">Leverage</div>
          <div className="py-3 border-t border-gray-600">1:100</div>
          <div className="py-3 border-t border-gray-600">1:100</div>
          <div className="py-3 border-t border-gray-600">1:100</div>
        </div>

        {/* Bottom Row */}
        <div className="mt-10 border-t border-gray-600 pt-6 flex justify-between items-center px-4">
          <div className="text-white text-lg font-semibold">
            Account size: <span className="text-2xl">100k</span>
          </div>
          <div className="text-white text-lg font-semibold">
            Price: <span className="text-2xl text-white">$529</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
            Buy Challenge
          </button>
        </div>
      </section>
    </section>
  );
};

export default Experience;
