// This file acts as a proxy for the Google Apps Script endpoint to avoid CORS issues and keep the endpoint private.
// Place this file in /pages/api/contact-proxy.js for Next.js (Vercel) API routes.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the JSON body
    const formData = req.body;
    
    // Log the received data for debugging
    console.log('Received form data:', formData);
    
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbzC0Ulljj-ih_QkUeWMODGPlZUK1-TPEGomtKHxHPnSDdKpzqHOMSHL9iXrCzsg2VsI/exec',
      {
        method: 'POST',
        // Google Apps Script expects form data as application/x-www-form-urlencoded or FormData, not JSON
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      }
    );
    
    // Note: Depending on how your Google Script responds, you may need to adjust this
    // Some Google Scripts don't return proper JSON
    try {
      const data = await response.json();
      return res.status(200).json(data);
    } catch (e) {
      // If the Google Script doesn't return valid JSON, just return success
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error('Error submitting to Google Script:', error);
    return res.status(500).json({ error: 'Failed to send data to Google Script' });
  }
}
