import { useEffect, useState } from 'react';
import axios from 'axios';

const Kyc = () => {
  const [form, setForm] = useState({
    country: 'India',
    accountType: 'Two Step',
    fundingType: 'CTF1',
    profitTarget: '8%',
    platform: 'MetaTrader5',
    accountSize: '$100,000',
    firstName: '',
    lastName: '',
    billingAddress: '',
    city: '',
    postalCode: '',
    phoneNumber: '',
    agree: false,
  });

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all?fields=name')
      .then((res) => {
        const sorted = res.data.map((c) => c.name.common).sort((a, b) => a.localeCompare(b));
        setCountries(sorted);
      })
      .catch((err) => console.error('Error loading countries:', err.response?.data || err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleClick = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!form.agree) {
      alert('Please agree to the terms before proceeding.');
      return;
    }
    console.log('Form Submitted:', form);
    // Trigger payment logic here
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-10 bg-white text-black font-sans">
      {/* LEFT SIDE */}
      <div>
        <h2 className="text-xl font-bold mb-4">Setup Your Challenge</h2>

        {/* Country */}
        <label className="block mb-2 text-sm font-semibold text-gray-800">1. Choose Your Country</label>
        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">-- Select Country --</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* Funding Type */}
        <label className="block mb-2 text-sm font-semibold text-gray-800">2. Choose the Account Type</label>
        <div className="flex gap-2 mb-4 flex-wrap">
          {['CTF1', 'CTF2', 'CTF3', 'CTF4'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleClick('fundingType', type)}
              className={`px-4 py-2 border rounded-md text-sm transition ${
                form.fundingType === type
                  ? 'bg-blue-100 text-blue-700 border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}>
              {type}
            </button>
          ))}
        </div>

        {/* Profit Target */}
        <label className="block mb-2 text-sm font-semibold text-gray-800">Configure Your Student Phase</label>
        <div className="flex gap-2 mb-4 flex-wrap">
          {['8%', '10%'].map((target) => (
            <button
              key={target}
              type="button"
              onClick={() => handleClick('profitTarget', target)}
              className={`px-4 py-2 border rounded-md text-sm transition ${
                form.profitTarget === target
                  ? 'bg-blue-100 text-blue-700 border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}>
              {target === '10%' ? '10% (-$40.00)' : target}
            </button>
          ))}
        </div>

        {/* Platform */}
        <label className="block mb-2 text-sm font-semibold text-gray-800">3. Choose Your Platform</label>
        <div className="flex gap-2 mb-4 flex-wrap">
          {['MetaTrader4', 'MetaTrader5'].map((platform) => (
            <button
              key={platform}
              type="button"
              onClick={() => handleClick('platform', platform)}
              className={`px-4 py-2 border rounded-md text-sm transition ${
                form.platform === platform
                  ? 'bg-blue-100 text-blue-700 border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}>
              {platform}
            </button>
          ))}
        </div>

        {/* Account Size */}
        <label className="block mb-2 text-sm font-semibold text-gray-800">4. Select Account Size</label>
        <div className="flex gap-2 flex-wrap">
          {['$250,000', '$500,000', '$750,000'].map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handleClick('accountSize', amount)}
              className={`px-4 py-2 border rounded-md text-sm transition ${
                form.accountSize === amount
                  ? 'bg-blue-100 text-blue-700 border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}>
              {amount}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div>
        <h2 className="text-xl font-bold mb-4">Address Details</h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-2 text-sm"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 text-sm"
        />
        <input
          type="text"
          name="billingAddress"
          placeholder="Address"
          value={form.billingAddress}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 text-sm"
        />

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="ZIP / Postal Code"
            value={form.postalCode}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          />
        </div>

        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2 mb-4 text-sm"
        />

        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        <div className="border p-4 rounded-md bg-blue-50 text-sm text-gray-800 mb-4">
          <p className="font-semibold">
            {form.accountSize} — {form.accountType} {form.fundingType}
          </p>
          <p>Platform: {form.platform}</p>
          <p className="mt-2 font-semibold text-right text-lg text-black">$529.00</p>
        </div>

        <div className="border p-4 rounded-md bg-gray-50 mb-4 text-sm text-gray-700">
          <label className="flex items-start gap-2">
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
            <div>
              <p>
                I have read and agreed to the{' '}
                <a href="#" className="text-blue-600 underline">
                  Terms of Use
                </a>
                .
              </p>
              <p>All information provied is correct and matches government-issued ID.</p>
              <p>
                I have read and agree with the{' '}
                <a href="#" className="text-blue-600 underline">
                  Terms & Conditions
                </a>
                .
              </p>
              <p>I confirm that I am not a U.S. citizen or resident.</p>
            </div>
          </label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!form.agree}
          className={`w-full text-white font-semibold py-3 rounded-md transition ${
            form.agree ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}>
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default Kyc;