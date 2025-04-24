import { ApiConfig, CostEstimate, TravelDestination } from '../types/types';

// Load API configuration from environment variables
const API_CONFIG: ApiConfig = {
  token: import.meta.env.VITE_API_TOKEN || '2e035abd62d30e5098ea0f6f43b46bcd',
  partnerId: import.meta.env.VITE_PARTNER_ID || '624736'
};

const API_BASE_URL = '/api';

const headers = {
  'Authorization': `Bearer ${API_CONFIG.token}`,
  'X-Partner-ID': API_CONFIG.partnerId,
  'Content-Type': 'application/json'
};

export const fetchDestinations = async (): Promise<TravelDestination[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations`, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      throw new Error('Failed to fetch destinations');
    }

    const data = await response.json();
    return data.destinations;
  } catch (error) {
    console.error('API Error:', error);
    // Fallback to mock data if API fails
    return [
      { id: 'paris', name: 'Paris', country: 'France', continent: 'Europe', costLevel: 'luxury' },
      { id: 'bangkok', name: 'Bangkok', country: 'Thailand', continent: 'Asia', costLevel: 'budget' },
      { id: 'nyc', name: 'New York City', country: 'USA', continent: 'North America', costLevel: 'luxury' },
      { id: 'tokyo', name: 'Tokyo', country: 'Japan', continent: 'Asia', costLevel: 'luxury' },
      { id: 'bali', name: 'Bali', country: 'Indonesia', continent: 'Asia', costLevel: 'budget' },
      { id: 'rome', name: 'Rome', country: 'Italy', continent: 'Europe', costLevel: 'moderate' },
      { id: 'cancun', name: 'Cancun', country: 'Mexico', continent: 'North America', costLevel: 'moderate' },
      { id: 'capetown', name: 'Cape Town', country: 'South Africa', continent: 'Africa', costLevel: 'moderate' },
    ];
  }
};

export const estimateTravelCost = async (
  destinationId: string,
  startDate: string,
  endDate: string,
  travelers: number,
  costLevel: string
): Promise<CostEstimate> => {
  try {
    const response = await fetch(`${API_BASE_URL}/estimate`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        destinationId,
        startDate,
        endDate,
        travelers,
        costLevel
      })
    });

    if (!response.ok) {
      throw new Error('Failed to estimate travel cost');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    // Fallback to mock calculations if API fails
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    
    let basePerDiem = 0;
    switch (destinationId) {
      case 'paris': basePerDiem = 150; break;
      case 'bangkok': basePerDiem = 50; break;
      case 'nyc': basePerDiem = 200; break;
      case 'tokyo': basePerDiem = 180; break;
      case 'bali': basePerDiem = 60; break;
      case 'rome': basePerDiem = 120; break;
      case 'cancun': basePerDiem = 100; break;
      case 'capetown': basePerDiem = 80; break;
      default: basePerDiem = 100;
    }
    
    let multiplier = 1;
    switch (costLevel) {
      case 'budget': multiplier = 0.7; break;
      case 'moderate': multiplier = 1; break;
      case 'luxury': multiplier = 1.8; break;
      default: multiplier = 1;
    }
    
    basePerDiem *= multiplier;
    
    const accommodation = Math.round(basePerDiem * 0.4 * days * travelers);
    const food = Math.round(basePerDiem * 0.3 * days * travelers);
    const transportation = Math.round(basePerDiem * 0.15 * days * travelers + (100 * travelers));
    const activities = Math.round(basePerDiem * 0.1 * days * travelers);
    const other = Math.round(basePerDiem * 0.05 * days * travelers);
    const total = accommodation + food + transportation + activities + other;
    
    return {
      accommodation,
      food,
      transportation,
      activities,
      other,
      total,
      currency: 'USD',
      breakdown: {
        'Accommodation': accommodation,
        'Food & Dining': food,
        'Transportation': transportation,
        'Activities & Sightseeing': activities,
        'Miscellaneous': other
      }
    };
  }
};