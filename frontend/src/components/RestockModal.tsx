import React, { useState } from 'react';
import { X, RefreshCw } from 'lucide-react';
import { Vehicle } from '../types';

interface RestockModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onRestock: (vehicleId: string, quantity: number) => Promise<void>;
}

export const RestockModal: React.FC<RestockModalProps> = ({
  vehicle,
  isOpen,
  onClose,
  onRestock,
}) => {
  const [quantity, setQuantity] = useState('5');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !vehicle) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      setError('Restock quantity must be a positive integer.');
      return;
    }

    try {
      setSubmitting(true);
      await onRestock(vehicle.id, qty);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to restock vehicle.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel w-full max-w-md rounded-2xl border border-luxury-border/60 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-luxury-border/40 bg-luxury-card/50">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-emerald-400" />
            <span>Restock Vehicle Stock</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-luxury-muted hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-sm">
              {error}
            </div>
          )}

          <div className="p-4 rounded-xl bg-luxury-dark/60 border border-luxury-border/40 text-sm">
            <div className="text-luxury-accent font-semibold">{vehicle.make}</div>
            <div className="text-white font-bold text-base">{vehicle.model}</div>
            <div className="text-luxury-muted text-xs mt-1">Current Stock: {vehicle.quantity}</div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-luxury-muted uppercase tracking-wider mb-1.5">
              Add Quantity *
            </label>
            <input
              type="number"
              required
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-luxury-dark/80 border border-luxury-border/60 text-white text-sm focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-luxury-border/40">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-luxury-dark/60 hover:bg-slate-700/50 text-luxury-muted hover:text-white border border-luxury-border/40 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-luxury-dark font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-luxury-dark border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>Confirm Restock</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
