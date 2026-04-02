import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, AlertTriangle, PackageCheck } from 'lucide-react';

const ProductList = ({ products, onEdit, onDelete }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="product-grid" style={{ marginTop: '1rem' }}>
      <AnimatePresence>
        {products.map((product, index) => {
          const isLowStock = product.quantity < product.minStock;

          return (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              key={product._id}
              className="product-item"
            >
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>
                  <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{product.category}</span>
                  <span>•</span>
                  <span>Qty: {product.quantity}</span>
                  {isLowStock ? (
                    <span className="badge badge-danger">
                      <AlertTriangle size={12} className="mr-1" style={{ marginRight: '4px' }} />
                      Low Stock
                    </span>
                  ) : (
                    <span className="badge badge-success">
                      <PackageCheck size={12} className="mr-1" style={{ marginRight: '4px' }} />
                      In Stock
                    </span>
                  )}
                </p>
                <div style={{ marginTop: '0.25rem' }}>
                  <span className="product-price">{formatCurrency(product.price)}</span>
                </div>
              </div>
              
              <div className="product-actions" style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => onEdit(product)} 
                  className="btn btn-secondary" 
                  style={{ padding: '0.5rem', background: 'transparent' }}
                  title="Edit Product"
                >
                  <Edit2 size={18} style={{ color: 'var(--primary)' }} />
                </button>
                <button 
                  onClick={() => onDelete(product._id)} 
                  className="btn btn-secondary" 
                  style={{ padding: '0.5rem', background: 'transparent' }}
                  title="Delete Product"
                >
                  <Trash2 size={18} style={{ color: 'var(--danger)' }} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ProductList;
