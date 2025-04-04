import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Map of routes to their page titles
const pageTitles = {
  '/': 'Home',
  '/login': 'Sign In',
  '/register': 'Create Account',
  '/doctors': 'Find Doctors',
  '/profile': 'Your Profile',
  '/appointments': 'Your Appointments',
  '/patient-dashboard': 'Patient Dashboard',
  '/doctor-dashboard': 'Doctor Dashboard',
  '/help-support': 'Help & Support'
};

/**
 * Custom hook that updates the page title based on the current route
 * @param {string} defaultTitle - Default title to use if route isn't found in the map
 */
const usePageTitle = (defaultTitle = 'MedConnect') => {
  const location = useLocation();
  
  useEffect(() => {
    // Get the base path (handle dynamic routes)
    const pathname = location.pathname;
    
    // First check for exact path matches
    if (pageTitles[pathname]) {
      document.title = `${pageTitles[pathname]} | ${defaultTitle}`;
      return;
    }
    
    // Handle dynamic routes
    if (pathname.startsWith('/doctors/')) {
      document.title = `Doctor Profile | ${defaultTitle}`;
      return;
    }
    
    if (pathname.startsWith('/appointments/')) {
      document.title = `Appointment Details | ${defaultTitle}`;
      return;
    }
    
    // Default fallback
    document.title = defaultTitle;
  }, [location, defaultTitle]);
};

export default usePageTitle; 