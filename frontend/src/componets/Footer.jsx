 import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 font-sans tracking-wide">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-extrabold text-white mb-6 uppercase tracking-tighter">
            PRO<span className="text-blue-600">STORE</span>
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Your premium destination for the latest electronics, fashion, and lifestyle products. 
            Delivering quality right to your doorstep since 2026.
          </p>
        </div>

        {/* Categories Section */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Shop By Category</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-blue-500 hover:translate-x-1 transition-all inline-block">Electronics</a></li>
            <li><a href="#" className="hover:text-blue-500 hover:translate-x-1 transition-all inline-block">Men's Fashion</a></li>
            <li><a href="#" className="hover:text-blue-500 hover:translate-x-1 transition-all inline-block">Women's Clothing</a></li>
            <li><a href="#" className="hover:text-blue-500 hover:translate-x-1 transition-all inline-block">Jewelery & Accessories</a></li>
          </ul>
        </div>

        {/* Customer Support Section */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Customer Support</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-blue-500 transition-colors">Track Your Order</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Stay Updated</h4>
          <p className="text-xs text-gray-500 mb-4">Subscribe to get special offers and once-in-a-lifetime deals.</p>
          <div className="flex group">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-gray-900 text-white px-4 py-2.5 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-600 w-full text-sm border border-gray-800"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-r-lg text-sm font-black transition-all">
              GO
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-900 bg-black/40 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Payment Badges */}
          <div className="flex flex-wrap justify-center gap-4 grayscale opacity-50 hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-bold border border-gray-800 px-3 py-1.5 rounded bg-gray-900">VISA</span>
            <span className="text-[10px] font-bold border border-gray-800 px-3 py-1.5 rounded bg-gray-900">MASTERCARD</span>
            <span className="text-[10px] font-bold border border-gray-800 px-3 py-1.5 rounded bg-gray-900">PAYPAL</span>
            <span className="text-[10px] font-bold border border-gray-800 px-3 py-1.5 rounded bg-gray-900">APPLE PAY</span>
          </div>

          {/* Social & Credits */}
          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-6 mb-4 text-gray-500">
               <a href="#" className="hover:text-white transition-colors text-lg"><i className="fab fa-github"></i></a>
               <a href="#" className="hover:text-white transition-colors text-lg"><i className="fab fa-linkedin"></i></a>
               <a href="#" className="hover:text-white transition-colors text-lg"><i className="fab fa-instagram"></i></a>
            </div>
            <p className="text-[11px] text-gray-600 uppercase tracking-widest font-medium">
              © 2026 Built with React
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;