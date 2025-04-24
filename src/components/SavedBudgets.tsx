import React, { useState } from 'react';
import { formatCurrency, formatDate, calculateDuration } from '../utils/formatter';
import { TravelBudget } from '../types/types';
import { useBudget } from '../context/BudgetContext';
import { Trash2, Edit, ChevronDown, ChevronUp } from 'lucide-react';

const SavedBudgets: React.FC = () => {
  const { savedBudgets, removeBudget } = useBudget();
  const [expandedBudget, setExpandedBudget] = useState<string | null>(null);
  
  if (savedBudgets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Saved Budgets</h2>
        <p className="text-gray-600 mb-6">
          You haven't saved any travel budgets yet. Create a budget using the calculator.
        </p>
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <Trash2 className="w-12 h-12 text-gray-300" />
        </div>
      </div>
    );
  }
  
  const toggleExpand = (budgetId: string) => {
    if (expandedBudget === budgetId) {
      setExpandedBudget(null);
    } else {
      setExpandedBudget(budgetId);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Saved Budgets</h2>
      
      <div className="space-y-4">
        {savedBudgets.map((budget) => (
          <div 
            key={budget.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            {/* Budget header */}
            <div 
              className="p-4 cursor-pointer"
              onClick={() => toggleExpand(budget.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{budget.name}</h3>
                  <p className="text-gray-600">
                    {budget.destination.name}, {budget.destination.country}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-teal-700">
                      {formatCurrency(budget.totalBudget)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(budget.startDate)} - {formatDate(budget.endDate)}
                    </p>
                  </div>
                  
                  {expandedBudget === budget.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </div>
            </div>
            
            {/* Expanded details */}
            {expandedBudget === budget.id && (
              <div className="px-4 pb-4 animate-fadeIn">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">
                        {calculateDuration(budget.startDate, budget.endDate)} days
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Travelers</p>
                      <p className="font-medium">{budget.travelers}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Budget Type</p>
                      <p className="font-medium capitalize">{budget.destination.costLevel}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700 mb-2">Expense Breakdown</h4>
                    {budget.expenses.map((expense, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{expense.category}</span>
                        <span className="font-medium">{formatCurrency(expense.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                    title="Edit Budget"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => removeBudget(budget.id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete Budget"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Animation for fade in */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SavedBudgets;