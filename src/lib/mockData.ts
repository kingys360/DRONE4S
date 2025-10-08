import type { Building } from './types';

export const campusCenter: [number, number] = [29.8655, 77.8957];

export const mockBuildings: Building[] = [
  {
    id: 'MB',
    name: 'Main Building',
    type: 'academic',
    lat: 29.8654,
    lng: 77.8955,
    area: 120000,
    occupants: 900,
    energy_kwh: 1800000,
    co2_tons: 260,
    green: false,
    improved: true,
    monthly_emissions: [24, 22, 21, 20, 19, 18, 18, 19, 20, 22, 24, 25],
    image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'L1',
    name: 'Lecture Hall Complex',
    type: 'academic',
    lat: 29.8647,
    lng: 77.8929,
    area: 85000,
    occupants: 1200,
    energy_kwh: 1250000,
    co2_tons: 170,
    green: true,
    improved: true,
    monthly_emissions: [14, 13, 12, 12, 11, 10, 10, 10, 11, 12, 13, 14],
    image_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'LB',
    name: 'Central Library',
    type: 'academic',
    lat: 29.8657,
    lng: 77.8983,
    area: 60000,
    occupants: 600,
    energy_kwh: 720000,
    co2_tons: 95,
    green: true,
    improved: false,
    monthly_emissions: [8, 7, 7, 7, 6, 6, 6, 6, 7, 7, 8, 8],
    image_url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'RL',
    name: 'Research Labs',
    type: 'lab',
    lat: 29.8629,
    lng: 77.8969,
    area: 70000,
    occupants: 350,
    energy_kwh: 1400000,
    co2_tons: 210,
    green: false,
    improved: false,
    monthly_emissions: [20, 18, 18, 17, 16, 16, 16, 16, 17, 18, 19, 19],
    image_url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'ADM',
    name: 'Administrative Block',
    type: 'administrative',
    lat: 29.8669,
    lng: 77.8939,
    area: 50000,
    occupants: 300,
    energy_kwh: 480000,
    co2_tons: 66,
    green: true,
    improved: true,
    monthly_emissions: [6, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 7],
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'GH',
    name: 'Girls Hostel',
    type: 'residential',
    lat: 29.868,
    lng: 77.8978,
    area: 90000,
    occupants: 800,
    energy_kwh: 820000,
    co2_tons: 115,
    green: false,
    improved: true,
    monthly_emissions: [10, 9, 9, 9, 9, 10, 11, 12, 11, 10, 10, 10],
    image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'BH',
    name: 'Boys Hostel',
    type: 'residential',
    lat: 29.8636,
    lng: 77.8934,
    area: 110000,
    occupants: 1200,
    energy_kwh: 980000,
    co2_tons: 140,
    green: false,
    improved: false,
    monthly_emissions: [12, 11, 11, 11, 11, 12, 13, 14, 13, 12, 12, 11],
    image_url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'SP',
    name: 'Sports Complex',
    type: 'academic',
    lat: 29.8679,
    lng: 77.8922,
    area: 65000,
    occupants: 400,
    energy_kwh: 560000,
    co2_tons: 80,
    green: true,
    improved: false,
    monthly_emissions: [7, 6, 6, 6, 6, 7, 7, 8, 7, 6, 6, 6],
    image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop'
  }
];

export const parkingLots = [
  { name: 'Admin Parking', lat: 29.8667, lng: 77.8942, spots: 60 },
  { name: 'LHC Parking', lat: 29.8645, lng: 77.8925, spots: 120 },
  { name: 'Sports Complex Parking', lat: 29.8681, lng: 77.8919, spots: 80 }
];

export const busRoutes = [
  {
    name: 'Campus Loop',
    color: '#22c55e',
    stops: [
      [29.8658, 77.8984],
      [29.8682, 77.8972],
      [29.8684, 77.8931],
      [29.8668, 77.8917],
      [29.8643, 77.8927],
      [29.8630, 77.8969],
      [29.8654, 77.8955]
    ]
  },
  {
    name: 'Hostel Shuttle',
    color: '#38bdf8',
    stops: [
      [29.8636, 77.8934],
      [29.8646, 77.8926],
      [29.8656, 77.8952],
      [29.8679, 77.8978]
    ]
  },
  {
    name: 'City Connector',
    color: '#f59e0b',
    stops: [
      [29.8655, 77.8957],
      [29.8619, 77.9002],
      [29.8580, 77.9070]
    ]
  }
];
