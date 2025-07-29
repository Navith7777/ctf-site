import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../lib/firebase'; 
const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [oobCode, setOobCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('oobCode');

    if (code) {
      setOobCode(code);
      setIsCodeValid(true);
      toast.success('Reset code verified! Enter your new password.');
    } else {
      toast.error('Invalid or missing reset code.');
    }
  }, []);

  const handleUpdate = async () => {
    if (!password || password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      toast.success('Password updated! Redirecting...');
      setTimeout(() => navigate('/'), 2500);
    } catch (error) {
      toast.error(error.message || 'Failed to update password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 text-white px-4">
      <Toaster />
      <div className="w-full max-w-md bg-white/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl border border-white/20">
        <h1 className="text-3xl font-bold mb-4 text-center text-green-400">CTF</h1>
        <p className="text-lg mb-2 text-center">Reset Your Password</p>
        <p className="text-sm text-center text-gray-300 mb-6">
          Please enter your new password below.
        </p>

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 mb-4 rounded bg-[#1c1c1c] border border-gray-600 placeholder-gray-400 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={!isCodeValid}
        />

        <button
          onClick={handleUpdate}
          disabled={!isCodeValid}
          className={`w-full py-3 rounded font-bold ${
            isCodeValid
              ? 'bg-green-500 hover:bg-green-600 text-black'
              : 'bg-gray-500 cursor-not-allowed'
          }`}
        >
          Update Password
        </button>

        <p className="text-center mt-4 text-sm text-gray-400">
          {isCodeValid ? 'Reset link is valid.' : 'Invalid or expired link.'}
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
