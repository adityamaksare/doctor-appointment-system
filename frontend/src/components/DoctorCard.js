import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar, FaUserMd } from 'react-icons/fa';
import '../styles/DoctorCard.css';

const DoctorCard = ({ doctor }) => {
  // Display doctor rating with stars
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full_${i}`} className="text-warning" />);
    }

    // Add half star if needed
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-warning" />);
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty_${i}`} className="text-warning" />);
    }

    return stars;
  };

  // Helper function to determine gender based on name
  const determineGender = (name) => {
    // Common Indian female name patterns
    const femalePatterns = [
      'priya', 'sunita', 'neha', 'meenakshi', 'anita', 
      'rekha', 'deepa', 'sneha', 'anjali', 'pooja', 
      'kavita', 'nisha', 'divya', 'shalini'
    ];
    
    // Common Indian male name patterns - explicit list for certainty
    const malePatterns = [
      'rajesh', 'ashok', 'karan', 'vikram', 'sanjay', 
      'vijay', 'rahul', 'aditya', 'amit', 'suresh',
      'ramesh', 'pankaj', 'deepak', 'aman', 'arjun'
    ];
    
    // Convert name to lowercase for comparison
    const lowerName = name.toLowerCase();
    
    // Explicit check for the confirmed male doctors
    if (lowerName.includes('ashok') || 
        lowerName.includes('vikram') || 
        lowerName.includes('sanjay') || 
        lowerName.includes('vijay')) {
      return 'male';
    }
    
    // Check if name contains any female patterns
    for (const pattern of femalePatterns) {
      if (lowerName.includes(pattern)) {
        return 'female';
      }
    }
    
    // Check if name contains any male patterns
    for (const pattern of malePatterns) {
      if (lowerName.includes(pattern)) {
        return 'male';
      }
    }
    
    // If we can't determine from the patterns, try prefixes
    if (lowerName.startsWith('dr. mrs') || lowerName.startsWith('mrs') || 
        lowerName.startsWith('ms') || lowerName.startsWith('miss')) {
      return 'female';
    }
    
    if (lowerName.startsWith('dr. mr') || lowerName.startsWith('mr')) {
      return 'male';
    }
    
    // Default to male if we can't determine (can be changed as needed)
    return 'male';
  };

  // Create a hash from the doctor's name for consistent image selection
  const getNameHash = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash) + name.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  // Generate doctor image URL or use placeholder
  const getImageUrl = () => {
    // If a doctor has a profileImage property, use it
    if (doctor.profileImage) {
      return `/images/doctors/${doctor.profileImage}`;
    }

    // Determine the gender based on the doctor's name
    const gender = determineGender(doctor.user.name);
    
    // Generate a consistent hash value from the doctor's name
    const nameHash = getNameHash(doctor.user.name);
    
    if (gender === 'female') {
      // We have 8 unique female doctor images
      const imageNum = (nameHash % 8) + 1;
      return `/images/doctors/female-doctor-${imageNum}.jpg`;
    } else {
      // We have 8 unique male doctor images
      const imageNum = (nameHash % 8) + 1;
      return `/images/doctors/male-doctor-${imageNum}.jpg`;
    }
  };

  return (
    <Card className="doctor-card h-100 shadow-sm">
      <div className="doctor-image-container">
        <img 
          src={getImageUrl()} 
          alt={doctor.user.name} 
        />
        <div className="specialization-badge">
          {doctor.specialization}
        </div>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="card-title">{doctor.user.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {doctor.experience} years experience
        </Card.Subtitle>
        
        <div className="rating-container">
          <div className="rating-stars">
            {renderRating(doctor.rating)}
          </div>
          <span className="review-count">({doctor.reviewCount})</span>
        </div>
        
        <Card.Text className="mb-2">
          <span className="fees">₹{doctor.fees}</span>
        </Card.Text>
        
        <Card.Text className="doctor-bio mb-3 flex-grow-1">
          {doctor.bio ? (doctor.bio.length > 100 ? `${doctor.bio.substring(0, 100)}...` : doctor.bio) : 'No bio available.'}
        </Card.Text>
        
        <Button 
          as={Link} 
          to={`/doctors/${doctor._id}`} 
          variant="primary" 
          className="action-button w-100 mt-auto"
        >
          View Profile & Book
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DoctorCard; 