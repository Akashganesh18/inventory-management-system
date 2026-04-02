import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

const Analytics = ({ products }) => {
  const categoryData = useMemo(() => {
    const counts = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [products]);

  const topItemsData = useMemo(() => {
    return [...products]
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5)
      .map(p => ({ name: p.name, quantity: p.quantity }));
  }, [products]);

  if (!products || products.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid-layout" 
      style={{ marginBottom: '2rem' }}
    >
      <div className="glass-panel" style={{ height: '320px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Inventory by Category</h3>
        <div style={{ flex: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '8px', 
                  boxShadow: 'var(--shadow-lg)' 
                }} 
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-panel" style={{ height: '320px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Highest Volume Stock</h3>
        <div style={{ flex: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topItemsData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--text-secondary)" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
              <RechartsTooltip 
                cursor={{fill: 'rgba(59,130,246,0.05)'}}
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '8px', 
                  boxShadow: 'var(--shadow-lg)' 
                }} 
              />
              <Bar dataKey="quantity" fill="var(--primary)" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;
