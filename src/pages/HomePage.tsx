import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import TravelCalculator from '../components/TravelCalculator';
import SavedBudgets from '../components/SavedBudgets';
import AboutPage from '../components/AboutPage';
import { BudgetProvider } from '../context/BudgetContext';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  
  return (
    <BudgetProvider>
      <AnimatedBackground>
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fadeIn">
              Plan Your Travel Budget
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fadeIn animation-delay-200">
              Calculate and track your travel expenses with our intelligent budget planner
            </p>
          </div>
          
          {activeTab === 'calculator' && (
            <div className="animate-slideIn">
              <TravelCalculator />
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="animate-slideIn">
              <SavedBudgets />
            </div>
          )}
          
          {activeTab === 'about' && (
            <div className="animate-slideIn">
              <AboutPage />
            </div>
          )}
        </main>
        
        <Footer />
      </AnimatedBackground>
      
      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </BudgetProvider>
  );
};

export default HomePage;