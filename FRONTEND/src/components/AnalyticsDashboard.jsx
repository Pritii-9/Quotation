import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import axios from 'axios';

// Colors for the Pie Chart slices
const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#F43F5E', '#8B5CF6'];

const AnalyticsDashboard = () => {
  const [data, setData] = useState({
    stats: { totalRevenue: 0, conversionRate: 0 },
    quotesPerDay: [],
    itemDistribution: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        
        const response = await axios.get('http://localhost:5000/api/analytics', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setData(response.data);
      } catch (error) {
        console.error("Error loading analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg font-medium text-gray-500">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Analytics Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Total Revenue Generated
          </h2>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            ${data.stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Conversion Rate (Quotes to Receipts)
          </h2>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {data.stats.conversionRate}%
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Line Chart: Quotes per Day */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-6 text-gray-800">Quotes Generated (Last 30 Days)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.quotesPerDay} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="date" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                <Line type="monotone" dataKey="quotes" name="Quotes" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Rate Management Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-6 text-gray-800">Rate Items Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.itemDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {data.itemDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsDashboard;