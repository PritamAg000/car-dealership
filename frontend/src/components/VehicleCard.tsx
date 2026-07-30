import React, { useState } from 'react';
import { Vehicle, ColorVariant } from '../types';
import { ShoppingBag, Edit3, Trash2, RefreshCw, Zap, Shield, Car, Truck, Palette, Check, Ban } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getVehicleColors } from '../utils/vehicleImage';
import { VehicleVisual } from './VehicleVisual';

interface VehicleCardProps {
  vehicle: Vehicle;
  onPurchase: (vehicle: Vehicle, selectedColor: ColorVariant) => void;
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

  // Load color variants for this vehicle with per-color stock calculation
  const rawColors = getVehicleColors(vehicle.make, vehicle.model, vehicle.category, vehicle.image_url);
  
  // If entire vehicle is out of stock (quantity = 0), force stock 0 for all colors
  const availableColors = rawColors.map((c) =>
    vehicle.quantity === 0 ? { ...c, stock: 0, isAvailable: false } : c
  );
  
  // Pick the first color with available stock
  const initialColor = availableColors.find(c => c.stock > 0) || availableColors[0];
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(initialColor);

  const isColorOutOfStock = selectedColor.stock === 0 || selectedColor.isAvailable === false;
  const isVehicleOutOfStock = vehicle.quantity === 0 || isColorOutOfStock;

  // Select category icon & badge styling
  const getCategoryDetails = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('ev') || cat.includes('electric')) {
      return {
        icon: Zap,
        badge: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300',
      };
    }
    if (cat.includes('suv')) {
      return {
        icon: Shield,
        badge: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
      };
    }
    if (cat.includes('truck')) {
      return {
        icon: Truck,
        badge: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
      };
    }
    if (cat.includes('coupe')) {
      return {
        icon: Car,
        badge: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300',
      };
    }
    return {
      icon: Car,
      badge: 'bg-purple-500/20 border-purple-500/40 text-purple-300',
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
        isColorOutOfStock ? 'opacity-85 border-slate-700/50' : 'border-luxury-border/40'
      }`}
    >
      {/* Real Vehicle Photo Header */}
      <div className="relative">
        <VehicleVisual
          colorHex={selectedColor.hex}
          colorName={selectedColor.name}
          photoUrl={selectedColor.image}
          make={vehicle.make}
          model={vehicle.model}
          category={vehicle.category}
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border backdrop-blur-md shadow-md ${details.badge}`}>
            <Icon className="w-3.5 h-3.5" />
            {vehicle.category}
          </span>
        </div>

        {/* Dynamic Per-Color Stock Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          {isColorOutOfStock ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-500/90 text-white border border-rose-400 uppercase tracking-wider shadow-lg backdrop-blur-md">
              0 Stock ({selectedColor.name.split(' ')[0]})
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider backdrop-blur-md shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {selectedColor.stock} Stock ({selectedColor.name.split(' ')[0]})
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

          {/* Color Swatch Picker Section with Stock Calculations */}
          <div className="mb-4 p-3 rounded-xl bg-luxury-dark/60 border border-luxury-border/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-luxury-muted flex items-center gap-1.5 font-medium">
                <Palette className="w-3.5 h-3.5 text-amber-400" /> Finish:
              </span>
              <span className="text-xs font-bold flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/40 shadow-sm"
                  style={{ backgroundColor: selectedColor.hex }}
                ></span>
                <span className="text-white">{selectedColor.name}</span>
                {selectedColor.stock > 0 ? (
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40">
                    {selectedColor.stock} Available
                  </span>
                ) : (
                  <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/40">
                    Out of Stock
                  </span>
                )}
              </span>
            </div>

            {/* Color Swatches with Stock Numbers */}
            <div className="flex items-center gap-2.5 pt-1">
              {availableColors.map((col) => {
                const isSelected = selectedColor.name === col.name;
                const hasStock = col.stock > 0;

                return (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col)}
                    title={`${col.name} (${hasStock ? `${col.stock} Units in Stock` : 'Out of Stock'})`}
                    className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center relative ${
                      isSelected
                        ? 'border-white scale-110 shadow-lg shadow-black/50 ring-2 ring-luxury-accent'
                        : hasStock
                        ? 'border-slate-500/60 opacity-90 hover:opacity-100 hover:scale-105'
                        : 'border-rose-500/40 opacity-40 hover:opacity-75 hover:scale-105 bg-slate-900'
                    }`}
                    style={{ backgroundColor: col.hex }}
                  >
                    {isSelected && hasStock && (
                      <Check className={`w-3.5 h-3.5 stroke-[3] ${col.hex === '#FFFFFF' || col.hex === '#F8FAFC' ? 'text-black' : 'text-white'}`} />
                    )}
                    {!hasStock && (
                      <Ban className="w-3.5 h-3.5 text-rose-400 stroke-[2.5]" />
                    )}
                  </button>
                );
              })}
            </div>
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
              onClick={() => onPurchase(vehicle, selectedColor)}
              disabled={isVehicleOutOfStock || isPurchasing}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
                isVehicleOutOfStock
                  ? 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-luxury-gold to-luxury-accent text-luxury-dark hover:brightness-110 active:scale-[0.98]'
              }`}
            >
              {isPurchasing ? (
                <div className="w-5 h-5 border-2 border-luxury-dark border-t-transparent rounded-full animate-spin"></div>
              ) : isColorOutOfStock ? (
                <>
                  <Ban className="w-4 h-4 text-rose-400" />
                  <span>Out of Stock ({selectedColor.name.split(' ')[0]})</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                  <span>Purchase in {selectedColor.name.split(' ')[0]} ({selectedColor.stock} Left)</span>
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
