import React from 'react';
import { X, CheckCircle2, Shield, Calendar, Truck, Award, Palette, Hash } from 'lucide-react';
import { PurchaseReceipt } from '../types';

interface PurchaseReceiptModalProps {
  receipt: PurchaseReceipt | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PurchaseReceiptModal: React.FC<PurchaseReceiptModalProps> = ({
  receipt,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !receipt) return null;

  const { vehicle, selectedColor, selectedImage, selectedFilter, orderId, buyerEmail, purchaseDate, deliveryDate, warranty, specifications } = receipt;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(vehicle.price);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-2xl rounded-3xl border border-luxury-accent/40 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-luxury-dark px-8 py-6 border-b border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                Order Confirmed & Reserved
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight font-sans">
                Purchase Order Details
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-luxury-muted hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 overflow-y-auto space-y-6">
          {/* Order ID & Buyer Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-luxury-dark/90 border border-luxury-border/50 text-xs">
            <div className="flex items-center gap-2 text-luxury-muted">
              <Hash className="w-4 h-4 text-luxury-accent" />
              <span>Order ID:</span>
              <span className="font-mono font-bold text-white text-sm">{orderId}</span>
            </div>
            <div className="flex items-center gap-2 text-luxury-muted">
              <Calendar className="w-4 h-4 text-luxury-accent" />
              <span>Date:</span>
              <span className="font-medium text-white">{purchaseDate}</span>
            </div>
            <div className="w-full sm:w-auto text-luxury-muted">
              Purchased by: <span className="font-semibold text-luxury-accent">{buyerEmail}</span>
            </div>
          </div>

          {/* Vehicle Visual Header & Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 items-center rounded-2xl bg-luxury-card/60 p-5 border border-luxury-border/40">
            <div className="sm:col-span-2 h-44 rounded-xl overflow-hidden relative shadow-lg bg-slate-950">
              <img
                src={selectedImage}
                alt={`${vehicle.make} ${vehicle.model} in ${selectedColor}`}
                style={{ filter: selectedFilter || 'none' }}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 text-luxury-accent border border-luxury-accent/40 backdrop-blur-md">
                {vehicle.category}
              </div>
            </div>

            <div className="sm:col-span-3 space-y-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-luxury-accent font-bold">
                  {vehicle.make}
                </div>
                <h3 className="text-2xl font-bold text-white">{vehicle.model}</h3>
              </div>

              {/* Selected Color Badge */}
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-luxury-muted">Selected Finish:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 shadow-sm"></span>
                  {selectedColor}
                </span>
              </div>

              {/* Price Tag */}
              <div className="text-2xl font-black text-white font-sans pt-1">
                {formattedPrice}
              </div>
            </div>
          </div>

          {/* Performance & Warranty Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-luxury-dark/60 border border-luxury-border/40 space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-luxury-muted flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-luxury-accent" /> Powertrain
              </div>
              <div className="text-sm font-bold text-white">{specifications.drivetrain}</div>
            </div>

            <div className="p-4 rounded-2xl bg-luxury-dark/60 border border-luxury-border/40 space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-luxury-muted flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> Warranty Included
              </div>
              <div className="text-sm font-bold text-emerald-300">{warranty}</div>
            </div>

            <div className="p-4 rounded-2xl bg-luxury-dark/60 border border-luxury-border/40 space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-luxury-muted flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-cyan-400" /> Delivery Target
              </div>
              <div className="text-sm font-bold text-cyan-300">{deliveryDate}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-luxury-dark/90 border-t border-luxury-border/40 flex items-center justify-between">
          <div className="text-xs text-luxury-muted">
            Order confirmation sent to <span className="text-white font-medium">{buyerEmail}</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-luxury-gold to-luxury-accent text-luxury-dark font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-md"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
