import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Thermometer, ShieldCheck, ChevronRight } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { id, name, subtitle, shortDesc, badge, technicalSpecs, colorCode } = product;

  return (
    <article className="product-card-holder glass-panel ani-fade-in">
      {/* Card Badge with Dynamic Accent Color Border */}
      <div className="card-top-accent" style={{ background: colorCode }}></div>
      
      <div className="product-card-body">
        <span className="product-badge" style={{ borderColor: colorCode, color: id === 'white-masterbatch' ? 'var(--text-primary)' : colorCode }}>
          {badge}
        </span>
        
        <h3 className="product-card-title">{name}</h3>
        <p className="product-card-subtitle">{subtitle}</p>
        <p className="product-card-desc">{shortDesc}</p>

        {/* Technical Parameters Bullet Highlights */}
        <div className="product-spec-preview">
          <div className="spec-preview-item">
            <Layers size={15} className="spec-icon" />
            <span className="spec-label">Carrier:</span>
            <span className="spec-val">{technicalSpecs['Carrier Resin']}</span>
          </div>
          <div className="spec-preview-item">
            <Thermometer size={15} className="spec-icon" />
            <span className="spec-label">Thermal Safety:</span>
            <span className="spec-val">{technicalSpecs['Heat Stability']}</span>
          </div>
          <div className="spec-preview-item">
            <ShieldCheck size={15} className="spec-icon" />
            <span className="spec-label">Light Stability:</span>
            <span className="spec-val">{technicalSpecs['Light Fastness'] || 'N/A'}</span>
          </div>
        </div>

        {/* B2B Actions */}
        <div className="product-card-footer">
          <Link to={`/products?selected=${id}`} className="spec-doc-link">
            <span>Technical Datasheet</span>
            <ChevronRight size={14} />
          </Link>
          <Link to={`/contact?product=${id}`} className="btn btn-primary card-inquiry-btn">
            Get Quote
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
