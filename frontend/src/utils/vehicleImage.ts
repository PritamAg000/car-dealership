import { ColorVariant } from '../types';

export const getVehicleImage = (make: string, model: string, category: string): string => {
  const full = `${make} ${model}`.toLowerCase();

  if (full.includes('tesla') || full.includes('model s')) return '/images/tesla_cyan.jpg';
  if (full.includes('taycan')) return '/images/taycan_blue.jpg';
  if (full.includes('911') || full.includes('gt3')) return '/images/porsche911_gold.jpg';
  if (full.includes('m5') || full.includes('bmw')) return '/images/bmwm5_blue.jpg';
  if (full.includes('mercedes') || full.includes('s-class') || full.includes('s580')) return '/images/mercedes_black.jpg';
  if (full.includes('range rover') || full.includes('autobiography')) return '/images/range_grey.jpg';
  if (full.includes('f-150') || full.includes('lightning') || full.includes('ford')) return '/images/ford_silver.jpg';
  if (full.includes('rivian') || full.includes('r1t')) return '/images/rivian_yellow.jpg';
  if (full.includes('audi') || full.includes('rs q8')) return '/images/audi_grey.jpg';

  const cat = category.toLowerCase();
  if (cat.includes('ev')) return '/images/tesla_cyan.jpg';
  if (cat.includes('suv')) return '/images/range_grey.jpg';
  if (cat.includes('truck')) return '/images/ford_silver.jpg';
  if (cat.includes('coupe')) return '/images/porsche911_gold.jpg';
  return '/images/mercedes_black.jpg';
};

export const getVehicleColors = (make: string, model: string, category: string): ColorVariant[] => {
  const full = `${make} ${model}`.toLowerCase();

  if (full.includes('tesla') || full.includes('model s')) {
    return [
      { name: 'Stealth Cyan', hex: '#06B6D4', image: '/images/tesla_cyan.jpg' },
      { name: 'Obsidian Black', hex: '#1E293B', image: '/images/tesla_black.jpg' },
      { name: 'Pearl White', hex: '#F8FAFC', image: '/images/tesla_white.jpg' },
      { name: 'Ultra Red', hex: '#DC2626', image: '/images/tesla_red.jpg' },
    ];
  }

  if (full.includes('911') || full.includes('gt3')) {
    return [
      { name: 'Sunset Gold', hex: '#F59E0B', image: '/images/porsche911_gold.jpg' },
      { name: 'Carmine Red', hex: '#B91C1C', image: '/images/porsche911_red.jpg' },
      { name: 'Shark Blue', hex: '#2563EB', image: '/images/porsche911_blue.jpg' },
      { name: 'Chalk Grey', hex: '#94A3B8', image: '/images/porsche911_grey.jpg' },
    ];
  }

  if (full.includes('m5') || full.includes('bmw')) {
    return [
      { name: 'Marina Bay Blue', hex: '#1D4ED8', image: '/images/bmwm5_blue.jpg' },
      { name: 'Black Sapphire', hex: '#0F172A', image: '/images/bmwm5_black.jpg' },
      { name: 'Alpine White', hex: '#F1F5F9', image: '/images/bmwm5_white.jpg' },
      { name: 'Isle of Man Green', hex: '#047857', image: '/images/bmwm5_green.jpg' },
    ];
  }

  if (full.includes('taycan')) {
    return [
      { name: 'Frozen Blue', hex: '#38BDF8', image: '/images/taycan_blue.jpg' },
      { name: 'Gentian Blue', hex: '#1E40AF', image: '/images/taycan_darkblue.jpg' },
      { name: 'Carrera White', hex: '#FFFFFF', image: '/images/taycan_white.jpg' },
      { name: 'Midnight Black', hex: '#0F172A', image: '/images/taycan_black.jpg' },
    ];
  }

  if (full.includes('mercedes') || full.includes('s-class') || full.includes('s580')) {
    return [
      { name: 'Obsidian Black', hex: '#090D16', image: '/images/mercedes_black.jpg' },
      { name: 'Diamond White', hex: '#F8FAFC', image: '/images/mercedes_white.jpg' },
      { name: 'Ruby Red', hex: '#991B1B', image: '/images/mercedes_red.jpg' },
      { name: 'Nautical Blue', hex: '#1E3A8A', image: '/images/mercedes_blue.jpg' },
    ];
  }

  if (full.includes('range rover') || full.includes('autobiography')) {
    return [
      { name: 'Carpathian Grey', hex: '#334155', image: '/images/range_grey.jpg' },
      { name: 'Santorini Black', hex: '#020617', image: '/images/range_black.jpg' },
      { name: 'Fuji White', hex: '#F8FAFC', image: '/images/range_white.jpg' },
      { name: 'Batumi Gold', hex: '#D97706', image: '/images/range_gold.jpg' },
    ];
  }

  if (full.includes('f-150') || full.includes('lightning') || full.includes('ford')) {
    return [
      { name: 'Cyber Silver', hex: '#94A3B8', image: '/images/ford_silver.jpg' },
      { name: 'Agate Black', hex: '#0F172A', image: '/images/ford_black.jpg' },
      { name: 'Atlas Blue', hex: '#1D4ED8', image: '/images/ford_blue.jpg' },
      { name: 'Rapid Red', hex: '#C2410C', image: '/images/ford_red.jpg' },
    ];
  }

  if (full.includes('rivian') || full.includes('r1t')) {
    return [
      { name: 'Compass Yellow', hex: '#EAB308', image: '/images/rivian_yellow.jpg' },
      { name: 'Rivian Blue', hex: '#0284C7', image: '/images/rivian_blue.jpg' },
      { name: 'Glacier White', hex: '#FFFFFF', image: '/images/rivian_white.jpg' },
      { name: 'Midnight Black', hex: '#1E293B', image: '/images/rivian_black.jpg' },
    ];
  }

  if (full.includes('audi') || full.includes('rs q8')) {
    return [
      { name: 'Nardo Grey', hex: '#64748B', image: '/images/audi_grey.jpg' },
      { name: 'Mythos Black', hex: '#090D16', image: '/images/audi_black.jpg' },
      { name: 'Matador Red', hex: '#991B1B', image: '/images/audi_red.jpg' },
      { name: 'Navarra Blue', hex: '#1D4ED8', image: '/images/audi_blue.jpg' },
    ];
  }

  // Default color photo set for any custom vehicle added by Admin
  return [
    { name: 'Stealth Cyan', hex: '#06B6D4', image: '/images/tesla_cyan.jpg' },
    { name: 'Obsidian Black', hex: '#090D16', image: '/images/tesla_black.jpg' },
    { name: 'Alpine White', hex: '#FFFFFF', image: '/images/tesla_white.jpg' },
    { name: 'Sunset Amber Gold', hex: '#F59E0B', image: '/images/porsche911_gold.jpg' },
  ];
};
