export interface Building {
  id: string;
  name: string;
  type: 'academic' | 'residential' | 'lab' | 'administrative';
  lat: number;
  lng: number;
  area: number;
  occupants: number;
  energy_kwh: number;
  co2_tons: number;
  green: boolean;
  improved: boolean;
  monthly_emissions: number[];
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Commute {
  id: string;
  user_id: string;
  mode: 'car' | 'bike' | 'bus' | 'cycle' | 'walk';
  distance_km: number;
  frequency: 'daily' | 'weekly';
  emissions_kg: number;
  created_at: string;
}

export interface Scenario {
  id: string;
  user_id: string;
  name: string;
  description: string;
  buildings: string[];
  solar_capacity: number;
  hvac_efficiency: number;
  trees_count: number;
  cycling_reduction: number;
  reduction_tons: number;
  reduction_pct: number;
  cost_investment: number;
  cost_savings_yr: number;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  response: string;
  category: string;
  created_at: string;
}

export interface Recommendation {
  id: string;
  building_id: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
}
