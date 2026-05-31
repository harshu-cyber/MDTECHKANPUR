import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  // MD TechKanpur real WhatsApp number
  const phoneNumber = "917499645819";
  const defaultMessage = encodeURIComponent("Hello MD TechKanpur, I want to inquire about plastic machinery (extruders / injection moulding / auxiliary equipment). Please connect me with your sales team.");
  const waUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div 
      className="whatsapp-float-wrapper"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div className="whatsapp-tooltip ani-scale-in">
          <span className="tooltip-title">Chat on WhatsApp</span>
          <span className="tooltip-sub">Quick response guaranteed!</span>
        </div>
      )}
      <a 
        href={waUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-float-btn"
        aria-label="Contact MD TechKanpur on WhatsApp"
      >
        <div className="pulse-ring"></div>
        <MessageSquare className="wa-icon" size={24} fill="currentColor" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
