import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-50 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Travel Budget Planner
            </p>
            <p className="text-gray-500 text-xs mt-1">
              API Partner ID: 624736
            </p>
            <p className="text-gray-500 text-xs mt-1 font-semibold">
            Developed by <span className="text-teal-600">Abhishek Kumar Prajapati(12304652)</span>
            </p>
            <p className="text-gray-500 text-xs mt-1 font-semibold">
            Developed by <span className="text-teal-600">Ankur Mishra(12326893)</span>
            </p>
            <p className="text-gray-500 text-xs mt-1 font-semibold">
            Developed by <span className="text-teal-600">Dipesh Kumar(12315214)</span>
            </p>
          </div>
          
          <div className="flex items-center">
            <span className="text-gray-600 text-sm mr-2">Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span className="text-gray-600 text-sm ml-2">for travelers</span>
          </div>
          
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-teal-600 hover:text-teal-800 text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-teal-600 hover:text-teal-800 text-sm transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="text-teal-600 hover:text-teal-800 text-sm transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;