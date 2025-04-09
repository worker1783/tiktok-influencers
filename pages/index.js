import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function TikTokLoginPage() {
  const router = useRouter();

  const handleLoginSelection = (loginMethod) => {
    switch (loginMethod) {
      case 'tiktok':
        router.push('/tiktok-login');
        break;
      case 'phone':
        router.push('/phone-login');
        break;
      case 'facebook':
        router.push('/facebook-login');
        break;
      case 'google':
        router.push('/google-login');
        break;
      case 'apple':
        router.push('/apple-login');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Close Button */}
      <button className="absolute top-4 left-4 text-black text-2xl">
        ✕
      </button>

      {/* Help Icon */}
      <button className="absolute top-4 right-4 text-gray-500 text-xl">
        ?
      </button>

      {/* Title */}
      <h1 className="text-black text-3xl font-bold mb-2">Log in to TikTok</h1>

      {/* Subtitle */}
      <p className="text-gray-500 text-sm mb-8 text-center">
        Manage your account, check notifications, comment on videos, and more.
      </p>

      {/* Login Options */}
      <div className="space-y-4 w-80">
        <motion.button
          onClick={() => handleLoginSelection('tiktok')}
          className="w-full p-3 bg-white border border-gray-300 rounded text-black text-base flex items-center justify-start"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image src="/tiktok-icon.png" alt="TikTok Icon" width={24} height={24} className="mr-4" />
          Use TikTok app
        </motion.button>

        <motion.button
          onClick={() => handleLoginSelection('phone')}
          className="w-full p-3 bg-white border border-gray-300 rounded text-black text-base flex items-center justify-start"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image src="/user-icon.png" alt="User Icon" width={24} height={24} className="mr-4" />
          Use phone / email / username
        </motion.button>

        <motion.button
          onClick={() => handleLoginSelection('facebook')}
          className="w-full p-3 bg-white border border-gray-300 rounded text-black text-base flex items-center justify-start"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image src="/facebook-icon.png" alt="Facebook Icon" width={24} height={24} className="mr-4" />
          Continue with Facebook
        </motion.button>

        <motion.button
          onClick={() => handleLoginSelection('google')}
          className="w-full p-3 bg-white border border-gray-300 rounded text-black text-base flex items-center justify-start"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image src="/google-icon.png" alt="Google Icon" width={24} height={24} className="mr-4" />
          Continue with Google
        </motion.button>

        <motion.button
          onClick={() => handleLoginSelection('apple')}
          className="w-full p-3 bg-white border border-gray-300 rounded text-black text-base flex items-center justify-start"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image src="/apple-icon.png" alt="Apple Icon" width={24} height={24} className="mr-4" />
          Continue with Apple
        </motion.button>
      </div>

      {/* Terms and Privacy Policy */}
      <p className="text-gray-500 text-xs mt-8 text-center max-w-xs">
        By continuing with an account located in Nigeria, you agree to our{' '}
        <a href="#" className="text-black font-semibold">
          Terms of Service
        </a>{' '}
        and acknowledge that you have read our{' '}
        <a href="#" className="text-black font-semibold">
          Privacy Policy
        </a>.
      </p>

      {/* Sign Up Link */}
      <div className="mt-4">
        <p className="text-black text-sm">
          Don’t have an account?{' '}
          <a href="/signup" className="text-pink-500 font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}