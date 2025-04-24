import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { id: 'calculator', label: 'Calculator' },
    { id: 'history', label: 'Saved Budgets' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Compass className="h-8 w-8 text-teal-500 mr-2" />
            <h1 className="text-2xl font-bold text-teal-700">
              Travel Budget Planner
            </h1>
          </div>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-1">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => onTabChange(tab.id)}
                    className={`px-4 py-2 rounded-md transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-teal-100 text-teal-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <div className="relative">
              <select 
                value={activeTab}
                onChange={(e) => onTabChange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {tabs.map((tab) => (
                  <option key={tab.id} value={tab.id}>
                    {tab.label}
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
        </div>
      </div>
    </header>
  );
};

export default Header;