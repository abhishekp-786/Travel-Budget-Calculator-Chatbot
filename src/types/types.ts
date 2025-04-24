export interface TravelDestination {
  id: string;
  name: string;
  country: string;
  continent: string;
  costLevel: 'budget' | 'moderate' | 'luxury';
}

export interface TravelExpense {
  category: string;
  amount: number;
  isCustom?: boolean;
}

export interface TravelBudget {
  id: string;
  name: string;
  destination: TravelDestination;
  startDate: string;
  endDate: string;
  travelers: number;
  expenses: TravelExpense[];
  totalBudget: number;
  notes?: string;
  createdAt: string;
}

export interface ApiConfig {
  token: string;
  partnerId: string;
}

export interface CostEstimate {
  accommodation: number;
  food: number;
  transportation: number;
  activities: number;
  other: number;
  total: number;
  currency: string;
  breakdown: {
    [key: string]: number;
  };
}

export interface TabItem {
  id: string;
  label: string;
  icon: string;
}