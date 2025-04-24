import React from 'react';
import { Globe, DollarSign, ShieldCheck, HelpCircle } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">About Travel Budget Planner</h2>
        
        <p className="text-gray-700 mb-6 leading-relaxed">
          Travel Budget Planner helps you estimate and plan your travel expenses using real-world data.
          Our intelligent algorithm considers your destination, travel dates, number of travelers, and
          preferred budget level to provide realistic cost estimates for your journey.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-teal-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Globe className="w-6 h-6 text-teal-600 mr-3" />
              <h3 className="text-lg font-bold text-gray-800">Global Coverage</h3>
            </div>
            <p className="text-gray-700">
              Our database includes pricing information for thousands of destinations worldwide,
              from popular tourist spots to off-the-beaten-path locations.
            </p>
          </div>
          
          <div className="bg-teal-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <DollarSign className="w-6 h-6 text-teal-600 mr-3" />
              <h3 className="text-lg font-bold text-gray-800">Accurate Estimates</h3>
            </div>
            <p className="text-gray-700">
              We source data from multiple providers and update our pricing information regularly
              to ensure your travel budget estimates are as accurate as possible.
            </p>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-4">How It Works</h3>
        
        <div className="space-y-6 mb-8">
          <div className="flex">
            <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-4 text-teal-700 font-bold">
              1
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Select Your Destination</h4>
              <p className="text-gray-600">
                Choose from our comprehensive list of global destinations.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-4 text-teal-700 font-bold">
              2
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Enter Trip Details</h4>
              <p className="text-gray-600">
                Specify your travel dates, number of travelers, and preferred budget level.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-4 text-teal-700 font-bold">
              3
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Get Instant Estimates</h4>
              <p className="text-gray-600">
                Our algorithm calculates detailed cost estimates across multiple expense categories.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-4 text-teal-700 font-bold">
              4
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Save & Compare</h4>
              <p className="text-gray-600">
                Save your budget plans and compare different trip options to find the best fit.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <ShieldCheck className="w-6 h-6 text-teal-600 mr-3" />
            <h3 className="text-lg font-bold text-gray-800">Partner Information</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Travel Budget Planner is a trusted partner in the travel industry, working with leading providers to ensure accurate and up-to-date pricing information.
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-6">
          <HelpCircle className="w-6 h-6 text-teal-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-800">Frequently Asked Questions</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">How accurate are the estimates?</h4>
            <p className="text-gray-600">
              Our estimates are based on real-world data from various sources and are regularly updated.
              However, actual costs may vary based on factors like seasonal pricing, special events, and personal preferences.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Can I customize the expense categories?</h4>
            <p className="text-gray-600">
              Currently, we provide estimates for standard categories (accommodation, food, transportation, 
              activities, and other expenses). Customization features will be available in future updates.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Does the tool consider currency exchange rates?</h4>
            <p className="text-gray-600">
              Yes, our estimates are converted to your preferred currency using up-to-date exchange rates.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-2">How often is the pricing data updated?</h4>
            <p className="text-gray-600">
              Our database is updated monthly to reflect current pricing trends and seasonal variations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;