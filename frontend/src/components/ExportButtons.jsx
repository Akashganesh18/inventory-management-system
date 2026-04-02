import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download, FileText } from 'lucide-react';

const ExportButtons = ({ products }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const exportCSV = () => {
    if (!products.length) return alert('No data to export');
    
    const headers = ['Name', 'Category', 'Price (INR)', 'Quantity', 'Min Stock'];
    const csvContent = [
      headers.join(','),
      ...products.map(p => `"${p.name}","${p.category}",${p.price},${p.quantity},${p.minStock}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'inventory_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    if (!products.length) return alert('No data to export');

    const doc = new jsPDF();
    
    // Title styling
    doc.setFontSize(20);
    doc.setTextColor(15, 23, 42); // slate 900
    doc.text('Inventory Pro - Central Report', 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // slate 500
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 28);
    
    const tableColumn = ["Name", "Category", "Price", "Quantity", "Min Stock Level"];
    const tableRows = [];

    products.forEach(p => {
      // Avoid unicode issues in jsPDF default helvetica by using "Rs." instead of "₹"
      const pData = [p.name, p.category, `Rs. ${p.price.toLocaleString('en-IN')}`, p.quantity, p.minStock];
      tableRows.push(pData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] }, // primary blue
      styles: { font: 'helvetica', fontSize: 10, cellPadding: 4 },
    });

    doc.save('inventory_report.pdf');
  };

  return (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <button onClick={exportCSV} className="btn btn-secondary" title="Export as CSV">
        <Download size={16} />
        <span style={{ marginLeft: '6px' }}>CSV</span>
      </button>
      <button onClick={exportPDF} className="btn btn-primary" title="Export as PDF">
        <FileText size={16} />
        <span style={{ marginLeft: '6px' }}>PDF Review</span>
      </button>
    </div>
  );
};

export default ExportButtons;
