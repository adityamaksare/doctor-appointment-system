import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

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

  return (
    <Card className="doctor-card">
      <Card.Body>
        <Card.Title>{doctor.user.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {doctor.specialization} | {doctor.experience} years exp.
        </Card.Subtitle>
        
        <div className="mb-2">
          {renderRating(doctor.rating)}
          <span className="ms-1">({doctor.reviewCount} reviews)</span>
        </div>
        
        <Card.Text>
          <strong>Fees:</strong> ₹{doctor.fees}
        </Card.Text>
        
        <Card.Text className="mb-3">
          {doctor.bio.substring(0, 100)}...
        </Card.Text>
        
        <Button 
          as={Link} 
          to={`/doctors/${doctor._id}`} 
          variant="primary" 
          className="w-100"
        >
          View Profile & Book
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DoctorCard; 