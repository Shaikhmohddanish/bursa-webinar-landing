import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

// Cache for 1 minute to reduce database calls
let cachedData = null;
let cacheTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute

// Function to get the upcoming Sunday's date in "14th September" format
function getUpcomingSundayDate() {
  const today = new Date();
  const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
  const daysToAdd = currentDay === 0 ? 7 : 7 - currentDay; // If today is Sunday, get next Sunday
  
  const nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + daysToAdd);
  
  // Format the date as "14th September"
  const day = nextSunday.getDate();
  const month = nextSunday.toLocaleString('en-US', { month: 'long' });
  
  // Add the ordinal suffix to the day
  let suffix = "th";
  if (day === 1 || day === 21 || day === 31) {
    suffix = "st";
  } else if (day === 2 || day === 22) {
    suffix = "nd";
  } else if (day === 3 || day === 23) {
    suffix = "rd";
  }
  
  return `${day}${suffix} ${month}`;
}

export async function GET() {
  try {
    // Check if we have a valid cache
    const now = Date.now();
    if (cachedData && (now - cacheTime < CACHE_DURATION)) {
      return NextResponse.json({ date: cachedData });
    }
    
    const client = await clientPromise;
    const db = client.db('freelance');
    
    const webinarSettings = await db.collection('bursa').findOne({ type: 'webinarSettings' });
    
    if (!webinarSettings) {
      // Get the upcoming Sunday as the default date
      const upcomingSunday = getUpcomingSundayDate();
      
      // Create default settings if none exists
      const defaultSettings = { type: 'webinarSettings', webinarDate: upcomingSunday };
      await db.collection('bursa').insertOne(defaultSettings);
      
      // Update cache
      cachedData = defaultSettings.webinarDate;
      cacheTime = now;
      
      return NextResponse.json({ date: defaultSettings.webinarDate });
    }
    
    // Update cache
    cachedData = webinarSettings.webinarDate;
    cacheTime = now;
    
    return NextResponse.json({ date: webinarSettings.webinarDate });
  } catch (error) {
    console.error('Error fetching webinar date:', error);
    
    // If there's an error but we have a cache, return that instead
    if (cachedData) {
      return NextResponse.json({ date: cachedData });
    }
    
    // Default fallback if no cache - use upcoming Sunday
    const upcomingSunday = getUpcomingSundayDate();
    return NextResponse.json({ date: upcomingSunday });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { date, authToken } = data;
    
    // Simple validation for authentication
    if (!authToken || authToken !== 'logged_in') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    
    if (!date) {
      return NextResponse.json({ success: false, message: 'Date is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('freelance');
    
    // Update or create the webinar settings
    await db.collection('bursa').updateOne(
      { type: 'webinarSettings' },
      { $set: { webinarDate: date } },
      { upsert: true }
    );
    
    // Update cache immediately with the new value
    cachedData = date;
    cacheTime = Date.now();
    
    return NextResponse.json({ success: true, message: 'Date updated successfully' });
  } catch (error) {
    console.error('Error updating webinar date:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
