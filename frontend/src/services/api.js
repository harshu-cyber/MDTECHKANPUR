/**
 * B2B Inquiry & Careers Submission Service
 * 
 * Sends requests to the backend API endpoints.
 */

/**
 * Submit a B2B inquiry form.
 * @param {Object} formData - The inquiry form data
 * @returns {Promise<Object>} - The saved inquiry
 */
export const submitInquiry = async (formData) => {
  const response = await fetch("/api/inquiries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to submit inquiry.");
  }
  return data.inquiry;
};

/**
 * Submit a careers job application form.
 * @param {Object} applicationData - The candidate details
 * @returns {Promise<Object>} - The saved application record
 */
export const submitApplication = async (applicationData) => {
  const response = await fetch("/api/applications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(applicationData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to submit application.");
  }
  return data.application;
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

/**
 * Fetch all customer reviews.
 * @returns {Promise<Array>} - List of reviews
 */
export const getReviews = async () => {
  const response = await fetch("/api/reviews");
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch reviews.");
  }
  return data;
};

/**
 * Submit a new customer review.
 * @param {Object} reviewData - The review form payload
 * @returns {Promise<Object>} - The saved review
 */
export const submitReview = async (reviewData) => {
  const response = await fetch("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to submit review.");
  }
  return data.review;
};
