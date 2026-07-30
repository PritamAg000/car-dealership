import { ColorVariant } from '../types';

export const getVehicleColors = (make: string, model: string, category: string): ColorVariant[] => {
  const full = `${make} ${model}`.toLowerCase();

  if (full.includes('tesla') || full.includes('model s')) {
    return [
      { name: 'Stealth Metallic Cyan', hex: '#06B6D4', image: '/images/tesla.jpg' },
      { name: 'Obsidian Black', hex: '#1E293B', image: '/images/sedan.jpg' },
      { name: 'Pearl White Multi-Coat', hex: '#F8FAFC', image: '/images/ev.jpg' },
      { name: 'Ultra Red Metallic', hex: '#DC2626', image: '/images/coupe.jpg' },
    ];
  }

  if (full.includes('911') || full.includes('gt3')) {
    return [
      { name: 'Sunset Amber Gold', hex: '#F59E0B', image: '/images/porsche911.jpg' },
      { name: 'Carmine Red', hex: '#B91C1C', image: '/images/coupe.jpg' },
      { name: 'Shark Blue', hex: '#2563EB', image: '/images/taycan.jpg' },
      { name: 'Chalk Grey', hex: '#94A3B8', image: '/images/audi.jpg' },
    ];
  }

  if (full.includes('m5') || full.includes('bmw')) {
    return [
      { name: 'Marina Bay Blue', hex: '#1D4ED8', image: '/images/bmwm5.jpg' },
      { name: 'Black Sapphire', hex: '#0F172A', image: '/images/sedan.jpg' },
      { name: 'Alpine White', hex: '#F1F5F9', image: '/images/ev.jpg' },
      { name: 'Isle of Man Green', hex: '#047857', image: '/images/suv.jpg' },
    ];
  }

  if (full.includes('taycan')) {
    return [
      { name: 'Frozen Metallic Blue', hex: '#38BDF8', image: '/images/taycan.jpg' },
      { name: 'Gentian Blue', hex: '#1E40AF', image: '/images/bmwm5.jpg' },
      { name: 'Carrera White', hex: '#FFFFFF', image: '/images/ev.jpg' },
      { name: 'Crayon Grey', hex: '#64748B', image: '/images/audi.jpg' },
    ];
  }

  if (full.includes('mercedes') || full.includes('s-class') || full.includes('s580')) {
    return [
      { name: 'Obsidian Black Metallic', hex: '#090D16', image: '/images/sedan.jpg' },
      { name: 'Diamond White', hex: '#F8FAFC', image: '/images/ev.jpg' },
      { name: 'Selenite Grey', hex: '#475569', image: '/images/audi.jpg' },
      { name: 'Nautical Blue', hex: '#1E3A8A', image: '/images/bmwm5.jpg' },
    ];
  }

  if (full.includes('range rover') || full.includes('autobiography')) {
    return [
      { name: 'Carpathian Grey', hex: '#334155', image: '/images/suv.jpg' },
      { name: 'Santorini Black', hex: '#020617', image: '/images/sedan.jpg' },
      { name: 'Fuji White', hex: '#F8FAFC', image: '/images/ev.jpg' },
      { name: 'Batumi Gold', hex: '#D97706', image: '/images/porsche911.jpg' },
    ];
  }

  if (full.includes('f-150') || full.includes('lightning') || full.includes('ford')) {
    return [
      { name: 'Cyber Silver Metallic', hex: '#94A3B8', image: '/images/truck.jpg' },
      { name: 'Agate Black', hex: '#0F172A', image: '/images/sedan.jpg' },
      { name: 'Atlas Blue', hex: '#1D4ED8', image: '/images/bmwm5.jpg' },
      { name: 'Rapid Red', hex: '#C2410C', image: '/images/coupe.jpg' },
    ];
  }

  if (full.includes('rivian') || full.includes('r1t')) {
    return [
      { name: 'Compass Yellow Metallic', hex: '#EAB308', image: '/images/truck.jpg' },
      { name: 'Rivian Blue', hex: '#0284C7', image: '/images/taycan.jpg' },
      { name: 'Glacier White', hex: '#FFFFFF', image: '/images/ev.jpg' },
      { name: 'Midnight Black', hex: '#1E293B', image: '/images/sedan.jpg' },
    ];
  }

  if (full.includes('audi') || full.includes('rs q8')) {
    return [
      { name: 'Nardo Grey Metallic', hex: '#64748B', image: '/images/suv.jpg' },
      { name: 'Mythos Black', hex: '#090D16', image: '/images/sedan.jpg' },
      { name: 'Matador Red', hex: '#991B1B', image: '/images/coupe.jpg' },
      { name: 'Navarra Blue', hex: '#1D4ED8', image: '/images/bmwm5.jpg' },
    ];
  }

  // Fallback defaults
  return [
    { name: 'Midnight Metallic Navy', hex: '#1E3A8A', image: '/images/sedan.jpg' },
    { name: 'Obsidian Black', hex: '#090D16', image: '/images/sedan.jpg' },
    { name: 'Alpine White', hex: '#FFFFFF', image: '/images/ev.jpg' },
    { name: 'Sunset Amber Gold', hex: '#F59E0B', image: '/images/porsche911.jpg' },
  ];
};

export const getVehicleImage = (make: string, model: string, category: string): string => {
  const colors = getVehicleColors(make, model, category);
  return colors[0].image;
};
