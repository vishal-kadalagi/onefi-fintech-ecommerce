import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { ArrowRight, ShieldCheck, TrendingUp, Wallet, CheckCircle2, Zap, LayoutGrid } from 'lucide-react';

const prisma = new PrismaClient();

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <div className="flex flex-col w-full selection:bg-[#5B21B6] selection:text-white">
      {/* Hero Section */}
      <section className="bg-[#0A0A0A] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#8B5CF6] opacity-20 blur-[120px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#3B82F6] opacity-20 blur-[120px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-xs font-bold mb-8 tracking-widest text-[#E9D5FF] uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A78BFA] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B5CF6]"></span>
            </span>
            India's First Security-Backed Pay-Later
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl leading-[1.1]">
            Buy what you love, at <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-[#60A5FA]">0% Interest.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed font-medium">
            Your investments—not your credit score—power your purchases. Unlock flexible EMIs backed instantly by your Mutual Funds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#products" className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2">
              Shop Now <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#how-it-works" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-[#0A0A0A] pb-10 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transform -translate-y-6">
            <div className="bg-[#171717] border border-gray-800 p-6 rounded-2xl flex items-start gap-4 hover:border-gray-700 transition-colors">
              <div className="bg-green-500/10 p-3 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">100% Secure</h3>
                <p className="text-sm text-gray-400">Bank-grade encryption protects your mutual fund data.</p>
              </div>
            </div>
            <div className="bg-[#171717] border border-gray-800 p-6 rounded-2xl flex items-start gap-4 hover:border-gray-700 transition-colors">
              <div className="bg-blue-500/10 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Keep Earning</h3>
                <p className="text-sm text-gray-400">Your funds continue to grow in the market while you pay.</p>
              </div>
            </div>
            <div className="bg-[#171717] border border-gray-800 p-6 rounded-2xl flex items-start gap-4 hover:border-gray-700 transition-colors">
              <div className="bg-purple-500/10 p-3 rounded-xl">
                <Wallet className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Zero Hidden Fees</h3>
                <p className="text-sm text-gray-400">No processing fees, no prepay penalties. Just transparent EMIs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-[#5B21B6] uppercase tracking-widest mb-2">Simple Process</h2>
            <h3 className="text-4xl font-extrabold text-gray-900">How 1Fi Works</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-purple-100 via-purple-300 to-purple-100 z-0"></div>
            
            <div className="flex flex-col items-center relative z-10">
              <div className="w-24 h-24 bg-white border-4 border-purple-50 shadow-xl text-[#5B21B6] rounded-full flex items-center justify-center mb-6">
                <LayoutGrid className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">1. Pick a Product</h3>
              <p className="text-gray-500 text-center leading-relaxed">Browse our curated list of premium smartphones, laptops, and smart gadgets.</p>
            </div>
            
            <div className="flex flex-col items-center relative z-10">
              <div className="w-24 h-24 bg-white border-4 border-purple-50 shadow-xl text-[#5B21B6] rounded-full flex items-center justify-center mb-6">
                <Wallet className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">2. Choose EMI</h3>
              <p className="text-gray-500 text-center leading-relaxed">Select a flexible tenure. Enjoy 0% interest on plans backed by your Mutual Funds.</p>
            </div>
            
            <div className="flex flex-col items-center relative z-10">
              <div className="w-24 h-24 bg-white border-4 border-purple-50 shadow-xl text-[#5B21B6] rounded-full flex items-center justify-center mb-6">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">3. Instant Approval</h3>
              <p className="text-gray-500 text-center leading-relaxed">Get approved instantly without credit checks affecting your CIBIL score.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Featured Products</h2>
              <p className="text-gray-500 mt-3 text-lg font-medium">Premium electronics available on 0% EMI</p>
            </div>
            <button className="text-[#5B21B6] font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All Products <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link href={`/products/${product.slug}`} key={product.id} className="group">
                <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col relative overflow-hidden hover:-translate-y-1 cursor-pointer">
                  <div className="absolute top-5 left-5 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md z-10">
                    0% EMI
                  </div>
                  
                  <div className="w-full h-64 relative mb-8 mt-4 p-4 flex items-center justify-center bg-gray-50/50 rounded-2xl group-hover:scale-105 transition-transform duration-500">
                    <img src={product.imageUrl} alt={product.name} className="object-contain max-w-full max-h-full drop-shadow-xl" />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-end">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#5B21B6] transition-colors">{product.name}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-6 font-medium">{product.description}</p>
                    
                    <div className="flex items-end justify-between mt-auto pt-5 border-t border-gray-100">
                      <div>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">Starting from</span>
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-black text-gray-900 leading-none">
                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.price)}
                          </span>
                        </div>
                      </div>
                      <div className="bg-gray-100 text-gray-900 rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-[#5B21B6] group-hover:text-white transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
