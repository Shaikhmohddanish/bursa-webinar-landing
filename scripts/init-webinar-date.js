/**
 * This script initializes or updates the webinar date in the database
 * to the upcoming Sunday's date.
 * 
 * Run with: node scripts/init-webinar-date.js
 */

const { MongoClient } = require('mongodb');

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

async function initWebinarDate() {
  try {
    const uri = 'mongodb+srv://exceptionshandler007:OnlyForAdmins007@cluster0.llah8.mongodb.net/';
    const client = new MongoClient(uri);
    
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('freelance');
    const upcomingSunday = getUpcomingSundayDate();
    
    // Update or create webinar settings with the upcoming Sunday date
    const result = await db.collection('bursa').updateOne(
      { type: 'webinarSettings' },
      { $set: { webinarDate: upcomingSunday } },
      { upsert: true }
    );
    
    if (result.upsertedCount > 0) {
      console.log(`Created webinar settings with date: ${upcomingSunday}`);
    } else if (result.modifiedCount > 0) {
      console.log(`Updated webinar date to: ${upcomingSunday}`);
    } else {
      console.log(`Webinar date was already set to: ${upcomingSunday}`);
    }
    
    await client.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the initialization function
initWebinarDate();
