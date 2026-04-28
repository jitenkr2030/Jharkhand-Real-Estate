'use client';

import React, { useState, useEffect } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Select } from './Input';
import { Calculator, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { calculateEMI, generateAmortizationSchedule, formatPrice } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function EMICalculator() {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('8.5');
  const [tenure, setTenure] = useState('20');
  const [result, setResult] = useState<{
    emi: number;
    totalInterest: number;
    totalPayment: number;
    schedule: { month: number; principal: number; interest: number; balance: number }[];
  } | null>(null);

  const handleCalculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(interestRate);
    const t = parseFloat(tenure);

    if (p > 0 && r > 0 && t > 0) {
      const emi = calculateEMI(p, r, t);
      const totalPayment = emi * t * 12;
      const totalInterest = totalPayment - p;
      const schedule = generateAmortizationSchedule(p, r, t);

      setResult({
        emi,
        totalInterest,
        totalPayment,
        schedule: schedule.filter((_, i) => i % 12 === 0 || i === schedule.length - 1),
      });
    }
  };

  useEffect(() => {
    if (principal) {
      handleCalculate();
    }
  }, [principal, interestRate, tenure]);

  const pieData = result
    ? [
        { name: 'Principal', value: parseFloat(principal), color: '#0ea5e9' },
        { name: 'Interest', value: result.totalInterest, color: '#f59e0b' },
      ]
    : [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary-600" />
            EMI Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Input
              label="Loan Amount (₹)"
              type="number"
              placeholder="e.g. 3000000"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              helperText="Enter property price minus down payment"
            />
            <Input
              label="Interest Rate (% p.a.)"
              type="number"
              step="0.1"
              placeholder="e.g. 8.5"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
            <Select
              label="Tenure (Years)"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              options={[
                { value: '5', label: '5 Years' },
                { value: '10', label: '10 Years' },
                { value: '15', label: '15 Years' },
                { value: '20', label: '20 Years' },
                { value: '25', label: '25 Years' },
                { value: '30', label: '30 Years' },
              ]}
            />
          </div>

          {result && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-primary-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Monthly EMI</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {formatPrice(result.emi)}
                  </p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {formatPrice(result.totalInterest)}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Total Payment</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatPrice(result.totalPayment)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Principal Amount</p>
                  <p className="text-2xl font-bold text-gray-600">
                    {formatPrice(parseFloat(principal))}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie chart */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Payment Breakdown</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatPrice(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Line chart */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-4">Balance Over Time</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={result.schedule}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="month"
                          tickFormatter={(v) => `Y${Math.floor(v / 12)}`}
                          stroke="#6b7280"
                        />
                        <YAxis
                          tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`}
                          stroke="#6b7280"
                        />
                        <Tooltip
                          formatter={(value: number) => formatPrice(value)}
                          labelFormatter={(label) => `Year ${Math.floor(Number(label) / 12)}`}
                        />
                        <Line
                          type="monotone"
                          dataKey="balance"
                          stroke="#0ea5e9"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">Note: This is an approximate calculation</p>
          <p>
            Actual EMI may vary slightly based on processing fees, interest rate variations, and exact loan disbursement date.
            Contact your bank for precise calculations.
          </p>
        </div>
      </div>
    </div>
  );
}