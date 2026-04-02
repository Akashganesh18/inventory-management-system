import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div style={{ position: 'relative', flex: '1 1 auto' }}>
      <Search 
        size={18} 
        style={{ 
          position: 'absolute', 
          left: '12px', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          color: 'var(--text-secondary)' 
        }} 
      />
      <input
        type="text"
        placeholder="Search inventory..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ 
          width: '100%', 
          padding: '0.75rem 1rem 0.75rem 2.5rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          fontSize: '0.95rem'
        }}
      />
    </div>
  );
};

export default SearchBar;
