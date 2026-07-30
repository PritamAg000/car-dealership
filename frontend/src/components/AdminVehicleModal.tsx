import React, { useState, useEffect } from 'react';
import { X, Car, DollarSign, Layers, Palette, Hash, Save, Image as ImageIcon } from 'lucide-react';
import { Vehicle, VehicleCreate } from '../types';

interface AdminVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vehicleData: VehicleCreate) => Promise<void>;
  vehicleToEdit: Vehicle | null;
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
  const [color, setColor] = useState('Obsidian Black');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [quantity, setQuantity] = useState<number | ''>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (vehicleToEdit) {
      setMake(vehicleToEdit.make);
      setModel(vehicleToEdit.model);
      setCategory(vehicleToEdit.category);
      setColor(vehicleToEdit.color || 'Obsidian Black');
      setImageUrl(vehicleToEdit.image_url || '');
      setPrice(vehicleToEdit.price);
      setQuantity(vehicleToEdit.quantity);
    } else {
      setMake('');
      setModel('');
      setCategory('sedan');
      setColor('Stealth Metallic Cyan');
      setImageUrl('');
      setPrice('');
      setQuantity(1);
    }
    setError(null);
  }, [vehicleToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!make || !model || price === '' || quantity === '') {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await onSave({
        make,
        model,
        category,
        color,
        image_url: imageUrl,
        price: Number(price),
        quantity: Number(quantity),
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save vehicle.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-lg rounded-3xl border border-luxury-accent/40 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-luxury-dark to-slate-950 px-6 py-5 border-b border-luxury-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-luxury-accent/20 border border-luxury-accent/40 flex items-center justify-center text-luxury-accent shadow-md">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-luxury-accent font-bold">
                Admin Management
              </div>
              <h2 className="text-xl font-extrabold text-white tracking-tight font-sans">
                {vehicleToEdit ? 'Edit Vehicle Details' : 'Add New Luxury Vehicle'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 rounded-xl text-luxury-muted hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-semibold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-luxury-muted mb-1 uppercase tracking-wider">
                Manufacturer / Make *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Tesla, Porsche, BMW"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-luxury-border/50 text-white text-sm focus:outline-none focus:border-luxury-accent placeholder-slate-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-luxury-muted mb-1 uppercase tracking-wider">
                Vehicle Model *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Model S Plaid, 911 GT3"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-luxury-border/50 text-white text-sm focus:outline-none focus:border-luxury-accent placeholder-slate-600"
              />
            </div>
          </div>

          {/* Photo URL & Live Preview Section */}
          <div>
            <label className="block font-semibold text-luxury-muted mb-1 uppercase tracking-wider flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-cyan-400" /> Vehicle Photo Image URL / Asset Path
            </label>
            <input
              type="text"
              placeholder="e.g. /images/tesla.jpg or https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-luxury-border/50 text-white text-sm focus:outline-none focus:border-luxury-accent placeholder-slate-600"
            />
            {imageUrl && (
              <div className="mt-2 h-24 rounded-xl overflow-hidden relative border border-luxury-border/40 bg-slate-950">
                <img
                  src={imageUrl}
                  alt="Vehicle Preview"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-luxury-muted mb-1 uppercase tracking-wider flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-luxury-accent" /> Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-luxury-border/50 text-white text-sm focus:outline-none focus:border-luxury-accent"
              >
                <option value="sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="truck">Truck / Pickup</option>
                <option value="EV">EV / Electric</option>
                <option value="coupe">Coupe / Sports</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-luxury-muted mb-1 uppercase tracking-wider flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-amber-400" /> Paint Color Finish
              </label>
              <input
                type="text"
                placeholder="e.g. Stealth Cyan, Red, White"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-luxury-border/50 text-white text-sm focus:outline-none focus:border-luxury-accent placeholder-slate-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-luxury-muted mb-1 uppercase tracking-wider flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Price ($ USD) *
              </label>
              <input
                type="number"
                min="1"
                required
                placeholder="e.g. 135000"
                value={price}
                onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-luxury-border/50 text-white text-sm font-mono focus:outline-none focus:border-luxury-accent placeholder-slate-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-luxury-muted mb-1 uppercase tracking-wider flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-cyan-400" /> Stock Count (No. Available) *
              </label>
              <input
                type="number"
                min="0"
                required
                placeholder="e.g. 5"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-luxury-border/50 text-white text-sm font-mono focus:outline-none focus:border-luxury-accent placeholder-slate-600"
              />
            </div>
          </div>

          {/* Action Save Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-luxury-gold to-luxury-accent text-luxury-dark font-extrabold text-sm hover:brightness-110 active:scale-[0.99] transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-luxury-dark border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{vehicleToEdit ? 'Save Changes' : 'Create & Add Vehicle'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
