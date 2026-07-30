export const getVehicleImage = (make: string, model: string, category: string): string => {
  const full = `${make} ${model}`.toLowerCase();

  if (full.includes('tesla') || full.includes('model s')) {
    return '/images/tesla.jpg';
  }
  if (full.includes('taycan')) {
    return '/images/taycan.jpg';
  }
  if (full.includes('911') || full.includes('gt3')) {
    return '/images/porsche911.jpg';
  }
  if (full.includes('m5') || full.includes('bmw')) {
    return '/images/bmwm5.jpg';
  }
  if (full.includes('mercedes') || full.includes('s-class') || full.includes('s580')) {
    return '/images/sedan.jpg';
  }
  if (full.includes('range rover') || full.includes('autobiography')) {
    return '/images/suv.jpg';
  }
  if (full.includes('f-150') || full.includes('lightning') || full.includes('ford')) {
    return '/images/truck.jpg';
  }
  if (full.includes('rivian') || full.includes('r1t')) {
    return '/images/truck.jpg';
  }
  if (full.includes('audi') || full.includes('rs q8')) {
    return '/images/suv.jpg';
  }

  // Category fallback
  const cat = category.toLowerCase();
  if (cat.includes('ev')) return '/images/ev.jpg';
  if (cat.includes('suv')) return '/images/suv.jpg';
  if (cat.includes('truck')) return '/images/truck.jpg';
  if (cat.includes('coupe')) return '/images/coupe.jpg';
  return '/images/sedan.jpg';
};
