import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON request body
    const formData = await request.json();
    
    // Log the received data for debugging
    console.log('Received form data:', formData);
    
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbzC0Ulljj-ih_QkUeWMODGPlZUK1-TPEGomtKHxHPnSDdKpzqHOMSHL9iXrCzsg2VsI/exec',
      {
        method: 'POST',
        // Google Apps Script expects form data as application/x-www-form-urlencoded
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      }
    );
    
    // Depending on how your Google Script responds, you may need to adjust this
    try {
      const data = await response.json();
      return NextResponse.json(data);
    } catch (e) {
      // If the Google Script doesn't return valid JSON, just return success
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Error submitting to Google Script:', error);
    return NextResponse.json({ error: 'Failed to send data to Google Script' }, { status: 500 });
  }
}
