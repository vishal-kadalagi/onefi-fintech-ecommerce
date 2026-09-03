'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, Zap, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Listen for cart updates from other pages
  useEffect(() => {
    const loadCart = () => {
      const saved = JSON.parse(localStorage.getItem('1fi_cart') || '[]');
      setCartItems(saved);
      setCartCount(saved.length);
    };
    
    loadCart();
    window.addEventListener('cart-updated', loadCart);
    return () => window.removeEventListener('cart-updated', loadCart);
  }, []);

  const handleClearCart = () => {
    localStorage.removeItem('1fi_cart');
    setCartItems([]);
    setCartCount(0);
    window.dispatchEvent(new Event('cart-updated'));
    toast.success('Cart cleared');
  };

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="bg-gradient-to-br from-[#8B5CF6] to-[#5B21B6] text-white p-2 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300">
                  <Zap className="w-5 h-5 fill-white" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-extrabold text-[22px] tracking-tight text-gray-900 leading-none">
                    1Fi
                  </span>
                  <span className="font-semibold text-[10px] tracking-widest text-[#5B21B6] uppercase leading-none mt-0.5">
                    Pay Later
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/" className="text-[15px] font-semibold text-gray-600 hover:text-[#5B21B6] px-4 py-2 rounded-full hover:bg-purple-50 transition-all">Home</Link>
              <Link href="/#products" className="text-[15px] font-semibold text-gray-600 hover:text-[#5B21B6] px-4 py-2 rounded-full hover:bg-purple-50 transition-all">Products</Link>
              <Link href="/#how-it-works" className="text-[15px] font-semibold text-gray-600 hover:text-[#5B21B6] px-4 py-2 rounded-full hover:bg-purple-50 transition-all">How it works</Link>
            </div>

            {/* Icons & Actions */}
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsCartOpen(true)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4 space-y-3 shadow-lg absolute w-full animate-in slide-in-from-top-2">
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className="block text-gray-800 font-bold text-lg hover:text-[#5B21B6] p-2">Home</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/#products" className="block text-gray-800 font-bold text-lg hover:text-[#5B21B6] p-2">Products</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/#how-it-works" className="block text-gray-800 font-bold text-lg hover:text-[#5B21B6] p-2">How it works</Link>
          </div>
        )}
      </nav>

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-[#5B21B6]" />
                Your Cart
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 hover:bg-gray-200 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-grow p-6 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <ShoppingCart className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-lg font-bold text-gray-900">Your cart is empty</p>
                  <p className="text-gray-500 text-sm mt-1">Looks like you haven't added anything yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 border border-gray-100 rounded-2xl bg-white shadow-sm">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-contain bg-gray-50 rounded-xl p-2" />
                      <div className="flex-grow">
                        <h4 className="font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">{item.variantInfo}</p>
                        <div className="flex justify-between items-end">
                          <span className="font-black text-[#5B21B6]">₹{item.price.toLocaleString('en-IN')}</span>
                          {item.emiPlan && (
                            <span className="text-[10px] font-bold bg-purple-100 text-[#5B21B6] px-2 py-1 rounded">
                              EMI: ₹{item.emiPlan.monthly.toLocaleString('en-IN')}/mo
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between text-lg font-bold text-gray-900 mb-4">
                  <span>Total</span>
                  <span>₹{cartItems.reduce((acc, item) => acc + item.price, 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleClearCart} className="flex-1 py-4 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition-all">
                    Clear
                  </button>
                  <button onClick={() => { setIsCartOpen(false); toast.success('Proceeding to checkout...'); }} className="flex-[2] py-4 bg-[#5B21B6] text-white font-bold rounded-xl shadow-md hover:bg-purple-800 transition-all">
                    Checkout Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
