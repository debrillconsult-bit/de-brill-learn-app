import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { Button } from '@/src/components/Button';
import { Shield, CreditCard, Building2, Smartphone, Check } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const PaymentScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan') || 'mep';

  const [selectedMethod, setSelectedMethod] = React.useState('paystack');
  const [promoCode, setPromoCode] = React.useState('');
  const [showPromo, setShowPromo] = React.useState(false);

  const isSeriesPlan = plan === 'phonics' || plan === 'mep';
  const planTitle = isSeriesPlan
    ? (plan === 'mep' ? 'MEP Complete Series' : 'Blended Phonics Series')
    : 'Single Book Plan';
  const planPrice = isSeriesPlan
    ? (plan === 'mep' ? '₦14,000' : '₦6,500')
    : '₦3,500';
  const planPriceUSD = isSeriesPlan
    ? (plan === 'mep' ? '$11' : '$5')
    : '$3';

  const methods = [
    { id: 'paystack', label: 'Paystack',               sub: 'Cards, bank transfer, USSD',       icon: CreditCard, badge: 'Recommended' },
    { id: 'card',     label: 'Credit / Debit Card',    sub: 'Visa, Mastercard, Verve',          icon: CreditCard, badge: null },
    { id: 'bank',     label: 'Bank Transfer',          sub: 'Direct bank payment',              icon: Building2,  badge: null },
    { id: 'mobile',   label: 'Apple Pay / Google Pay', sub: 'Available on supported devices',   icon: Smartphone, badge: null },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-brand-offwhite overflow-y-auto">
      <StatusBar />
      <DiagonalHeader title="Secure Payment" />

      {/* Order summary card */}
      <div className="mx-4 mt-4 bg-brand-navy rounded-[16px] p-5 text-white">
        <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">YOUR PLAN</span>
        <div className="flex items-end justify-between mt-2">
          <span className="text-[15px] font-bold">{planTitle}</span>
          <span className="text-[20px] font-bold text-brand-gold">{planPrice}</span>
        </div>
        <p className="text-[11px] text-white/60 text-right">{planPriceUSD} · billed yearly</p>
        <div className="border-t border-white/10 my-3" />
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-white/80">Free trial period: 7–30 days</span>
          <span className="bg-brand-gold/20 text-brand-gold text-[10px] font-bold px-2 py-0.5 rounded-full">
            No charge today
          </span>
        </div>
      </div>

      {/* Payment methods */}
      <div className="p-4 flex flex-col gap-4 pb-4">
        <h3 className="text-[12px] font-bold text-brand-gold uppercase tracking-wider px-1">PAYMENT METHOD</h3>

        <div className="bg-white rounded-[20px] border border-[#DDDDDD] overflow-hidden">
          {methods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className="w-full p-4 flex items-center gap-4 text-left border-b border-[#EEEEEE] last:border-none active:bg-brand-offwhite transition-colors"
            >
              <div className="w-10 h-10 rounded-[12px] bg-brand-navy/5 flex items-center justify-center shrink-0">
                <method.icon size={20} className="text-brand-navy" />
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-[14px] font-bold text-brand-navy">{method.label}</span>
                <span className="text-[11px] text-brand-muted">{method.sub}</span>
                {method.badge && (
                  <span className="bg-brand-gold text-brand-navy text-[9px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block self-start">
                    {method.badge}
                  </span>
                )}
              </div>
              {selectedMethod === method.id ? (
                <div className="w-5 h-5 rounded-full bg-brand-gold flex items-center justify-center shrink-0">
                  <Check size={12} className="text-brand-navy" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-[#DDDDDD] shrink-0" />
              )}
            </button>
          ))}
        </div>

        {/* Promo code */}
        <div className="px-1 flex flex-col">
          <button
            onClick={() => setShowPromo(!showPromo)}
            className="text-[12px] text-brand-navy font-bold underline text-left"
          >
            Have a promo code?
          </button>
          {showPromo && (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Enter code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 h-12 bg-white border border-[#CCCCCC] rounded-[8px] px-4 text-[14px] outline-none focus:border-brand-navy"
              />
              <button className="h-12 px-4 bg-brand-navy text-white rounded-[8px] font-bold text-[13px]">
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Security badge */}
        <div className="px-4 py-2 flex items-center justify-center gap-2">
          <Shield size={14} className="text-brand-muted" />
          <span className="text-[11px] text-brand-muted text-center">
            Secured by Paystack. We never store card details.
          </span>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="sticky bottom-0 bg-white border-t border-[#DDDDDD] p-6 pb-12 flex flex-col gap-3">
        <Button
          fullWidth
          onClick={() => navigate('/home-student')}
          // TODO: replace with real payment processing
        >
          Confirm &amp; Start Free Trial
        </Button>
        <p className="text-[10px] text-brand-muted leading-relaxed text-center px-4">
          By confirming, you agree to our Terms of Service. Your subscription renews annually. Cancel anytime before your trial ends.
        </p>
      </div>
    </div>
  );
};
