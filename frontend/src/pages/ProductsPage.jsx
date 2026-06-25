import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, X, ChevronRight, Layers, Thermometer, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { products } from '../data/products';
import SEO from '../components/SEO/SEO';
import './ProductsPage.css';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Auto-select product from URL param
  useEffect(() => {
    const selectedId = searchParams.get('selected');
    const catParam = searchParams.get('category');
    if (selectedId) {
      const found = products.find(p => p.id === selectedId);
      if (found) setSelectedProduct(found);
    }
    if (catParam) setActiveCategory(catParam);
  }, [searchParams]);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'extruder', label: 'Extruders' },
    { id: 'moulding', label: 'Injection Moulding' },
    { id: 'auxiliary', label: 'Auxiliaries' },
    { id: 'spares', label: 'Spare Parts' },
    { id: 'raw_material', label: 'Raw Materials' },
  ];

  const filteredProducts = products.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = searchQuery.trim() === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="products-page-wrapper ani-fade-in">
      <SEO 
        title="Our Products & Machinery | MD TechKanpur"
        description="Browse our range of plastic extruders, injection moulding machines, auxiliary equipment, and plastic raw materials in Kanpur."
      />

      {/* Page Header */}
      <section className="products-hero">
        <div className="container">
          <span className="section-subtitle">Product Catalog</span>
          <h1 className="products-hero-title">Plastic Machinery &amp; Products</h1>
          <p className="products-hero-desc">
            Browse our range of plastic extruders, injection moulding machines, auxiliary equipment, spare parts,
            and raw material — all available for sale and AMC.
          </p>

          {/* Search Bar */}
          <div className="search-bar-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search machinery, extruders, parts, or polymer raw materials..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="product-search"
              aria-label="Search products"
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')} aria-label="Clear search">
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Category Filter Tabs */}
          <div className="products-filter-row">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`filter-chip ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                id={`filter-${cat.id}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Result Count */}
          <p className="result-count">
            Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> machinery products &amp; spares
          </p>

          {/* Products Full Grid */}
          <div className="products-full-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-full-card glass-panel">
                <div className="product-color-bar" style={{ background: product.colorCode }}></div>
                {product.img && (
                  <div className="product-card-image-wrapper">
                    <img src={product.img} alt={product.name} className="product-card-image" loading="lazy" />
                  </div>
                )}
                <div className="product-full-body">
                  <div className="product-full-header">
                    <div>
                      <span className="product-full-badge" style={{ borderColor: product.colorCode, color: product.colorCode }}>
                        {product.badge}
                      </span>
                      <h2 className="product-full-name">{product.name}</h2>
                      <p className="product-full-subtitle">{product.subtitle}</p>
                    </div>
                    <button
                      className="btn btn-primary view-spec-btn"
                      onClick={() => setSelectedProduct(product)}
                      id={`spec-btn-${product.id}`}
                    >
                      View Full Spec
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <p className="product-full-desc">{product.shortDesc}</p>

                  {/* Technical Specs Mini Grid */}
                  <div className="mini-spec-grid">
                    {Object.entries(product.technicalSpecs).slice(0, 4).map(([key, val]) => (
                      <div key={key} className="mini-spec-item">
                        <span className="mini-spec-key">{key}</span>
                        <span className="mini-spec-val" dangerouslySetInnerHTML={{ __html: val }}></span>
                      </div>
                    ))}
                  </div>

                  {/* Applications Pills */}
                  <div className="applications-row">
                    {product.applications.slice(0, 3).map((app, i) => (
                      <span key={i} className="app-pill">{app}</span>
                    ))}
                    {product.applications.length > 3 && (
                      <span className="app-pill more-pill">+{product.applications.length - 3} more</span>
                    )}
                  </div>

                  <div className="product-full-actions">
                    <Link to={`/contact?product=${product.id}`} className="btn btn-accent inquiry-btn">
                      Request Quote
                    </Link>
                    <Link to="/contact" className="btn btn-secondary tds-btn">
                      Download TDS
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Spec Modal */}
      {selectedProduct && (
        <div className="spec-modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="spec-modal glass-panel ani-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ borderLeft: `5px solid ${selectedProduct.colorCode}` }}>
              <div>
                <span className="modal-badge" style={{ color: selectedProduct.colorCode }}>
                  {selectedProduct.badge}
                </span>
                <h2 className="modal-title">{selectedProduct.name}</h2>
                <p className="modal-subtitle">{selectedProduct.subtitle}</p>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedProduct(null)} aria-label="Close specification modal">
                <X size={22} />
              </button>
            </div>

            <div className="modal-body">
              {selectedProduct.img && (
                <div className="modal-product-image-wrapper">
                  <img src={selectedProduct.img} alt={selectedProduct.name} className="modal-product-image" />
                </div>
              )}
              <p className="modal-full-desc">{selectedProduct.desc}</p>

              {/* Full Technical Properties Table */}
              <h3 className="modal-section-heading">
                <Activity size={16} />
                Technical Properties
              </h3>
              <div className="spec-table">
                {Object.entries(selectedProduct.technicalSpecs).map(([key, val]) => (
                  <div key={key} className="spec-table-row">
                    <span className="spec-table-key">{key}</span>
                    <span className="spec-table-val" dangerouslySetInnerHTML={{ __html: val }}></span>
                  </div>
                ))}
              </div>

              {/* Applications */}
              <h3 className="modal-section-heading">
                <Layers size={16} />
                Primary Applications
              </h3>
              <ul className="modal-app-list">
                {selectedProduct.applications.map((app, i) => (
                  <li key={i}>
                    <CheckCircle2 size={14} className="app-check" />
                    {app}
                  </li>
                ))}
              </ul>

              {/* Key Benefits */}
              <h3 className="modal-section-heading">
                <ShieldCheck size={16} />
                Processing Benefits
              </h3>
              <ul className="modal-benefit-list">
                {selectedProduct.keyBenefits.map((benefit, i) => (
                  <li key={i}>
                    <span className="benefit-bullet">✦</span>
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* CTA Inside Modal */}
              <div className="modal-cta-bar">
                <Link
                  to={`/contact?product=${selectedProduct.id}`}
                  className="btn btn-primary modal-cta-btn"
                  onClick={() => setSelectedProduct(null)}
                >
                  Request Sample / Commercial Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
