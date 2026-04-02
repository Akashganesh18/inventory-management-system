import React from 'react';
import { Filter as FilterIcon } from 'lucide-react';

const Filter = ({ filterCategory, setFilterCategory, categories }) => {
  return (
    <div style={{ position: 'relative', flex: '1 1 auto' }}>
      <FilterIcon 
        size={18} 
        style={{ 
          position: 'absolute', 
          left: '12px', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          color: 'var(--text-secondary)',
          pointerEvents: 'none'
        }} 
      />
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        style={{ 
          width: '100%', 
          padding: '0.75rem 1rem 0.75rem 2.5rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          fontSize: '0.95rem',
          appearance: 'none',
          backgroundColor: '#fff',
          cursor: 'pointer'
        }}
      >
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      
      {/* Custom select chevron */}
      <div style={{
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        color: 'var(--text-secondary)'
      }}>
        <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="16"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </div>
  );
};

export default Filter;
