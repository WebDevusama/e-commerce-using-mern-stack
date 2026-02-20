import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import   "./Foot.css"
export default function Footer() {
  return (
    <div className="footer-container">
    <footer className="bg-gray-100 text-gray-700">
      
      {/* Newsletter */}
      <div className="text-center py-5 px-4">
        <h2 className="text-xl font-semibold mb-2">
          Subscribe on our newsletter
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Get daily news on upcoming offers from many suppliers all over the world
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-600 text-white p-2 rounded-md">👜</div>
              <h3 className="text-lg font-semibold">Brand</h3>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Best information about the company goes here but now lorem ipsum is
            </p>

                <div className="social-icons flex gap-3 text-gray-500" aria-label="Social links">
                  <FaFacebookF aria-hidden="true" />
                  <FaTwitter aria-hidden="true" />
                  <FaLinkedinIn aria-hidden="true" />
                  <FaInstagram aria-hidden="true" />
                  <FaYoutube aria-hidden="true" />
                </div>
          </div>

          {/* Columns */}
          {[
            {
              title: "About",
              links: ["About Us", "Find store", "Categories", "Blogs"],
            },
            {
              title: "Partnership",
              links: ["About Us", "Find store", "Categories", "Blogs"],
            },
            {
              title: "Information",
              links: ["Help Center", "Money Refund", "Shipping", "Contact us"],
            },
            {
              title: "For users",
              links: ["Login", "Register", "Settings", "My Orders"],
            },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-semibold mb-3">{col.title}</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                {col.links.map((link, idx) => (
                  <li key={idx} className="hover:text-blue-600 cursor-pointer">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* App */}
          <div>
            <h4 className="font-semibold mb-3">Get app</h4>
            <div className="app-badges flex flex-col sm:flex-row gap-3">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                className="app-badge w-36"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Get_it_on_Google_play.svg"
                alt="Get it on Google Play"
                className="app-badge w-36"
              />
            </div>
          </div>
        </div>
      </div>

    </footer>
    </div>
  );
}
