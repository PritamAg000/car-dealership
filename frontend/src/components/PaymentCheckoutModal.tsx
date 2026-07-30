import React, { useState } from 'react';
import { X, CreditCard, Building2, Wallet, ShieldCheck, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Vehicle, ColorVariant, PaymentDetails } from '../types';

interface PaymentCheckoutModalProps {
  vehicle: Vehicle | null;
  selectedColor: ColorVariant | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmPayment: (paymentData: PaymentDetails) => Promise<void>;
  isProcessing: boolean;
}

export const PaymentCheckoutModal: React.FC<PaymentCheckoutModalProps> = ({
  vehicle,
  selectedColor,
  isOpen,
  onClose,
  onConfirmPayment,
  isProcessing,
}) => {
  if (!isOpen || !vehicle || !selectedColor) return null;

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'crypto'>('card');
  
  // Card form state (starts blank for user entry)
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  // Address state (starts blank for user entry)
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(vehicle.price);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onConfirmPayment({
      method: paymentMethod,
      cardName,
      cardNumber,
      expiry,
      cvc,
      streetAddress,
      city,
      state,
      zip,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-2xl rounded-3xl border border-luxury-accent/40 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-luxury-dark to-slate-950 px-8 py-5 border-b border-luxury-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-luxury-gold/20 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-luxury-accent font-bold">
                Secure Checkout & Reservation
              </div>
              <h2 className="text-xl font-extrabold text-white tracking-tight font-sans">
                Payment Method & Order Authorization
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-2 rounded-xl text-luxury-muted hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6 flex-1">
          {/* Order Item Summary Header */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-luxury-card/60 border border-luxury-border/40">
            <div className="flex items-center gap-4">
              <img
                src={selectedColor.image}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-16 h-12 object-cover rounded-lg border border-white/10"
              />
              <div>
                <div className="text-xs font-bold text-luxury-accent uppercase tracking-wider">{vehicle.make}</div>
                <div className="text-base font-bold text-white">{vehicle.model}</div>
                <div className="text-xs text-luxury-muted">Finish: <span className="text-amber-300 font-semibold">{selectedColor.name}</span></div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-luxury-muted uppercase font-medium">Total Amount</div>
              <div className="text-xl font-black text-white font-sans">{formattedPrice}</div>
            </div>
          </div>

          {/* Payment Method Selector Tabs */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-muted mb-2">
              Select Payment Option
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-3 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-luxury-gold/20 border-luxury-gold text-luxury-gold shadow-md'
                    : 'bg-luxury-dark/60 border-luxury-border/40 text-slate-300 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Credit / Debit</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bank')}
                className={`py-3 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  paymentMethod === 'bank'
                    ? 'bg-luxury-gold/20 border-luxury-gold text-luxury-gold shadow-md'
                    : 'bg-luxury-dark/60 border-luxury-border/40 text-slate-300 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Bank Wire</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('crypto')}
                className={`py-3 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  paymentMethod === 'crypto'
                    ? 'bg-luxury-gold/20 border-luxury-gold text-luxury-gold shadow-md'
                    : 'bg-luxury-dark/60 border-luxury-border/40 text-slate-300 hover:text-white'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>Crypto (BTC)</span>
              </button>
            </div>
          </div>

          {/* Conditional Form Fields based on Payment Method */}
          {paymentMethod === 'card' && (
            <div className="space-y-4 p-4 rounded-2xl bg-luxury-dark/70 border border-luxury-border/40 animate-fadeIn">
              <div>
                <label className="block text-xs font-semibold text-luxury-muted mb-1">Cardholder Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Mercer"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-luxury-border/50 text-white text-sm focus:outline-none focus:border-luxury-accent placeholder-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-luxury-muted mb-1">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="4532 •••• •••• 8899"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-luxury-border/50 text-white text-sm font-mono focus:outline-none focus:border-luxury-accent placeholder-slate-600"
                  />
                  <CreditCard className="w-4 h-4 text-luxury-muted absolute right-3.5 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-luxury-muted mb-1">Expiration (MM/YY)</label>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-luxury-border/50 text-white text-sm font-mono focus:outline-none focus:border-luxury-accent placeholder-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-luxury-muted mb-1">Security Code (CVC)</label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    placeholder="CVC"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-luxury-border/50 text-white text-sm font-mono focus:outline-none focus:border-luxury-accent placeholder-slate-600"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'bank' && (
            <div className="p-5 rounded-2xl bg-luxury-dark/70 border border-luxury-border/40 space-y-3 text-xs animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-luxury-border/30">
                <span className="text-luxury-muted">Bank Name:</span>
                <span className="font-bold text-white">JPMorgan Chase Bank, N.A.</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-luxury-border/30">
                <span className="text-luxury-muted">Account Name:</span>
                <span className="font-bold text-white">Apex Luxury Motors Inc. Escrow</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-luxury-border/30">
                <span className="text-luxury-muted">Routing Number (ABA):</span>
                <span className="font-mono font-bold text-amber-300">021000021</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-luxury-muted">Escrow Reference ID:</span>
                <span className="font-mono font-bold text-emerald-400">APX-ESCROW-2026</span>
              </div>
            </div>
          )}

          {paymentMethod === 'crypto' && (
            <div className="p-5 rounded-2xl bg-luxury-dark/70 border border-luxury-border/40 text-center space-y-3 animate-fadeIn">
              <div className="text-xs text-luxury-muted">Send exact BTC amount to Escrow Wallet:</div>
              <div className="p-3 rounded-xl bg-slate-900 border border-luxury-border/50 font-mono text-xs font-bold text-amber-300 break-all select-all">
                bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Instant Zero-Confirmation Guarantee Enabled
              </div>
            </div>
          )}

          {/* Delivery Address Form */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-muted">
              Delivery & Title Registration Address
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="sm:col-span-3">
                <input
                  type="text"
                  placeholder="Street Address (e.g. 742 Evergreen Terrace)"
                  required
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-luxury-border/50 text-white text-xs focus:outline-none focus:border-luxury-accent placeholder-slate-600"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-luxury-border/50 text-white text-xs focus:outline-none focus:border-luxury-accent placeholder-slate-600"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="State"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-luxury-border/50 text-white text-xs focus:outline-none focus:border-luxury-accent placeholder-slate-600"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="ZIP Code"
                  required
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-luxury-border/50 text-white text-xs focus:outline-none focus:border-luxury-accent placeholder-slate-600"
                />
              </div>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>256-Bit Bank Level Encryption & Escrow Protection</span>
            </div>
          </div>

          {/* Action Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-luxury-gold to-luxury-accent text-luxury-dark font-extrabold text-base hover:brightness-110 active:scale-[0.99] transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-luxury-dark border-t-transparent rounded-full animate-spin"></div>
                <span>Authorizing & Verifying Escrow Funds...</span>
              </div>
            ) : (
              <>
                <span>Authorize & Complete Purchase ({formattedPrice})</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
