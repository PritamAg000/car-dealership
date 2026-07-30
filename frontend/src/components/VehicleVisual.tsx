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
  photoUrl,
  make,
  model,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full h-56 bg-slate-950 overflow-hidden group">
      {/* Authentic HD Hero Car Photograph — Unaltered & Exact Match to Model Name */}
      {!imageError ? (
        <img
          src={photoUrl}
          alt={`${make} ${model}`}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center text-slate-500">
          Photo Unavailable
        </div>
      )}

      {/* Subtle Overlay Gradient for luxury contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-transparent to-black/30 pointer-events-none" />
    </div>
  );
};
