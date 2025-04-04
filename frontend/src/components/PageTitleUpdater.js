import React from 'react';
import usePageTitle from '../hooks/usePageTitle';

/**
 * Component that updates the page title based on the current route
 * This is a wrapper component with no visual elements
 */
const PageTitleUpdater = () => {
  // Use the custom hook to update the page title
  usePageTitle('MedConnect');
  
  // This component doesn't render anything
  return null;
};

export default PageTitleUpdater; 