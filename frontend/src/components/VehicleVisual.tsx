import React from 'react';

interface VehicleVisualProps {
  colorHex: string;
  category: string;
  photoUrl: string;
  make: string;
  model: string;
}

export const VehicleVisual: React.FC<VehicleVisualProps> = ({
  colorHex,
  photoUrl,
  make,
  model,
}) => {
  return (
    <div className="relative w-full h-56 bg-slate-950 overflow-hidden group">
      {/* 1. Base Layer: Natural, crisp background & vehicle photo (Background remains 100% unaffected) */}
      <img
        src={photoUrl}
        alt={`${make} ${model}`}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
      />

      {/* 2. Isolated Car Body Paint Layer (Masked strictly to the car body in center, leaving background untouched) */}
      <div
        className="absolute inset-0 transition-colors duration-500 mix-blend-color opacity-80 pointer-events-none"
        style={{
          backgroundColor: colorHex,
          WebkitMaskImage: 'radial-gradient(ellipse 65% 50% at 50% 55%, black 45%, transparent 80%)',
          maskImage: 'radial-gradient(ellipse 65% 50% at 50% 55%, black 45%, transparent 80%)',
        }}
      />

      {/* 3. Subtle Metallic Paint Highlight Shader strictly on car body */}
      <div
        className="absolute inset-0 transition-opacity duration-500 mix-blend-overlay opacity-30 pointer-events-none"
        style={{
          backgroundColor: colorHex,
          WebkitMaskImage: 'radial-gradient(ellipse 55% 40% at 50% 50%, black 30%, transparent 75%)',
          maskImage: 'radial-gradient(ellipse 55% 40% at 50% 50%, black 30%, transparent 75%)',
        }}
      />

      {/* Top Subtle Gloss Accent Line matching paint choice */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-colors duration-500 shadow-sm"
        style={{ backgroundColor: colorHex }}
      />
    </div>
  );
};
