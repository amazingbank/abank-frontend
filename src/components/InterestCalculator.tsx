import React, { useState } from 'react';
import { Calculator, Info, RefreshCcw } from 'lucide-react';

type CompoundingFrequency = 'annually' | 'semi-annually' | 'quarterly' | 'monthly' | 'daily';

interface FormData {
  principal: string;
  rate: string;
  years: string;
  compoundingFrequency: CompoundingFrequency;
}

interface ValidationErrors {
  principal?: string;
  rate?: string;
  years?: string;
}

export default function InterestCalculator() {
  const [formData, setFormData] = useState<FormData>({
    principal: '',
    rate: '',
    years: '',
    compoundingFrequency: 'annually'
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [result, setResult] = useState<number | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const frequencyMap: Record<CompoundingFrequency, number> = {
    'annually': 1,
    'semi-annually': 2,
    'quarterly': 4,
    'monthly': 12,
    'daily': 365
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    // Principal validation
    if (!formData.principal) {
      newErrors.principal = 'Principal amount is required';
      isValid = false;
    } else if (isNaN(Number(formData.principal)) || Number(formData.principal) <= 0) {
      newErrors.principal = 'Please enter a valid positive number';
      isValid = false;
    }

    // Rate validation
    if (!formData.rate) {
      newErrors.rate = 'Interest rate is required';
      isValid = false;
    } else if (isNaN(Number(formData.rate)) || Number(formData.rate) <= 0 || Number(formData.rate) > 100) {
      newErrors.rate = 'Please enter a valid rate between 0 and 100';
      isValid = false;
    }

    // Years validation
    if (!formData.years) {
      newErrors.years = 'Time period is required';
      isValid = false;
    } else if (isNaN(Number(formData.years)) || Number(formData.years) <= 0 || !Number.isInteger(Number(formData.years))) {
      newErrors.years = 'Please enter a valid positive integer';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const calculateInterest = () => {
    if (!validateForm()) return;

    const principal = Number(formData.principal);
    const rate = Number(formData.rate) / 100;
    const years = Number(formData.years);
    const n = frequencyMap[formData.compoundingFrequency];

    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const finalAmount = principal * Math.pow(1 + (rate / n), n * years);
    setResult(finalAmount);
    setHasCalculated(true);
  };

  const resetForm = () => {
    setFormData({
      principal: '',
      rate: '',
      years: '',
      compoundingFrequency: 'annually'
    });
    setErrors({});
    setResult(null);
    setHasCalculated(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="flex justify-center items-center">
          <Calculator className="h-10 w-10 text-blue-600 mr-3" />
          <h1 className="text-3xl font-extrabold text-gray-900">Savings Account Interest Calculator</h1>
        </div>
        <p className="mt-4 text-lg text-gray-500">
          Estimate how much your savings can grow over time with our compound interest calculator.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input Form */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Enter Your Details</h2>
            
            <div>
              <label htmlFor="principal" className="block text-sm font-medium text-gray-700">
                Principal Amount ($)
              </label>
              <input
                type="number"
                id="principal"
                name="principal"
                value={formData.principal}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.principal ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter initial deposit"
              />
              {errors.principal && <p className="mt-1 text-sm text-red-600">{errors.principal}</p>}
            </div>

            <div>
              <label htmlFor="rate" className="block text-sm font-medium text-gray-700">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                id="rate"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.rate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter annual interest rate"
              />
              {errors.rate && <p className="mt-1 text-sm text-red-600">{errors.rate}</p>}
            </div>

            <div>
              <label htmlFor="years" className="block text-sm font-medium text-gray-700">
                Time Period (Years)
              </label>
              <input
                type="number"
                id="years"
                name="years"
                value={formData.years}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border ${errors.years ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter number of years"
              />
              {errors.years && <p className="mt-1 text-sm text-red-600">{errors.years}</p>}
            </div>

            <div>
              <label htmlFor="compoundingFrequency" className="block text-sm font-medium text-gray-700">
                Compounding Frequency
              </label>
              <select
                id="compoundingFrequency"
                name="compoundingFrequency"
                value={formData.compoundingFrequency}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="annually">Annually</option>
                <option value="semi-annually">Semi-Annually</option>
                <option value="quarterly">Quarterly</option>
                <option value="monthly">Monthly</option>
                <option value="daily">Daily</option>
              </select>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                onClick={calculateInterest}
                className="flex items-center justify-center w-1/2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
              >
                Calculate
              </button>
              <button
                onClick={resetForm}
                className="flex items-center justify-center w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
              >
                <RefreshCcw className="h-4 w-4 mr-2" />
                Reset
              </button>
            </div>
          </div>

          {/* Right Column - Results & Info */}
          <div className="bg-gray-50 p-6 rounded-lg">
            {hasCalculated ? (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800">Your Results</h2>
                <div className="bg-white p-6 rounded-lg shadow-inner">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Initial Investment</p>
                      <p className="text-xl font-bold text-gray-800">{formatCurrency(Number(formData.principal))}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Interest Earned</p>
                      <p className="text-xl font-bold text-green-600">{formatCurrency(result! - Number(formData.principal))}</p>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-500">Final Balance</p>
                      <p className="text-2xl font-extrabold text-blue-600">{formatCurrency(result!)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <Info className="h-16 w-16 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-500">Calculate to see your results</h3>
                <p className="text-sm text-gray-400">
                  Enter your details on the left and click "Calculate" to see how much your savings could grow.
                </p>
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-700 flex items-center">
                <Info className="h-5 w-5 text-blue-500 mr-2" />
                About This Calculator
              </h3>
              <div className="mt-2 text-sm text-gray-500 space-y-2">
                <p>
                  This calculator uses the compound interest formula: A = P(1 + r/n)^(nt)
                </p>
                <p>
                  Where: A = Final amount, P = Principal, r = Annual interest rate (decimal),
                  n = Compounding frequency per year, t = Time in years
                </p>
                <p>
                  The results shown are estimates and actual returns may vary based on fees,
                  taxes, and other factors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
