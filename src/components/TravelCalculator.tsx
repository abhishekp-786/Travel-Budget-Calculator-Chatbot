import React, { useState, useEffect } from 'react';
import { Calendar, Users, DollarSign, Map, Plus, Minus } from 'lucide-react';
import { estimateTravelCost, fetchDestinations } from '../services/api';
import { formatCurrency, calculateDuration } from '../utils/formatter';
import { CostEstimate, TravelDestination, TravelBudget } from '../types/types';
import { useBudget } from '../context/BudgetContext';

const TravelCalculator: React.FC = () => {
  const [destinations, setDestinations] = useState<TravelDestination[]>([]);
  const [loading, setLoading] = useState(false);
  const [estimateResult, setEstimateResult] = useState<CostEstimate | null>(null);
  const [tripName, setTripName] = useState('My Trip');
  const { addBudget } = useBudget();
  
  // Form state
  const [formData, setFormData] = useState({
    destination: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    travelers: 2,
    costLevel: 'moderate',
  });
  
  // Fetch destinations on component mount
  useEffect(() => {
    const getDestinations = async () => {
      try {
        const data = await fetchDestinations();
        setDestinations(data);
        // Set default destination
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, destination: data[0].id }));
        }
      } catch (error) {
        console.error('Failed to fetch destinations:', error);
      }
    };
    
    getDestinations();
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Reset estimate when inputs change
    setEstimateResult(null);
  };
  
  const handleTravelersChange = (increment: boolean) => {
    setFormData(prev => ({
      ...prev,
      travelers: increment 
        ? Math.min(prev.travelers + 1, 20)  // Max 20 travelers
        : Math.max(prev.travelers - 1, 1)   // Min 1 traveler
    }));
    
    // Reset estimate when inputs change
    setEstimateResult(null);
  };
  
  const calculateEstimate = async () => {
    setLoading(true);
    
    try {
      const estimate = await estimateTravelCost(
        formData.destination,
        formData.startDate,
        formData.endDate,
        formData.travelers,
        formData.costLevel
      );
      
      setEstimateResult(estimate);
    } catch (error) {
      console.error('Error calculating estimate:', error);
      // In a real app, would show error message to user
    } finally {
      setLoading(false);
    }
  };
  
  const saveBudget = () => {
    if (!estimateResult) return;
    
    const selectedDestination = destinations.find(d => d.id === formData.destination);
    if (!selectedDestination) return;
    
    const expenses = Object.entries(estimateResult.breakdown).map(([category, amount]) => ({
      category,
      amount,
      isCustom: false,
    }));
    
    addBudget({
      name: tripName,
      destination: selectedDestination,
      startDate: formData.startDate,
      endDate: formData.endDate,
      travelers: formData.travelers,
      expenses,
      totalBudget: estimateResult.total,
    });
    
    // Reset form after saving
    setTripName('My Trip');
    setEstimateResult(null);
  };
  
  const tripDuration = calculateDuration(formData.startDate, formData.endDate);
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto overflow-hidden transition-all duration-300 transform hover:shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculate Your Travel Budget</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form section */}
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="block text-gray-700 font-medium">Trip Name</label>
            <div className="relative">
              <input
                type="text"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter a name for your trip"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="block text-gray-700 font-medium">Destination</label>
            <div className="relative">
              <Map className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none"
              >
                {destinations.map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {dest.name}, {dest.country}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Start Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">End Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="block text-gray-700 font-medium">Number of Travelers</label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleTravelersChange(false)}
                className="p-2 rounded-l-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                disabled={formData.travelers <= 1}
              >
                <Minus size={18} className={formData.travelers <= 1 ? 'text-gray-400' : 'text-gray-700'} />
              </button>
              
              <div className="relative flex-1">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="number"
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleInputChange}
                  min="1"
                  max="20"
                  className="w-full pl-10 py-2 text-center border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              
              <button
                type="button"
                onClick={() => handleTravelersChange(true)}
                className="p-2 rounded-r-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                disabled={formData.travelers >= 20}
              >
                <Plus size={18} className={formData.travelers >= 20 ? 'text-gray-400' : 'text-gray-700'} />
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="block text-gray-700 font-medium">Budget Type</label>
            <div className="grid grid-cols-3 gap-2">
              {['budget', 'moderate', 'luxury'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, costLevel: level }))}
                  className={`py-2 px-4 rounded-lg transition-all duration-200 ${
                    formData.costLevel === level
                      ? 'bg-teal-100 text-teal-800 font-medium border-2 border-teal-500'
                      : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <button
            type="button"
            onClick={calculateEstimate}
            disabled={loading}
            className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Calculating...
              </span>
            ) : (
              <span className="flex items-center">
                <DollarSign className="mr-1" size={18} />
                Calculate Estimate
              </span>
            )}
          </button>
        </div>
        
        {/* Results section */}
        <div className={`bg-gray-50 p-6 rounded-lg transition-all duration-500 transform ${
          estimateResult ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          {estimateResult ? (
            <div className="space-y-6">
              <div className="text-center pb-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800">{tripName}</h3>
                <p className="text-gray-600">
                  {tripDuration} {tripDuration === 1 ? 'day' : 'days'} • {formData.travelers} {formData.travelers === 1 ? 'traveler' : 'travelers'}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Accommodation</span>
                  <span className="font-medium">{formatCurrency(estimateResult.accommodation)}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Food & Dining</span>
                  <span className="font-medium">{formatCurrency(estimateResult.food)}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Transportation</span>
                  <span className="font-medium">{formatCurrency(estimateResult.transportation)}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Activities</span>
                  <span className="font-medium">{formatCurrency(estimateResult.activities)}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Other Expenses</span>
                  <span className="font-medium">{formatCurrency(estimateResult.other)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-gray-800">Total Budget</span>
                <span className="text-xl font-bold text-teal-700">
                  {formatCurrency(estimateResult.total)}
                </span>
              </div>
              
              <div className="pt-4">
                <button
                  type="button"
                  onClick={saveBudget}
                  className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors shadow"
                >
                  Save Budget
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-8">
              <DollarSign className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">Your Estimate Will Appear Here</h3>
              <p className="text-gray-500">
                Fill in the form and click "Calculate Estimate" to see your travel budget breakdown.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelCalculator;