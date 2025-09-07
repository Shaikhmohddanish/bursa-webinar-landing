'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../../components/ui/alert';

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

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [newDate, setNewDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Check if user is logged in from session storage
    const loggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      fetchCurrentDate();
    }
  }, []);

  const fetchCurrentDate = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/webinar-date');
      const data = await response.json();
      if (data.date) {
        setCurrentDate(data.date);
        setNewDate(data.date);
      } else {
        // If no date is returned, use the upcoming Sunday
        const defaultDate = getUpcomingSundayDate();
        setCurrentDate(defaultDate);
        setNewDate(defaultDate);
      }
    } catch (error) {
      setError('Failed to fetch current date');
      // In case of error, still set a default date
      const defaultDate = getUpcomingSundayDate();
      setCurrentDate(defaultDate);
      setNewDate(defaultDate);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsLoggedIn(true);
        sessionStorage.setItem('adminLoggedIn', 'true');
        await fetchCurrentDate();
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    setIsLoggedIn(false);
  };
  
  const handleDateUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch('/api/admin/webinar-date', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          date: newDate,
          authToken: 'logged_in' 
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCurrentDate(newDate);
        setSuccess('Webinar date updated successfully!');
        
        // Clear localStorage cache to ensure the main page gets the new date
        if (typeof window !== 'undefined') {
          try {
            localStorage.removeItem('webinarDateCache');
          } catch (err) {
            console.log('Could not clear localStorage cache:', err);
          }
        }
        
        // Notify user that the changes will be visible immediately
        setTimeout(() => {
          setSuccess('Date updated! Changes will be visible immediately on the main page.');
        }, 2000);
      } else {
        setError(data.message || 'Failed to update date');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-slate-800">Bursa Webinar Admin</h1>
        
        {!isLoggedIn ? (
          <Card>
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>Enter your credentials to access admin panel</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Email</Label>
                    <Input 
                      id="username" 
                      type="email" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin@bursawebinar.online" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                  
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Webinar Date Settings</CardTitle>
              <CardDescription>Update the date for the upcoming webinar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">Current Webinar Date:</p>
                  {isLoading ? (
                    <div className="h-7 w-32 bg-slate-200 animate-pulse rounded-md"></div>
                  ) : (
                    <p className="text-lg font-bold">{currentDate}</p>
                  )}
                </div>
                
                <form onSubmit={handleDateUpdate}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newDate">New Date</Label>
                      <Input 
                        id="newDate" 
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        placeholder="e.g., 20th October" 
                        required 
                      />
                      <p className="text-xs text-slate-500">
                        Format: 14th September, 20th October, etc.
                        <br/>
                        (Default is the upcoming Sunday: {getUpcomingSundayDate()})
                      </p>
                    </div>
                    
                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    
                    {success && (
                      <Alert className="bg-green-50 border-green-200 text-green-800">
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>{success}</AlertDescription>
                      </Alert>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Updating...' : 'Update Date'}
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
