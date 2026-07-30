import React, { useState, useEffect } from 'react';
import { X, Plus, Save } from 'lucide-react';
import { Vehicle, VehicleCreate } from '../types';

interface AdminVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vehicle: VehicleCreate) => Promise<void>;
  vehicleToEdit?: Vehicle | null;
}

export const AdminVehicleModal: React.FC<AdminVehicleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  vehicleToEdit,
}) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [category, setCategory] = useState('sedan');
  const [color, setColor] = useState('Midnight Metallic Navy');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (vehicleToEdit) {
      setMake(vehicleToEdit.make);
      setModel(vehicleToEdit.model);
      setCategory(vehicleToEdit.category);
      setColor(vehicleToEdit.color || 'Midnight Metallic Navy');
      setPrice(vehicleToEdit.price.toString());
      setQuantity(vehicleToEdit.quantity.toString());
    } else {
      setMake('');
      setModel('');
      setCategory('sedan');
      setColor('Midnight Metallic Navy');
      setPrice('');
      setQuantity('1');
    }
    setError(null);
  }, [vehicleToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!make.trim() || !model.trim() || !category.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    const numPrice = parseFloat(price);
    const numQty = parseInt(quantity, 10);

    if (isNaN(numPrice) || numPrice < 0) {
      setError('Price must be a valid non-negative number.');
      return;
    }

    if (isNaN(numQty) || numQty < 0) {
      setError('Quantity must be a non-negative integer.');
      return;
    }

    try {
      setSubmitting(true);
      await onSave({
        make: make.trim(),
        model: model.trim(),
        category: category.trim(),
        color: color.trim() || 'Midnight Metallic Navy',
        price: numPrice,
        quantity: numQty,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save vehicle.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel w-full max-w-lg rounded-2xl border border-luxury-border/60 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-luxury-border/40 bg-luxury-card/50">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            {vehicleToEdit ? <Save className="w-5 h-5 text-luxury-accent" /> : <Plus className="w-5 h-5 text-luxury-accent" />}
            <span>{vehicleToEdit ? 'Edit Vehicle' : 'Add New Vehicle'}</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-luxury-muted hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-luxury-muted uppercase tracking-wider mb-1.5">
                Make *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Porsche"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-luxury-dark/80 border border-luxury-border/60 text-white text-sm focus:outline-none focus:border-luxury-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-luxury-muted uppercase tracking-wider mb-1.5">
                Model *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 911 GT3"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-luxury-dark/80 border border-luxury-border/60 text-white text-sm focus:outline-none focus:border-luxury-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-luxury-muted uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-luxury-dark/80 border border-luxury-border/60 text-white text-sm focus:outline-none focus:border-luxury-accent cursor-pointer"
              >
                <option value="sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="truck">Truck</option>
                <option value="EV">EV</option>
                <option value="coupe">Coupe</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-luxury-muted uppercase tracking-wider mb-1.5">
                Exterior Color
              </label>
              <input
                type="text"
                placeholder="e.g. Sunset Amber Gold"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-luxury-dark/80 border border-luxury-border/60 text-white text-sm focus:outline-none focus:border-luxury-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-luxury-muted uppercase tracking-wider mb-1.5">
                Price ($) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="any"
                placeholder="120000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-luxury-dark/80 border border-luxury-border/60 text-white text-sm focus:outline-none focus:border-luxury-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-luxury-muted uppercase tracking-wider mb-1.5">
                Quantity *
              </label>
              <input
                type="number"
                required
                min="0"
                placeholder="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-luxury-dark/80 border border-luxury-border/60 text-white text-sm focus:outline-none focus:border-luxury-accent"
              />
            </div>
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
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-luxury-gold to-luxury-accent text-luxury-dark font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-2"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-luxury-dark border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>{vehicleToEdit ? 'Update Vehicle' : 'Add Vehicle'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
