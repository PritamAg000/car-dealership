import React, { useState } from 'react';

interface VehicleVisualProps {
  colorHex: string;
  colorName: string;
  photoUrl: string;
  make: string;
  model: string;
  category?: string;
}

export const VehicleVisual: React.FC<VehicleVisualProps> = ({
  colorHex,
  colorName,
  photoUrl,
  make,
  model,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full h-56 bg-slate-950 overflow-hidden group">
      {/* Real HD Car Photograph for the selected color */}
      {!imageError ? (
        <img
          key={photoUrl}
          src={photoUrl}
          alt={`${make} ${model} in ${colorName}`}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 animate-fadeIn"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center text-slate-500">
          Photo Unavailable
        </div>
      )}

      {/* Subtle Overlay Gradient for luxury aesthetics */}
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-transparent to-black/30 pointer-events-none" />

      {/* Selected Color Paint Accent Line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 transition-colors duration-500 shadow-md"
        style={{ backgroundColor: colorHex }}
      />
    </div>
  );
};
