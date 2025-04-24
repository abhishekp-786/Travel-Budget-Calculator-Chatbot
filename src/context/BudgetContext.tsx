import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TravelBudget } from '../types/types';
import { generateId } from '../utils/formatter';

interface BudgetContextType {
  savedBudgets: TravelBudget[];
  addBudget: (budget: Omit<TravelBudget, 'id' | 'createdAt'>) => void;
  removeBudget: (id: string) => void;
  updateBudget: (budget: TravelBudget) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};

interface BudgetProviderProps {
  children: ReactNode;
}

export const BudgetProvider: React.FC<BudgetProviderProps> = ({ children }) => {
  const [savedBudgets, setSavedBudgets] = useState<TravelBudget[]>([]);

  // Load saved budgets from localStorage on mount
  useEffect(() => {
    const savedBudgetsJson = localStorage.getItem('travelBudgets');
    if (savedBudgetsJson) {
      try {
        setSavedBudgets(JSON.parse(savedBudgetsJson));
      } catch (e) {
        console.error('Failed to parse saved budgets from localStorage', e);
      }
    }
  }, []);

  // Save budgets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('travelBudgets', JSON.stringify(savedBudgets));
  }, [savedBudgets]);

  const addBudget = (budget: Omit<TravelBudget, 'id' | 'createdAt'>) => {
    const newBudget: TravelBudget = {
      ...budget,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setSavedBudgets((prev) => [...prev, newBudget]);
  };

  const removeBudget = (id: string) => {
    setSavedBudgets((prev) => prev.filter((budget) => budget.id !== id));
  };

  const updateBudget = (updatedBudget: TravelBudget) => {
    setSavedBudgets((prev) => 
      prev.map((budget) => 
        budget.id === updatedBudget.id ? updatedBudget : budget
      )
    );
  };

  return (
    <BudgetContext.Provider
      value={{
        savedBudgets,
        addBudget,
        removeBudget,
        updateBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};