import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Custom pre-filled WhatsApp link for industrial buyers
  const phoneNumber = "919876543210"; // Placeholder for MD TechKanpur sales desk
  const defaultMessage = encodeURIComponent("Hello MD TechKanpur, I am visiting your B2B portal and would like to inquire about your masterbatch products. Please connect me with a technical sales expert.");
  const waUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div 
      className="whatsapp-float-wrapper"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div className="whatsapp-tooltip ani-scale-in">
          <span className="tooltip-title">B2B Quick Quote Desk</span>
          <span className="tooltip-sub">Average response: 5 mins</span>
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
