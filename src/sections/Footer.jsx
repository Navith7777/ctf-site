import { FaDiscord, FaHeadset, FaPaperPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-5 md:px-20">
      <div className="grid md:grid-cols-3 gap-8 pb-10">
        {/* Our Community */}
        <div className="bg-blue-900 rounded-xl p-6">
          <div className="flex items-center gap-2 text-lg font-semibold mb-2">
            <FaDiscord className="text-2xl" />
            <span>Our Community</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Do not skip any beat.</h3>
          <p className="text-white-500 mb-4">
            The Ultimate Trading Community. Join our Discord server to get the latest updates, news and more.
          </p>
          <button className="bg-white text-blue-900 px-4 py-2 rounded font-semibold hover:bg-gray-200">
            Open Discord
          </button>
        </div>

        {/* Customer Support */}
        <div className="bg-blue-900 rounded-xl p-6">
          <div className="flex items-center gap-2 text-lg font-semibold mb-2">
            <FaHeadset className="text-2xl" />
            <span>Customer Support</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">24/7 Customer Support</h3>
          <p className="text-white-500 mb-4">
            We provide customer support around the clock 24/7 in multiple languages for our traders around the world.
          </p>
          <div className="flex gap-3 flex-wrap">
            <button className="bg-white text-blue-900 px-4 py-2 rounded font-semibold hover:bg-gray-200">
              Talk to our support
            </button>
            <button className="bg-transparent border border-white text-white px-4 py-2 rounded font-semibold hover:bg-white hover:text-blue-900">
              Open FAQs
            </button>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-blue-900 rounded-xl p-6">
          <div className="flex items-center gap-2 text-lg font-semibold mb-2">
            <FaPaperPlane className="text-2xl" />
            <span>Newsletter</span>
          </div>
          <h3 className="text-xl font-semibold mb-1">Join our Newsletter</h3>
          <p className="text-white-500 mb-4">Stay updated with our newsletter!</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 mb-3 rounded outline-none text-black"
          />
          <button className="bg-white text-blue-900 px-4 py-2 rounded font-semibold w-full hover:bg-gray-200">
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-blue-800 pt-6 grid md:grid-cols-3 gap-8 text-white-500 text-sm">
        {/* Company Links */}
        <div>
          <h4 className="font-semibold text-white mb-2">Company</h4>
          <ul className="space-y-1">
            <li>Terms of Use</li>
            <li>Contact Us</li>
            <li>Affiliate Program</li>
          </ul>
        </div>

        {/* Community Links */}
        <div>
          <h4 className="font-semibold text-white mb-2">Community</h4>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Blog</li>
            <li>Brand Kit</li>
          </ul>
        </div>

        {/* Legal & Certifications */}
        <div>
          <h4 className="font-semibold text-white mb-2">Legal</h4>
          <ul className="space-y-1">
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
          <div className="mt-4 space-y-2">
            <p className="flex items-center gap-2">
              <img src="/assets/iso.jpeg" alt="ISO" className="w-5" />
              ISO 27001:2022 – ISMS
            </p>
            <p className="flex items-center gap-2">
              <img src="/assets/iso.jpeg" alt="ISO" className="w-5" />
              ISO 22301:2019 – BCMS
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 text-white-500">
        © 2025 competition Trader Funding All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
