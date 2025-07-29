import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { auth } from '../lib/firebase'; 
import { ref, set } from 'firebase/database';
import axios from 'axios';

const Kyc = () => {
  const location = useLocation();
  const {
    selectedStep,
    selectedProduct,
    selectedAccountSize,
    price,
  } = location.state || {};

  const [form, setForm] = useState({
    country: 'India',
    accountType: selectedStep || 'CTF 1',
    fundingType: selectedStep || 'CTF 1',
    profitTarget: '8%',
    platform: selectedProduct || 'Meta Trader 4',
    accountSize: selectedAccountSize || '$250,000',
    numericAccountSize: selectedAccountSize?.replace(/[^0-9]/g, '') || '250000',
    price: price || '$80',
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
        const sorted = res.data.map((c) => c.name.common).sort();
        setCountries(sorted);
      })
      .catch((err) => console.error('Country fetch failed:', err));
  }, []);

  useEffect(() => {
  const updateRealtimeDB = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await set(ref(database, `kyc_forms/${user.uid}`), {
        ...form,
        user_id: user.uid,
      });
    } catch (error) {
      console.error('Error saving to Realtime DB:', error.message);
    }
  };

  updateRealtimeDB();
}, [form]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleClick = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 bg-white text-black font-sans min-h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Setup Your Challenge</h2>

        <label className="block mb-2 font-medium">1. Choose Your Country</label>
        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 text-sm"
        >
          <option value="">-- Select Country --</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        <label className="block mb-2 font-medium">2. Account Type</label>
        <div className="flex gap-2 mb-4 flex-wrap">
          {['CTF 1', 'CTF 2', 'CTF 3', 'CTF 4'].map((type) => (
            <button
              key={type}
              disabled={type !== form.accountType}
              onClick={() => handleClick('accountType', type)}
              className={`px-4 py-2 border rounded-lg text-sm font-medium transition ${
                form.accountType === type
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <label className="block mb-2 font-medium">3. Platform</label>
        <div className="flex gap-2 mb-4 flex-wrap">
          {['Meta Trader 4', 'Meta Trader 5'].map((platform) => (
            <button
              key={platform}
              disabled={platform !== form.platform}
              onClick={() => handleClick('platform', platform)}
              className={`px-4 py-2 border rounded-lg text-sm font-medium transition ${
                form.platform === platform
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>

        <label className="block mb-2 font-medium">4. Account Size</label>
        <div className="flex gap-2 flex-wrap">
          {['$250,000', '$500,000', '$750,000'].map((amount) => (
            <button
              key={amount}
              disabled={amount !== form.accountSize}
              onClick={() => {
                handleClick('accountSize', amount);
                handleClick('numericAccountSize', amount.replace(/[^0-9]/g, ''));
              }}
              className={`px-4 py-2 border rounded-lg text-sm font-medium transition ${
                form.accountSize === amount
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
              }`}
            >
              {amount}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Address Details</h2>

        {['firstName', 'lastName', 'billingAddress'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.replace(/([A-Z])/g, ' $1')}
            value={form[field]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 mb-3 text-sm"
          />
        ))}

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="ZIP / Postal Code"
            value={form.postalCode}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          />
        </div>

        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 text-sm"
        />

        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        <div className="border p-4 rounded-lg bg-blue-50 text-sm mb-4">
          <p className="font-semibold">
            {form.accountSize} — {form.accountType}
          </p>
          <p>Platform: {form.platform}</p>
          <p className="mt-2 font-semibold text-right text-lg text-black">{form.price}</p>
        </div>

        <div className="border p-4 rounded-lg bg-gray-100 mb-4 text-sm text-gray-700">
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />
            <span>
              I agree to the{' '}
              <a href="#" className="text-blue-600 underline">Terms of Use</a>{' '}
              and confirm that all provided information matches my government-issued ID.
            </span>
          </label>
        </div>

        <button
          disabled={!form.agree}
          className={`w-full text-white font-semibold py-3 rounded-lg transition ${
            form.agree ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default Kyc;
