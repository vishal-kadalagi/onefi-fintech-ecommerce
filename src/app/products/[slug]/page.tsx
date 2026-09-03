'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Truck, RotateCcw, Info, Loader2, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Variant {
  id: number;
  type: string;
  name: string;
}

interface EmiPlan {
  id: number;
  tenure: number;
  monthlyAmount: number;
  interestRate: number;
  cashback: number | null;
}

interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  mrp: number;
  price: number;
  imageUrl: string;
  variants: Variant[];
  emiPlans: EmiPlan[];
}

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        if (data.emiPlans && data.emiPlans.length > 0) {
          setSelectedPlan(data.emiPlans[0].id);
        }
        
        if (data.variants) {
          const initialVariants: Record<string, string> = {};
          const types = Array.from(new Set(data.variants.map((v: Variant) => v.type)));
          types.forEach(type => {
            const firstOfType = data.variants.find((v: Variant) => v.type === type);
            if (firstOfType) initialVariants[type as string] = firstOfType.name;
          });
          setSelectedVariants(initialVariants);
        }
        
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0);

  const handleProceed = () => {
    if (!selectedPlan) return;
    setIsCheckingOut(true);
    setCheckoutStep(1); // Processing

    setTimeout(() => {
      setCheckoutStep(2); // Success
      toast.success('EMI Plan Activated Successfully!', {
        duration: 4000, 
        style: { background: '#22c55e', color: '#fff', borderRadius: '10px', fontWeight: 'bold' }
      });
      
      // Close modal after showing success for a bit
      setTimeout(() => {
        setIsCheckingOut(false);
        setCheckoutStep(0);
      }, 3000);
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 w-full animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-48 mb-8"></div>
        <div className="bg-white rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="w-full aspect-square bg-gray-100 rounded-2xl mt-4"></div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="h-10 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-24 bg-gray-100 rounded-xl mt-6"></div>
            <div className="h-24 bg-gray-100 rounded-xl"></div>
            <div className="h-24 bg-gray-100 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-6">The item you are looking for doesn't exist or has been removed.</p>
        <Link href="/" className="bg-[#6B21A8] text-white px-6 py-2.5 rounded-full font-medium hover:bg-purple-800 transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  const groupedVariants = product.variants.reduce((acc, variant) => {
    if (!acc[variant.type]) acc[variant.type] = [];
    acc[variant.type].push(variant);
    return acc;
  }, {} as Record<string, Variant[]>);

  const colorVariants = product.variants.filter(v => v.type.toLowerCase() === 'color');
  const nonColorTypes = Array.from(new Set(product.variants.filter(v => v.type.toLowerCase() !== 'color').map(v => v.type)));

  // Map specific colors to different Unsplash images for a realistic feel
  const colorImageMap: Record<string, Record<string, string>> = {
    'iphone-17-pro': {
      'Space Black': 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1000&auto=format&fit=crop',
      'Deep Blue': 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=1000&auto=format&fit=crop'
    },
    'samsung-s24-ultra': {
      'Titanium Violet': 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?q=80&w=1000&auto=format&fit=crop'
    },
    'macbook-pro-m3': {
      'Silver': 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop'
    },
    'ipad-pro-m4': {
      'Silver': 'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?q=80&w=1000&auto=format&fit=crop'
    },
    'sony-wh-1000xm5': {
      'Silver': 'https://images.unsplash.com/photo-1612222869049-d8ec83637a3c?q=80&w=1000&auto=format&fit=crop',
      'Midnight Blue': 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000&auto=format&fit=crop'
    }
  };

  const selectedColorName = selectedVariants['color'];
  const displayImage = (selectedColorName && colorImageMap[product.slug]?.[selectedColorName]) || product.imageUrl;

  // Dynamic Pricing Logic based on selected variants (Mock for Demo)
  let priceModifier = 0;
  if (selectedVariants['storage'] === '512GB') priceModifier += 20000;
  if (selectedVariants['storage'] === '1TB') priceModifier += 40000;
  if (selectedVariants['edition'] === 'Digital Edition') priceModifier -= 10000;
  if (selectedVariants['connectivity'] === 'Wi-Fi + Cellular') priceModifier += 15000;
  
  const currentPrice = product.price + priceModifier;
  const currentMrp = product.mrp + priceModifier;
  const priceRatio = currentPrice / product.price;

  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex-grow">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-8 font-medium">
          <Link href="/" className="hover:text-[#6B21A8] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <Link href="/" className="hover:text-[#6B21A8] transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <span className="text-gray-900">{product.name}</span>
        </nav>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Image & Details Card (Matching Reference) */}
            <div className="w-full lg:w-5/12">
              <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-8 flex flex-col relative h-[600px]">
                <span className="text-red-500 font-bold text-[10px] uppercase tracking-wider mb-2">NEW</span>
                <h1 className="text-3xl font-normal text-gray-900 tracking-tight leading-tight">{product.name}</h1>
                
                {/* Non-Color Variants (e.g., Storage, Edition, Connectivity) */}
                {nonColorTypes.length > 0 && (
                  <div className="mt-3 flex flex-col gap-3 z-10 relative">
                    {nonColorTypes.map(type => (
                      <div key={type} className="flex gap-2">
                        {product.variants.filter(v => v.type === type).map(v => (
                          <button
                            key={v.id}
                            onClick={() => setSelectedVariants({...selectedVariants, [type]: v.name})}
                            className={`px-3 py-1.5 text-[11px] uppercase tracking-wide font-bold rounded border transition-all ${
                              selectedVariants[type] === v.name
                              ? 'border-gray-900 bg-gray-900 text-white'
                              : 'border-gray-200 text-gray-500 hover:border-gray-400'
                            }`}
                          >
                            {v.name}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex-grow flex items-center justify-center my-4 relative">
                  <img
                    key={displayImage}
                    src={displayImage}
                    alt={`${product.name} - ${selectedColorName || 'Standard'}`}
                    className="object-contain w-full h-full max-h-72 drop-shadow-xl animate-in fade-in duration-300"
                  />
                </div>
                
                {/* Color Variants */}
                {colorVariants.length > 0 ? (
                  <div className="mt-auto flex flex-col items-center">
                    <p className="text-xs text-gray-400 font-medium mb-1">
                      Available in {colorVariants.length} finishes
                    </p>
                    <p className="text-sm font-bold text-gray-800 mb-3 transition-all">
                      {selectedVariants['color'] || 'Select a finish'}
                    </p>
                    <div className="flex gap-3 justify-center">
                      {colorVariants.map(v => {
                          let swatchColor = '#e2e4e6';
                          if(v.name.includes('Black') || v.name.includes('Midnight')) swatchColor = '#3b3b40';
                          if(v.name.includes('Blue')) swatchColor = '#2c3e50';
                          if(v.name.includes('Natural')) swatchColor = '#b5b2a8';
                          if(v.name.includes('Violet')) swatchColor = '#5b4c6e';
                          
                          return (
                            <button
                              key={v.id}
                              onClick={() => setSelectedVariants({...selectedVariants, ['color']: v.name})}
                              title={v.name}
                              className={`w-5 h-5 rounded-full transition-all duration-200 ${
                                selectedVariants['color'] === v.name ? 'ring-2 ring-offset-2 ring-gray-400' : 'ring-1 ring-black/10'
                              }`}
                              style={{backgroundColor: swatchColor}}
                            />
                          )
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="mt-auto flex justify-center pb-4">
                    <p className="text-xs text-gray-400 font-medium">Standard Finish</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Pricing & EMI */}
            <div className="w-full lg:w-7/12 py-2 flex flex-col h-full">
              <div className="mb-4">
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-[28px] font-bold text-gray-900 leading-none transition-all">{formatCurrency(currentPrice)}</span>
                </div>
                <div className="text-sm text-gray-500 line-through font-medium mb-3 transition-all">
                  {formatCurrency(currentMrp)}
                </div>
                <div className="text-gray-600 font-medium text-[15px]">
                  EMI plans backed by mutual funds
                </div>
              </div>

              <div className="flex-grow space-y-3 mb-8 pr-2">
                {product.emiPlans.map((plan) => {
                  const isSelected = selectedPlan === plan.id;
                  const dynamicMonthly = Math.round(plan.monthlyAmount * priceRatio);
                  // Round cashback to the nearest 500 so it looks like a realistic flat discount
                  const dynamicCashback = plan.cashback ? Math.round((plan.cashback * priceRatio) / 500) * 500 : null;

                  return (
                    <div 
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`group relative bg-white border rounded-2xl p-4 cursor-pointer transition-all duration-200 ${
                        isSelected 
                        ? 'border-gray-900 ring-1 ring-gray-900 shadow-sm' 
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-gray-900 text-[15px] mb-1 transition-all">
                            {formatCurrency(dynamicMonthly)} x {plan.tenure} months
                          </div>
                          {dynamicCashback && (
                            <div className="text-[#00a65a] text-xs font-semibold transition-all">
                              Additional cashback of {formatCurrency(dynamicCashback)}
                            </div>
                          )}
                        </div>
                        <div className={`text-[14px] font-semibold ${plan.interestRate === 0 ? 'text-gray-700' : 'text-orange-600'}`}>
                          {plan.interestRate}% interest
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100 flex gap-3">
                <button 
                  className={`flex-1 py-4 rounded-xl font-bold text-[15px] transition-all flex items-center justify-center gap-2 border-2 ${
                      selectedPlan 
                      ? 'border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300' 
                      : 'border-gray-100 text-gray-300 cursor-not-allowed'
                  }`}
                  disabled={!selectedPlan}
                  onClick={() => {
                    const plan = product.emiPlans.find(p=>p.id === selectedPlan);
                    const item = {
                      id: product.id,
                      name: product.name,
                      price: currentPrice,
                      image: displayImage,
                      variantInfo: Object.entries(selectedVariants).map(([k,v]) => v).join(', '),
                      emiPlan: plan ? { tenure: plan.tenure, monthly: Math.round(plan.monthlyAmount * priceRatio) } : null
                    };
                    const saved = JSON.parse(localStorage.getItem('1fi_cart') || '[]');
                    localStorage.setItem('1fi_cart', JSON.stringify([...saved, item]));
                    window.dispatchEvent(new Event('cart-updated'));
                    toast.success('Added to Cart!');
                  }}
                >
                  Add to Cart
                </button>
                <button 
                  className={`flex-[2] py-4 rounded-xl font-bold text-[15px] transition-all flex items-center justify-center gap-2 ${
                      selectedPlan 
                      ? 'bg-[#5B21B6] hover:bg-purple-800 text-white shadow-md' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!selectedPlan}
                  onClick={handleProceed}
                >
                  Proceed to Pay {selectedPlan ? formatCurrency(Math.round((product.emiPlans.find(p=>p.id === selectedPlan)?.monthlyAmount || 0) * priceRatio)) + '/mo' : ''}
                </button>
              </div>
            </div>
            
          </div>
        </div>

      {/* Simulated Checkout Modal */}
      {isCheckingOut && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-200">
            {checkoutStep === 1 ? (
              <>
                <Loader2 className="w-16 h-16 text-[#6B21A8] animate-spin mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Processing...</h3>
                <p className="text-gray-500">Securely setting up your 1Fi EMI plan backed by mutual funds.</p>
              </>
            ) : (
              <>
                <CheckCircle className="w-20 h-20 text-green-500 mb-6 animate-bounce" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
                <p className="text-gray-500">Your EMI has been approved instantly.</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
