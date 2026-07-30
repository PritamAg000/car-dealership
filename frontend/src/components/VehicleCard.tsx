import React, { useState } from 'react';
import { Vehicle } from '../types';
import { ShoppingBag, Edit3, Trash2, RefreshCw, Zap, Shield, Car, Truck, Palette } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface VehicleCardProps {
  vehicle: Vehicle;
  onPurchase: (vehicle: Vehicle) => void;
  onEdit?: (vehicle: Vehicle) => void;
  onDelete?: (vehicle: Vehicle) => void;
  onRestock?: (vehicle: Vehicle) => void;
  isPurchasing?: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onPurchase,
  onEdit,
  onDelete,
  onRestock,
  isPurchasing = false,
}) => {
  const { isAdmin } = useAuth();
  const isOutOfStock = vehicle.quantity === 0;
  const [imageError, setImageError] = useState(false);

  // Select category theme & image
  const getCategoryDetails = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('ev') || cat.includes('electric')) {
      return {
        icon: Zap,
        image: '/images/ev.jpg',
        badge: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300',
        text: 'text-cyan-400'
      };
    }
    if (cat.includes('suv')) {
      return {
        icon: Shield,
        image: '/images/suv.jpg',
        badge: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
        text: 'text-emerald-400'
      };
    }
    if (cat.includes('truck')) {
      return {
        icon: Truck,
        image: '/images/truck.jpg',
        badge: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
        text: 'text-amber-400'
      };
    }
    if (cat.includes('coupe')) {
      return {
        icon: Car,
        image: '/images/coupe.jpg',
        badge: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300',
        text: 'text-yellow-400'
      };
    }
    return {
      icon: Car,
      image: '/images/sedan.jpg',
      badge: 'bg-purple-500/20 border-purple-500/40 text-purple-300',
      text: 'text-purple-400'
    };
  };

  const details = getCategoryDetails(vehicle.category);
  const Icon = details.icon;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(vehicle.price);

  return (
    <div
      className={`glass-card rounded-2xl overflow-hidden flex flex-col justify-between group relative border ${
        isOutOfStock ? 'opacity-75 border-slate-700/50' : 'border-luxury-border/40'
      }`}
    >
      {/* Real Vehicle Photo Header */}
      <div className="h-52 w-full relative overflow-hidden bg-slate-900">
        {!imageError ? (
          <img
            src={details.image}
            alt={`${vehicle.make} ${vehicle.model}`}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-luxury-card to-slate-900 flex items-center justify-center">
            <Icon className={`w-20 h-20 ${details.text} opacity-30`} />
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-transparent to-black/40"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-md shadow-md ${details.badge}`}>
            <Icon className="w-3.5 h-3.5" />
            {vehicle.category}
          </span>
        </div>

        {/* Stock Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          {isOutOfStock ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-500/80 text-white border border-rose-400 uppercase tracking-wider shadow-lg backdrop-blur-md">
              Out of Stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider backdrop-blur-md shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {vehicle.quantity} In Stock
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-luxury-accent font-bold mb-1">
            {vehicle.make}
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-amber-200 transition-colors">
            {vehicle.model}
          </h2>

          {/* Color Tag */}
          <div className="flex items-center gap-1.5 text-xs text-luxury-muted mb-4">
            <Palette className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Color:</span>
            <span className="font-medium text-slate-200">{vehicle.color || 'Midnight Metallic Navy'}</span>
          </div>
        </div>

        <div>
          {/* Price Tag */}
          <div className="flex items-baseline justify-between pt-3 border-t border-luxury-border/30 mb-5">
            <span className="text-xs text-luxury-muted uppercase font-medium">Price</span>
            <span className="text-2xl font-extrabold text-white tracking-tight font-sans">
              {formattedPrice}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => onPurchase(vehicle)}
              disabled={isOutOfStock || isPurchasing}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
                isOutOfStock
                  ? 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-luxury-gold to-luxury-accent text-luxury-dark hover:brightness-110 active:scale-[0.98]'
              }`}
            >
              {isPurchasing ? (
                <div className="w-5 h-5 border-2 border-luxury-dark border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                  <span>{isOutOfStock ? 'Out of Stock' : 'Purchase Vehicle'}</span>
                </>
              )}
            </button>

            {/* Admin Controls */}
            {isAdmin && (
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-luxury-border/30">
                {onEdit && (
                  <button
                    onClick={() => onEdit(vehicle)}
                    className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-luxury-dark/80 hover:bg-slate-700/60 text-slate-300 hover:text-white border border-luxury-border/50 text-xs font-medium transition-colors"
                    title="Edit Vehicle"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                )}
                {onRestock && (
                  <button
                    onClick={() => onRestock(vehicle)}
                    className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-colors"
                    title="Restock Inventory"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Restock</span>
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(vehicle)}
                    className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 text-xs font-medium transition-colors"
                    title="Delete Vehicle"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
