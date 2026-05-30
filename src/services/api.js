/**
 * B2B Inquiry Submission Service
 * 
 * Stores inquiries to localStorage and optionally 
 * generates a WhatsApp pre-filled message link.
 * Can be replaced with a real API endpoint later.
 */

const STORAGE_KEY = 'md-tech-inquiries';

/**
 * Submit a B2B inquiry form.
 * Simulates network latency and persists to localStorage.
 * @param {Object} formData - The inquiry form data
 * @returns {Promise<Object>} - The saved inquiry with ID and timestamp
 */
export const submitInquiry = async (formData) => {
  // Simulate network request delay for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Generate inquiry record
  const inquiry = {
    id: `INQ-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
    timestamp: new Date().toISOString(),
    status: 'pending',
    ...formData,
  };

  // Persist to localStorage
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.push(inquiry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.warn('Could not save inquiry to localStorage:', err);
  }

  return inquiry;
};

/**
 * Retrieve all stored inquiries from localStorage.
 * @returns {Array} - Array of inquiry objects
 */
export const getInquiries = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

/**
 * Generate a WhatsApp pre-filled message URL for quick B2B contact.
 * @param {Object} params - Message parameters
 * @param {string} params.productName - Product of interest
 * @param {string} params.companyName - Inquirer's company
 * @param {string} params.contactName - Contact person
 * @returns {string} - WhatsApp URL with pre-filled message
 */
export const generateWhatsAppLink = ({ productName, companyName, contactName }) => {
  const phone = '919876543210'; // MD TechKanpur Sales Desk
  const message = encodeURIComponent(
    `Hello MD TechKanpur,\n\nI am ${contactName} from ${companyName}. I am interested in your ${productName || 'polymer masterbatch products'}.\n\nPlease connect me with a technical sales representative for commercial pricing and sample availability.\n\nThank you.`
  );
  return `https://wa.me/${phone}?text=${message}`;
};
