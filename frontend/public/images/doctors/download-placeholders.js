const fs = require('fs');
const https = require('https');
const path = require('path');

// Array of male doctor image URLs - these are free stock photos of doctors
const maleDoctorUrls = [
  // Male doctor 1 - male doctor with stethoscope
  'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg',
  
  // Male doctor 2 - male doctor in blue scrubs
  'https://img.freepik.com/free-photo/portrait-smiling-young-doctor-healthcare-workers-medicine-covid-concept_1258-84060.jpg',
  
  // Male doctor 3 - male doctor with white coat
  'https://img.freepik.com/free-photo/portrait-doctor_144627-39381.jpg',

  // Male doctor 4 - male doctor with glasses
  'https://img.freepik.com/free-photo/medium-shot-doctor-with-crossed-arms_23-2148498043.jpg',
  
  // Male doctor 5 - male doctor smiling
  'https://img.freepik.com/free-photo/portrait-successful-mid-adult-doctor-with-crossed-arms_1262-12865.jpg',
  
  // Male doctor 6 - male doctor in medical office
  'https://img.freepik.com/free-photo/handsome-young-male-doctor-with-stethoscope-standing-against-blue-background_662251-343.jpg',
  
  // Male doctor 7 - male doctor with tablet
  'https://img.freepik.com/free-photo/doctor-with-tablet-stethoscope_1258-16587.jpg',
  
  // Male doctor 8 - mature male doctor
  'https://img.freepik.com/free-photo/african-american-medical-doctor-man-with-mask-isolated-gray-background_231208-2230.jpg'
];

// Array of female doctor image URLs
const femaleDoctorUrls = [
  // Female doctor 1 - female doctor with stethoscope
  'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg',
  
  // Female doctor 2 - female doctor with arms crossed
  'https://img.freepik.com/free-photo/portrait-doctor_144627-39387.jpg',
  
  // Female doctor 3 - young female doctor
  'https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827776.jpg',
  
  // Female doctor 4 - female doctor with tablet
  'https://img.freepik.com/free-photo/portrait-smiling-young-woman-doctor-healthcare-medical-worker-pointing-fingers-left-showing-clinics-logo-promo-standing-white-background_1258-88022.jpg',
  
  // Female doctor 5 - mature female doctor
  'https://img.freepik.com/free-photo/mature-doctor-with-clipboard-white-background_53876-147255.jpg',
  
  // Female doctor 6 - female doctor in lab coat
  'https://img.freepik.com/free-photo/front-view-doctor-with-medical-mask-posing-with-crossed-arms_23-2148445082.jpg',
  
  // Female doctor 7 - female doctor with clipboard
  'https://img.freepik.com/free-photo/medium-shot-doctor-holding-clipboard_23-2149285484.jpg',
  
  // Female doctor 8 - female doctor smiling
  'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg'
];

// Download male doctor images
maleDoctorUrls.forEach((url, index) => {
  const imagePath = path.join(__dirname, `male-doctor-${index + 1}.jpg`);
  
  console.log(`Downloading male doctor image ${index + 1} to ${imagePath}...`);
  
  https.get(url, (response) => {
    // Handle redirects
    if (response.statusCode === 301 || response.statusCode === 302) {
      console.log(`Redirecting to ${response.headers.location}...`);
      https.get(response.headers.location, (redirectResponse) => {
        redirectResponse.pipe(fs.createWriteStream(imagePath));
      });
      return;
    }
    
    // Create file stream
    const fileStream = fs.createWriteStream(imagePath);
    
    // Pipe the response to the file
    response.pipe(fileStream);
    
    // Handle completion
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Downloaded male doctor image ${index + 1}`);
    });
    
    // Handle errors
    fileStream.on('error', (err) => {
      console.error(`Error writing file ${imagePath}:`, err);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${url}:`, err);
  });
});

// Download female doctor images
femaleDoctorUrls.forEach((url, index) => {
  const imagePath = path.join(__dirname, `female-doctor-${index + 1}.jpg`);
  
  console.log(`Downloading female doctor image ${index + 1} to ${imagePath}...`);
  
  https.get(url, (response) => {
    // Handle redirects
    if (response.statusCode === 301 || response.statusCode === 302) {
      console.log(`Redirecting to ${response.headers.location}...`);
      https.get(response.headers.location, (redirectResponse) => {
        redirectResponse.pipe(fs.createWriteStream(imagePath));
      });
      return;
    }
    
    // Create file stream
    const fileStream = fs.createWriteStream(imagePath);
    
    // Pipe the response to the file
    response.pipe(fileStream);
    
    // Handle completion
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Downloaded female doctor image ${index + 1}`);
    });
    
    // Handle errors
    fileStream.on('error', (err) => {
      console.error(`Error writing file ${imagePath}:`, err);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${url}:`, err);
  });
}); 