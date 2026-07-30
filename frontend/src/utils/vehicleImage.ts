import { ColorVariant } from '../types';

export const getVehicleImage = (make: string, model: string, category: string, customImageUrl?: string): string => {
  if (customImageUrl && customImageUrl.trim() !== '') {
    return customImageUrl;
  }

  const full = `${make} ${model}`.toLowerCase();

  if (full.includes('tesla') || full.includes('model s')) return '/images/tesla.jpg';
  if (full.includes('taycan')) return '/images/taycan.jpg';
  if (full.includes('911') || full.includes('gt3')) return '/images/porsche911.jpg';
  if (full.includes('m5') || full.includes('bmw')) return '/images/bmwm5.jpg';
  if (full.includes('mercedes') || full.includes('s-class') || full.includes('s580')) return '/images/mercedes_s580.jpg';
  if (full.includes('range rover') || full.includes('autobiography')) return '/images/range_rover.jpg';
  if (full.includes('f-150') || full.includes('lightning') || full.includes('ford')) return '/images/ford_f150.jpg';
  if (full.includes('rivian') || full.includes('r1t')) return '/images/rivian_r1t.jpg';
  if (full.includes('audi') || full.includes('rs q8')) return '/images/audi_rsq8.jpg';

  const cat = category.toLowerCase();
  if (cat.includes('ev')) return '/images/tesla.jpg';
  if (cat.includes('suv')) return '/images/range_rover.jpg';
  if (cat.includes('truck')) return '/images/ford_f150.jpg';
  if (cat.includes('coupe')) return '/images/porsche911.jpg';
  return '/images/mercedes_s580.jpg';
};

export const getVehicleColors = (make: string, model: string, category: string, customImageUrl?: string): ColorVariant[] => {
  const heroImage = getVehicleImage(make, model, category, customImageUrl);
  const full = `${make} ${model}`.toLowerCase();

  if (full.includes('tesla') || full.includes('model s')) {
    return [
      { name: 'Stealth Cyan', hex: '#06B6D4', image: heroImage, stock: 3, isAvailable: true },
      { name: 'Obsidian Black', hex: '#1E293B', image: heroImage, stock: 2, isAvailable: true },
      { name: 'Pearl White', hex: '#F8FAFC', image: heroImage, stock: 0, isAvailable: false },
      { name: 'Ultra Red', hex: '#DC2626', image: heroImage, stock: 1, isAvailable: true },
    ];
  }

  if (full.includes('911') || full.includes('gt3')) {
    return [
      { name: 'Sunset Gold', hex: '#F59E0B', image: heroImage, stock: 2, isAvailable: true },
      { name: 'Carmine Red', hex: '#B91C1C', image: heroImage, stock: 1, isAvailable: true },
      { name: 'Shark Blue', hex: '#2563EB', image: heroImage, stock: 2, isAvailable: true },
      { name: 'Chalk Grey', hex: '#94A3B8', image: heroImage, stock: 0, isAvailable: false },
    ];
  }

  if (full.includes('m5') || full.includes('bmw')) {
    return [
      { name: 'Marina Bay Blue', hex: '#1D4ED8', image: heroImage, stock: 3, isAvailable: true },
      { name: 'Black Sapphire', hex: '#0F172A', image: heroImage, stock: 2, isAvailable: true },
      { name: 'Alpine White', hex: '#F1F5F9', image: heroImage, stock: 0, isAvailable: false },
      { name: 'Isle of Man Green', hex: '#047857', image: heroImage, stock: 1, isAvailable: true },
    ];
  }

  if (full.includes('taycan')) {
    return [
      { name: 'Frozen Blue', hex: '#38BDF8', image: heroImage, stock: 2, isAvailable: true },
      { name: 'Gentian Blue', hex: '#1E40AF', image: heroImage, stock: 0, isAvailable: false },
      { name: 'Carrera White', hex: '#FFFFFF', image: heroImage, stock: 1, isAvailable: true },
      { name: 'Midnight Black', hex: '#0F172A', image: heroImage, stock: 3, isAvailable: true },
    ];
  }

  if (full.includes('mercedes') || full.includes('s-class') || full.includes('s580')) {
    return [
      { name: 'Obsidian Black', hex: '#090D16', image: heroImage, stock: 4, isAvailable: true },
      { name: 'Diamond White', hex: '#F8FAFC', image: heroImage, stock: 1, isAvailable: true },
      { name: 'Ruby Red', hex: '#991B1B', image: heroImage, stock: 0, isAvailable: false },
      { name: 'Nautical Blue', hex: '#1E3A8A', image: heroImage, stock: 2, isAvailable: true },
    ];
  }

  if (full.includes('range rover') || full.includes('autobiography')) {
    return [
      { name: 'Carpathian Grey', hex: '#334155', image: heroImage, stock: 2, isAvailable: true },
      { name: 'Santorini Black', hex: '#020617', image: heroImage, stock: 3, isAvailable: true },
      { name: 'Fuji White', hex: '#F8FAFC', image: heroImage, stock: 1, isAvailable: true },
      { name: 'Batumi Gold', hex: '#D97706', image: heroImage, stock: 0, isAvailable: false },
    ];
  }

  if (full.includes('f-150') || full.includes('lightning') || full.includes('ford')) {
    return [
      { name: 'Cyber Silver', hex: '#94A3B8', image: heroImage, stock: 3, isAvailable: true },
      { name: 'Agate Black', hex: '#0F172A', image: heroImage, stock: 0, isAvailable: false },
      { name: 'Atlas Blue', hex: '#1D4ED8', image: heroImage, stock: 2, isAvailable: true },
      { name: 'Rapid Red', hex: '#C2410C', image: heroImage, stock: 1, isAvailable: true },
    ];
  }

  if (full.includes('rivian') || full.includes('r1t')) {
    return [
      { name: 'Compass Yellow', hex: '#EAB308', image: heroImage, stock: 2, isAvailable: true },
      { name: 'Rivian Blue', hex: '#0284C7', image: heroImage, stock: 1, isAvailable: true },
      { name: 'Glacier White', hex: '#FFFFFF', image: heroImage, stock: 0, isAvailable: false },
      { name: 'Midnight Black', hex: '#1E293B', image: heroImage, stock: 2, isAvailable: true },
    ];
  }

  if (full.includes('audi') || full.includes('rs q8')) {
    return [
      { name: 'Nardo Grey', hex: '#64748B', image: heroImage, stock: 3, isAvailable: true },
      { name: 'Mythos Black', hex: '#090D16', image: heroImage, stock: 2, isAvailable: true },
      { name: 'Matador Red', hex: '#991B1B', image: heroImage, stock: 0, isAvailable: false },
      { name: 'Navarra Blue', hex: '#1D4ED8', image: heroImage, stock: 1, isAvailable: true },
    ];
  }

  return [
    { name: 'Stealth Cyan', hex: '#06B6D4', image: heroImage, stock: 2, isAvailable: true },
    { name: 'Obsidian Black', hex: '#090D16', image: heroImage, stock: 1, isAvailable: true },
    { name: 'Alpine White', hex: '#FFFFFF', image: heroImage, stock: 0, isAvailable: false },
    { name: 'Sunset Amber Gold', hex: '#F59E0B', image: heroImage, stock: 2, isAvailable: true },
  ];
};
