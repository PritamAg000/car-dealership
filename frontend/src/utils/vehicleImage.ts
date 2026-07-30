import { ColorVariant } from '../types';

export const getVehicleImage = (make: string, model: string, category: string): string => {
  const full = `${make} ${model}`.toLowerCase();

  if (full.includes('tesla') || full.includes('model s')) return '/images/tesla.jpg';
  if (full.includes('taycan')) return '/images/taycan.jpg';
  if (full.includes('911') || full.includes('gt3')) return '/images/porsche911.jpg';
  if (full.includes('m5') || full.includes('bmw')) return '/images/bmwm5.jpg';
  if (full.includes('mercedes') || full.includes('s-class') || full.includes('s580')) return '/images/sedan.jpg';
  if (full.includes('range rover') || full.includes('autobiography')) return '/images/suv.jpg';
  if (full.includes('f-150') || full.includes('lightning') || full.includes('ford')) return '/images/truck.jpg';
  if (full.includes('rivian') || full.includes('r1t')) return '/images/truck.jpg';
  if (full.includes('audi') || full.includes('rs q8')) return '/images/suv.jpg';

  const cat = category.toLowerCase();
  if (cat.includes('ev')) return '/images/ev.jpg';
  if (cat.includes('suv')) return '/images/suv.jpg';
  if (cat.includes('truck')) return '/images/truck.jpg';
  if (cat.includes('coupe')) return '/images/coupe.jpg';
  return '/images/sedan.jpg';
};

export const getVehicleColors = (make: string, model: string, category: string): ColorVariant[] => {
  const carPhoto = getVehicleImage(make, model, category);
  const full = `${make} ${model}`.toLowerCase();

  if (full.includes('tesla') || full.includes('model s')) {
    return [
      { name: 'Stealth Cyan', hex: '#06B6D4', image: carPhoto, filter: 'none' },
      { name: 'Obsidian Black', hex: '#1E293B', image: carPhoto, filter: 'brightness(0.55) contrast(1.2) grayscale(0.5)' },
      { name: 'Pearl White', hex: '#F8FAFC', image: carPhoto, filter: 'brightness(1.4) contrast(0.95) saturate(0.4)' },
      { name: 'Ultra Red', hex: '#DC2626', image: carPhoto, filter: 'hue-rotate(145deg) saturate(1.8)' },
    ];
  }

  if (full.includes('911') || full.includes('gt3')) {
    return [
      { name: 'Sunset Gold', hex: '#F59E0B', image: carPhoto, filter: 'none' },
      { name: 'Carmine Red', hex: '#B91C1C', image: carPhoto, filter: 'hue-rotate(185deg) saturate(1.7)' },
      { name: 'Shark Blue', hex: '#2563EB', image: carPhoto, filter: 'hue-rotate(240deg) saturate(1.6)' },
      { name: 'Chalk Grey', hex: '#94A3B8', image: carPhoto, filter: 'grayscale(0.8) brightness(1.2)' },
    ];
  }

  if (full.includes('m5') || full.includes('bmw')) {
    return [
      { name: 'Marina Bay Blue', hex: '#1D4ED8', image: carPhoto, filter: 'none' },
      { name: 'Black Sapphire', hex: '#0F172A', image: carPhoto, filter: 'brightness(0.5) contrast(1.3) grayscale(0.6)' },
      { name: 'Alpine White', hex: '#F1F5F9', image: carPhoto, filter: 'brightness(1.4) saturate(0.3)' },
      { name: 'Isle of Man Green', hex: '#047857', image: carPhoto, filter: 'hue-rotate(240deg) saturate(1.6)' },
    ];
  }

  if (full.includes('taycan')) {
    return [
      { name: 'Frozen Blue', hex: '#38BDF8', image: carPhoto, filter: 'none' },
      { name: 'Gentian Blue', hex: '#1E40AF', image: carPhoto, filter: 'hue-rotate(30deg) saturate(1.4) brightness(0.85)' },
      { name: 'Carrera White', hex: '#FFFFFF', image: carPhoto, filter: 'brightness(1.45) saturate(0.2)' },
      { name: 'Midnight Black', hex: '#0F172A', image: carPhoto, filter: 'brightness(0.5) contrast(1.2) grayscale(0.5)' },
    ];
  }

  if (full.includes('mercedes') || full.includes('s-class') || full.includes('s580')) {
    return [
      { name: 'Obsidian Black', hex: '#090D16', image: carPhoto, filter: 'none' },
      { name: 'Diamond White', hex: '#F8FAFC', image: carPhoto, filter: 'brightness(1.6) contrast(0.9) grayscale(0.7)' },
      { name: 'Ruby Red', hex: '#991B1B', image: carPhoto, filter: 'hue-rotate(320deg) saturate(1.8) brightness(0.9)' },
      { name: 'Nautical Blue', hex: '#1E3A8A', image: carPhoto, filter: 'hue-rotate(190deg) saturate(1.5)' },
    ];
  }

  if (full.includes('range rover') || full.includes('autobiography')) {
    return [
      { name: 'Carpathian Grey', hex: '#334155', image: carPhoto, filter: 'none' },
      { name: 'Santorini Black', hex: '#020617', image: carPhoto, filter: 'brightness(0.5) contrast(1.3) grayscale(0.7)' },
      { name: 'Fuji White', hex: '#F8FAFC', image: carPhoto, filter: 'brightness(1.5) contrast(0.95) saturate(0.3)' },
      { name: 'Sunset Bronze', hex: '#D97706', image: carPhoto, filter: 'hue-rotate(-40deg) saturate(1.5)' },
    ];
  }

  if (full.includes('f-150') || full.includes('lightning') || full.includes('ford')) {
    return [
      { name: 'Cyber Silver', hex: '#94A3B8', image: carPhoto, filter: 'none' },
      { name: 'Agate Black', hex: '#0F172A', image: carPhoto, filter: 'brightness(0.55) contrast(1.2) grayscale(0.6)' },
      { name: 'Atlas Blue', hex: '#1D4ED8', image: carPhoto, filter: 'hue-rotate(200deg) saturate(1.7)' },
      { name: 'Rapid Red', hex: '#C2410C', image: carPhoto, filter: 'hue-rotate(130deg) saturate(1.8)' },
    ];
  }

  if (full.includes('rivian') || full.includes('r1t')) {
    return [
      { name: 'Compass Yellow', hex: '#EAB308', image: carPhoto, filter: 'none' },
      { name: 'Rivian Blue', hex: '#0284C7', image: carPhoto, filter: 'hue-rotate(160deg) saturate(1.6)' },
      { name: 'Glacier White', hex: '#FFFFFF', image: carPhoto, filter: 'brightness(1.45) saturate(0.2)' },
      { name: 'Midnight Black', hex: '#1E293B', image: carPhoto, filter: 'brightness(0.5) contrast(1.2) grayscale(0.6)' },
    ];
  }

  if (full.includes('audi') || full.includes('rs q8')) {
    return [
      { name: 'Nardo Grey', hex: '#64748B', image: carPhoto, filter: 'none' },
      { name: 'Mythos Black', hex: '#090D16', image: carPhoto, filter: 'brightness(0.5) contrast(1.3) grayscale(0.7)' },
      { name: 'Matador Red', hex: '#991B1B', image: carPhoto, filter: 'hue-rotate(330deg) saturate(1.8)' },
      { name: 'Navarra Blue', hex: '#1D4ED8', image: carPhoto, filter: 'hue-rotate(200deg) saturate(1.6)' },
    ];
  }

  // Default color set for any custom vehicle added by Admin
  return [
    { name: 'Midnight Metallic Navy', hex: '#1E3A8A', image: carPhoto, filter: 'none' },
    { name: 'Obsidian Black', hex: '#090D16', image: carPhoto, filter: 'brightness(0.5) contrast(1.3) grayscale(0.6)' },
    { name: 'Alpine White', hex: '#FFFFFF', image: carPhoto, filter: 'brightness(1.45) saturate(0.2)' },
    { name: 'Sunset Amber Gold', hex: '#F59E0B', image: carPhoto, filter: 'hue-rotate(-45deg) saturate(1.6)' },
  ];
};
