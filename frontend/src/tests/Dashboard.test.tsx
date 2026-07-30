import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { VehicleCard } from '../components/VehicleCard';
import { Vehicle } from '../types';

// Mock AuthContext
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { email: 'customer@example.com', role: 'customer' },
    isAdmin: false,
    logout: vi.fn(),
  }),
}));

const mockVehicleAvailable: Vehicle = {
  id: '1',
  make: 'Porsche',
  model: '911 GT3',
  category: 'coupe',
  price: 180000,
  quantity: 3,
};

const mockVehicleOutOfStock: Vehicle = {
  id: '2',
  make: 'Mercedes-Benz',
  model: 'S-Class',
  category: 'sedan',
  price: 110000,
  quantity: 0,
};

describe('VehicleCard Component Tests', () => {
  it('renders available vehicle card with purchase button active', () => {
    render(
      <VehicleCard
        vehicle={mockVehicleAvailable}
        onPurchase={vi.fn()}
      />
    );

    expect(screen.getByText('Porsche')).toBeInTheDocument();
    expect(screen.getByText('911 GT3')).toBeInTheDocument();
    expect(screen.getByText('$180,000')).toBeInTheDocument();
    expect(screen.getByText('Purchase Vehicle')).not.toBeDisabled();
  });

  it('disables purchase button and shows Out of Stock when quantity is 0', () => {
    render(
      <VehicleCard
        vehicle={mockVehicleOutOfStock}
        onPurchase={vi.fn()}
      />
    );

    const outOfStockBadges = screen.getAllByText('Out of Stock');
    expect(outOfStockBadges.length).toBeGreaterThan(0);
    const purchaseBtn = screen.getByRole('button', { name: /out of stock/i });
    expect(purchaseBtn).toBeDisabled();
  });
});
