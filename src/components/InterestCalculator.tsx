import React, { useState } from 'react';
import { Calculator, RefreshCw, Info } from 'lucide-react';

type CompoundingFrequency = {
  value: number;
  label: string;
};

export default function InterestCalculator() {
  // Define compounding frequency options
  const compoundingOptions: CompoundingFrequency[] = [
    { value: 1, label: 'Annually' },
    { value: 2, label: 'Semi-annually' },
    { value: 4, label: 'Quarterly' },
    { value: 12, label: 'Monthly' },
    { value: 365, label: 'Daily' }
  ];

  // State management for form inputs and errors
  const [principal, setPrincipal] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [compounding, setCompounding] = useState<number>(12); // Default to monthly
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  // Validate inputs
  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!principal) {
      newErrors.principal = 'Principal amount is required';
    } else if (isNaN(Number(principal)) || Number(principal) <= 0) {
      newErrors.principal = 'Principal must be a positive number';
    }

    if (!rate) {
      newErrors.rate = 'Interest rate is required';
    } else if (isNaN(Number(rate)) || Number(rate) <= 0) {
      newErrors.rate = 'Interest rate must be a positive number';
    }

    if (!time) {
      newErrors.time = 'Time period is required';
    } else if (isNaN(Number(time)) || Number(time) <= 0) {
      newErrors.time = 'Time period must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate compound interest
  const calculateInterest = () => {
    if (validateInputs()) {
      const p = Number(principal);
      const r = Number(rate) / 100; // Convert percentage to decimal
      const t = Number(time);
      const n = compounding;
      
      // Formula: A = P(1 + r/n)^(nt)
      const finalAmount = p * Math.pow(1 + r/n, n*t);
      setResult(finalAmount);
      setIsCalculated(true);
    }
  };

  // Reset form
  const resetForm = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setCompounding(12);
    setResult(null);
    setErrors({});
    setIsCalculated(false);
  };

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div className="lg:text-center mb-12">
        <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Calculator</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Savings Interest Calculator
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          Estimate your potential earnings from a savings account with our compound interest calculator.
        </p>
      </div>

      <div className="mt-10 sm:mt-12 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h3 className="text-lg font-medium text-white flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Compound Interest Calculator
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form inputs - Left side */}
          <div className="p-6 border-r border-gray-200">
            <div className="space-y-6">
              <div>
                <label htmlFor="principal" className="block text-sm font-medium text-gray-700">
                  Principal Amount ($)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="principal"
                    className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border ${errors.principal ? 'border-red-500' : ''}`}
                    placeholder="Enter initial deposit"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                  />
                  {errors.principal && <p className="mt-1 text-sm text-red-600">{errors.principal}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="rate" className="block text-sm font-medium text-gray-700">
                  Annual Interest Rate (%)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="rate"
                    className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border ${errors.rate ? 'border-red-500' : ''}`}
                    placeholder="Enter interest rate"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                  />
                  {errors.rate && <p className="mt-1 text-sm text-red-600">{errors.rate}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                  Time Period (Years)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="time"
                    className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border ${errors.time ? 'border-red-500' : ''}`}
                    placeholder="Enter time period"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                  {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="compounding" className="block text-sm font-medium text-gray-700">
                  Compounding Frequency
                </label>
                <div className="mt-1">
                  <select
                    id="compounding"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    value={compounding}
                    onChange={(e) => setCompounding(Number(e.target.value))}
                  >
                    {compoundingOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={calculateInterest}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Calculate
                </button>
                <button
                  onClick={resetForm}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Reset
                </button>
              </div>
            </div>
          </div>
          
          {/* Results - Right side */}
          <div className="p-6 bg-gray-50">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Calculation Results</h4>
            
            {isCalculated && result !== null ? (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-md shadow">
                  <p className="text-sm text-gray-500">Principal Amount:</p>
                  <p className="text-lg font-semibold">{formatCurrency(Number(principal))}</p>
                </div>
                
                <div className="bg-white p-4 rounded-md shadow">
                  <p className="text-sm text-gray-500">Interest Earned:</p>
                  <p className="text-lg font-semibold">{formatCurrency(result - Number(principal))}</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md shadow border border-blue-200">
                  <p className="text-sm text-blue-800">Final Balance:</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(result)}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
                <Calculator className="h-12 w-12 mb-4 text-gray-400" />
                <p className="text-lg">Enter your details and click "Calculate" to see the results</p>
              </div>
            )}
            
            <div className="mt-6 bg-blue-50 p-4 rounded-md flex items-start">
              <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">How it works:</p>
                <p className="mt-1">This calculator uses the compound interest formula: A = P(1 + r/n)^(nt), where:</p>
                <ul className="list-disc list-inside mt-2 ml-2 space-y-1">
                  <li>P = Principal (initial deposit)</li>
                  <li>r = Annual interest rate (in decimal)</li>
                  <li>n = Compounding frequency per year</li>
                  <li>t = Time period in years</li>
                  <li>A = Final amount</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
