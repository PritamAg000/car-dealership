import React from 'react';
import { LogOut, Car, Shield, User as UserIcon, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onAddVehicleClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAddVehicleClick }) => {
  const { user, isAdmin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-luxury-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-luxury-gold to-luxury-accent flex items-center justify-center shadow-lg shadow-luxury-accent/20">
            <Car className="w-6 h-6 text-luxury-dark stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white font-sans">
              APEX <span className="text-luxury-accent">MOTORS</span>
            </h1>
            <p className="text-xs text-luxury-muted tracking-wider uppercase">Luxury Inventory</p>
          </div>
        </div>

        {/* User Status & Controls */}
        <div className="flex items-center gap-4 sm:gap-6">
          {isAdmin && onAddVehicleClick && (
            <button
              onClick={onAddVehicleClick}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-luxury-gold to-luxury-accent text-luxury-dark font-semibold text-sm shadow-md hover:brightness-110 active:scale-95 transition-all duration-200"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Vehicle</span>
            </button>
          )}

          <div className="hidden md:flex items-center gap-3 px-3.5 py-2 rounded-xl bg-luxury-dark/60 border border-luxury-border/40">
            <div className="w-8 h-8 rounded-lg bg-luxury-card flex items-center justify-center text-luxury-accent">
              <UserIcon className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-medium text-white flex items-center gap-1.5">
                {user?.email}
                {isAdmin && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                    <Shield className="w-3 h-3" /> Admin
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-luxury-muted hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all text-sm font-medium"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
