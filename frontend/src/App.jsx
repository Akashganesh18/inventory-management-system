import React, { useState, useEffect } from 'react';
import * as api from './services/api';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import Analytics from './components/Analytics';
import ExportButtons from './components/ExportButtons';
import { Package, Activity } from 'lucide-react';
import './index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getProducts();
      if (res.success) {
        setProducts(res.data);
      }
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (productData) => {
    try {
      const res = await api.createProduct(productData);
      if (res.success) {
        fetchProducts();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding product');
    }
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      const res = await api.updateProduct(id, productData);
      if (res.success) {
        setEditingProduct(null);
        fetchProducts();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await api.deleteProduct(id);
      if (res.success) {
        fetchProducts();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting product');
    }
  };

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory ? product.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app-container">
      <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>
          <Package style={{ color: 'var(--primary)', marginRight: '0.75rem' }} size={32} />
          Inventory Pro
        </h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <ExportButtons products={filteredProducts} />
          <div className="btn btn-secondary" style={{ pointerEvents: 'none' }}>
            <Activity size={18} />
            <span className="ml-2" style={{ marginLeft: '0.5rem' }}>{products.length} Items</span>
          </div>
        </div>
      </header>

      <Analytics products={products} />

      {error && <div className="glass-panel" style={{color: 'var(--danger)', marginBottom: '2rem'}}>{error}</div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="glass-panel">
          <h2 style={{marginBottom: '1.5rem', fontSize: '1.25rem'}}>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <ProductForm 
            onSubmit={editingProduct ? (data) => handleUpdateProduct(editingProduct._id, data) : handleAddProduct}
            editingProduct={editingProduct}
            onCancel={() => setEditingProduct(null)}
          />
        </div>

        <div className="glass-panel">
          <div className="search-filter-bar">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Filter 
              filterCategory={filterCategory} 
              setFilterCategory={setFilterCategory} 
              categories={categories} 
            />
          </div>

          {loading ? (
            <div className="empty-state">
              <div style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', marginTop: '2rem' }}>Loading Inventory Data...</div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <Package size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
              <p>No products found matching your criteria.</p>
            </div>
          ) : (
            <ProductList 
              products={filteredProducts} 
              onEdit={setEditingProduct} 
              onDelete={handleDeleteProduct} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
