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
  category,
  photoUrl,
  make,
  model,
}) => {
  return (
    <div className="relative w-full h-56 bg-slate-950 overflow-hidden group">
      {/* Background Hero Car Image */}
      <img
        src={photoUrl}
        alt={`${make} ${model}`}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-90"
      />

      {/* Dynamic Color Metallic Overlay Shader */}
      <div
        className="absolute inset-0 transition-colors duration-500 mix-blend-color opacity-70 pointer-events-none"
        style={{ backgroundColor: colorHex }}
      />

      {/* Metallic Gloss & Highlight Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-transparent to-black/50 pointer-events-none" />

      {/* Live Selected Color Accent Bar at top */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 transition-colors duration-500 shadow-md"
        style={{ backgroundColor: colorHex }}
      />
    </div>
  );
};
