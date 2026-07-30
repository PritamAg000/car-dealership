import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from '../components/Navbar';
import { VehicleCard } from '../components/VehicleCard';
import { SearchFilterBar } from '../components/SearchFilterBar';
import { AdminVehicleModal } from '../components/AdminVehicleModal';
import { RestockModal } from '../components/RestockModal';
import { PurchaseReceiptModal } from '../components/PurchaseReceiptModal';
import { Toast, ToastProps } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Vehicle, VehicleCreate, SearchFilters, PurchaseReceipt, ColorVariant } from '../types';
import { Car, AlertTriangle, Layers } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, token, isAdmin } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);

  // Modals state
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const [isRestockOpen, setIsRestockOpen] = useState(false);
  const [restockVehicle, setRestockVehicle] = useState<Vehicle | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Vehicle | null>(null);

  // Purchase Receipt Modal State
  const [receipt, setReceipt] = useState<PurchaseReceipt | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // Toast state
  const [toast, setToast] = useState<Omit<ToastProps, 'onClose'> | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const fetchVehicles = useCallback(
    async (filters: SearchFilters = {}) => {
      if (!token) return;
      try {
        setLoading(true);
        let data: Vehicle[];
        const hasFilters = Object.values(filters).some((v) => v !== undefined && v !== '');
        if (hasFilters) {
          data = await api.searchVehicles(token, filters);
        } else {
          data = await api.getVehicles(token, 1, 100);
        }
        setVehicles(data);

        // Update category list dynamically
        const uniqueCat = Array.from(new Set(data.map((v) => v.category))).filter(Boolean);
        setCategories((prev) => Array.from(new Set([...prev, ...uniqueCat, 'sedan', 'SUV', 'truck', 'EV', 'coupe'])));
      } catch (err: any) {
        showToast(err.message || 'Failed to load vehicles.', 'error');
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  // Purchase Handler with Selected Color Support & Receipt Modal
  const handlePurchase = async (vehicle: Vehicle, selectedColor: ColorVariant) => {
    if (!token) return;
    try {
      setPurchasingId(vehicle.id);
      const updated = await api.purchaseVehicle(token, vehicle.id, 1);

      // Immediate UI update
      setVehicles((prev) => prev.map((v) => (v.id === vehicle.id ? updated : v)));

      // Construct detailed purchase receipt with selected color & image
      const receiptData: PurchaseReceipt = {
        orderId: `APX-${Math.floor(100000 + Math.random() * 900000)}`,
        vehicle: updated,
        selectedColor: selectedColor.name,
        selectedImage: selectedColor.image,
        buyerEmail: user?.email || 'customer@dealership.com',
        purchaseDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        deliveryDate: '3-5 Business Days (Express Delivery)',
        warranty: '4-Year / 50,000-Mile Luxury Warranty',
        specifications: {
          drivetrain: updated.category === 'EV' ? 'Dual-Motor AWD Electric' : '4.4L Twin-Turbo V8 AWD',
          engine: updated.category === 'EV' ? '1,020 HP High Performance' : '617 HP Gas Engine',
          acceleration: updated.category === 'EV' ? '0-60 mph in 1.99s' : '0-60 mph in 3.1s',
        },
      };

      setReceipt(receiptData);
      setIsReceiptOpen(true);
      showToast(`Successfully purchased ${vehicle.make} ${vehicle.model} in ${selectedColor.name}!`, 'success');
    } catch (err: any) {
      showToast(err.message || 'Purchase failed.', 'error');
      fetchVehicles();
    } finally {
      setPurchasingId(null);
    }
  };

  // Admin Add / Edit Handler
  const handleSaveVehicle = async (vehicleData: VehicleCreate) => {
    if (!token) return;
    if (editingVehicle) {
      const updated = await api.updateVehicle(token, editingVehicle.id, vehicleData);
      setVehicles((prev) => prev.map((v) => (v.id === editingVehicle.id ? updated : v)));
      showToast(`Updated ${updated.make} ${updated.model}`, 'success');
    } else {
      const created = await api.createVehicle(token, vehicleData);
      setVehicles((prev) => [created, ...prev]);
      showToast(`Added ${created.make} ${created.model}`, 'success');
    }
  };

  // Admin Delete Handler
  const confirmDelete = async () => {
    if (!token || !deleteTarget) return;
    try {
      await api.deleteVehicle(token, deleteTarget.id);
      setVehicles((prev) => prev.filter((v) => v.id !== deleteTarget.id));
      showToast(`Deleted ${deleteTarget.make} ${deleteTarget.model}`, 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete vehicle.', 'error');
    } finally {
      setDeleteTarget(null);
    }
  };

  // Admin Restock Handler
  const handleRestock = async (vehicleId: string, quantity: number) => {
    if (!token) return;
    const updated = await api.restockVehicle(token, vehicleId, quantity);
    setVehicles((prev) => prev.map((v) => (v.id === vehicleId ? updated : v)));
    showToast(`Restocked ${updated.make} ${updated.model} (+${quantity})`, 'success');
  };

  return (
    <div className="min-h-screen bg-luxury-dark pb-20">
      <Navbar
        onAddVehicleClick={() => {
          setEditingVehicle(null);
          setIsAddEditOpen(true);
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Banner Section */}
        <div className="relative rounded-3xl p-8 mb-8 overflow-hidden bg-gradient-to-r from-luxury-card via-luxury-dark to-slate-900 border border-luxury-border/50 shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-luxury-accent/10 border border-luxury-accent/30 text-luxury-accent uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5" /> Exquisite Engineering
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              Discover Premier Inventory
            </h2>
            <p className="text-luxury-muted text-sm sm:text-base mt-2">
              Select your favorite exterior color finish, preview photos live, and reserve luxury vehicles in real-time.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <SearchFilterBar onSearch={fetchVehicles} categories={categories} />

        {/* Vehicle Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="glass-card rounded-2xl h-96 animate-pulse p-6 flex flex-col justify-between">
                <div className="h-40 bg-slate-800/60 rounded-xl"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-slate-800/60 rounded w-1/3"></div>
                  <div className="h-6 bg-slate-800/60 rounded w-2/3"></div>
                  <div className="h-10 bg-slate-800/60 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        ) : vehicles.length === 0 ? (
          <div className="glass-panel p-16 rounded-3xl text-center max-w-md mx-auto my-12 border border-luxury-border/40">
            <div className="w-16 h-16 rounded-2xl bg-luxury-card flex items-center justify-center mx-auto mb-4 text-luxury-muted">
              <Car className="w-8 h-8 opacity-50" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Vehicles Found</h3>
            <p className="text-luxury-muted text-sm">No vehicles match your current search filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((v) => (
              <VehicleCard
                key={v.id}
                vehicle={v}
                onPurchase={handlePurchase}
                onEdit={(veh) => {
                  setEditingVehicle(veh);
                  setIsAddEditOpen(true);
                }}
                onDelete={(veh) => setDeleteTarget(veh)}
                onRestock={(veh) => {
                  setRestockVehicle(veh);
                  setIsRestockOpen(true);
                }}
                isPurchasing={purchasingId === v.id}
              />
            ))}
          </div>
        )}
      </main>

      {/* Admin Add / Edit Modal */}
      <AdminVehicleModal
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        onSave={handleSaveVehicle}
        vehicleToEdit={editingVehicle}
      />

      {/* Admin Restock Modal */}
      <RestockModal
        isOpen={isRestockOpen}
        onClose={() => setIsRestockOpen(false)}
        vehicle={restockVehicle}
        onRestock={handleRestock}
      />

      {/* Post-Purchase Order Details Modal */}
      <PurchaseReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        receipt={receipt}
      />

      {/* Admin Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-rose-500/40 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400 mb-3">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-lg font-bold text-white">Confirm Delete Vehicle</h3>
            </div>
            <p className="text-slate-300 text-sm mb-6">
              Are you sure you want to delete <span className="font-bold text-white">{deleteTarget.make} {deleteTarget.model}</span>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl bg-luxury-dark/60 text-slate-300 hover:text-white border border-luxury-border/50 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold shadow-md transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Component */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};
