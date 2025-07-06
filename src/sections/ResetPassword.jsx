import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import toast, { Toaster } from 'react-hot-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [sessionReady, setSessionReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', '?'));

    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');

    if (access_token && refresh_token) {
      supabase.auth
        .setSession({ access_token, refresh_token })
        .then(({ error }) => {
          if (error) {
            toast.error('Failed to restore session. Try the link again.');
          } else {
            toast.success('Session restored! Set your new password.');
            setSessionReady(true);
          }
        });
    } else {
      toast.error('Auth session missing. Open the reset link from your email.');
    }
  }, []);

  const handleUpdate = async () => {
    if (!password || password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Password updated! Redirecting to home...');
      setTimeout(() => {
        navigate('/');
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 text-white px-4">
      <Toaster />
      <div className="w-full max-w-md bg-white/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl border border-white/20">
        <h1 className="text-3xl font-bold mb-4 text-center text-green-400">CTF</h1>
        <p className="text-lg mb-2 text-center"> Reset Your Password</p>
        <p className="text-sm text-center text-gray-300 mb-6">
          Please enter your new password below.
        </p>

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 mb-4 rounded bg-[#1c1c1c] border border-gray-600 placeholder-gray-400 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={!sessionReady}
        />

        <button
          onClick={handleUpdate}
          disabled={!sessionReady}
          className={`w-full py-3 rounded font-bold ${
            sessionReady
              ? 'bg-green-500 hover:bg-green-600 text-black'
              : 'bg-gray-500 cursor-not-allowed'
          }`}
        >
          Update Password
        </button>

        <p className="text-center mt-4 text-sm text-gray-400">
          {sessionReady ? 'You are authenticated.' : 'Waiting for session...'}
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
