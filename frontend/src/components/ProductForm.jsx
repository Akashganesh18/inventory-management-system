import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, editingProduct, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    minStock: ''
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        category: editingProduct.category,
        price: editingProduct.price,
        quantity: editingProduct.quantity,
        minStock: editingProduct.minStock
      });
    } else {
      setFormData({ name: '', category: '', price: '', quantity: '', minStock: '' });
    }
  }, [editingProduct]);

  const { name, category, price, quantity, minStock } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      category,
      price: Number(price),
      quantity: Number(quantity),
      minStock: Number(minStock)
    });
    if (!editingProduct) {
      setFormData({ name: '', category: '', price: '', quantity: '', minStock: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end' }}>
        <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
          <label>Product Name</label>
          <input type="text" name="name" value={name} onChange={onChange} required placeholder="e.g., Wireless Mouse" />
        </div>

        <div className="form-group" style={{ flex: '1 1 180px', marginBottom: 0 }}>
          <label>Category</label>
          <input type="text" name="category" value={category} onChange={onChange} required placeholder="e.g., Electronics" />
        </div>

        <div className="form-group" style={{ flex: '1 1 120px', marginBottom: 0 }}>
          <label>Price (₹)</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', top: '8px', color: 'var(--text-secondary)' }}>₹</span>
            <input type="number" min="0" name="price" value={price} onChange={onChange} required style={{ paddingLeft: '30px' }} placeholder="0.00" />
          </div>
        </div>

        <div className="form-group" style={{ flex: '1 1 100px', marginBottom: 0 }}>
          <label>Quantity</label>
          <input type="number" min="0" name="quantity" value={quantity} onChange={onChange} required placeholder="0" />
        </div>

        <div className="form-group" style={{ flex: '1 1 100px', marginBottom: 0 }}>
          <label>Min. Stock</label>
          <input type="number" min="0" name="minStock" value={minStock} onChange={onChange} required placeholder="0" />
        </div>

        <div style={{ flex: '1 1 150px', display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '0.45rem', fontSize: '0.9rem' }}>
            {editingProduct ? 'Save' : 'Add'}
          </button>
          {editingProduct && (
            <button type="button" onClick={onCancel} className="btn btn-secondary" style={{ padding: '0.45rem', fontSize: '0.9rem' }}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
