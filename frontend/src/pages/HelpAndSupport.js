import React from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaComments, FaQuestionCircle, FaHeadset } from 'react-icons/fa';

const HelpAndSupport = () => {
  return (
    <div className="py-4">
      <Container>
        {/* Page Title */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">Help & Support</h1>
          <p className="lead text-muted">
            We're here to help with any questions you might have
          </p>
        </div>

        {/* Contact Cards */}
        <Row className="mb-5">
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center py-4 border-0 shadow-sm">
              <div className="text-center mb-3">
                <span style={{ fontSize: '3rem', color: 'var(--primary-blue)' }}>
                  <FaEnvelope />
                </span>
              </div>
              <Card.Body>
                <Card.Title className="fw-bold">Email Support</Card.Title>
                <Card.Text>
                  Send us an email and we'll respond within 24 hours.
                </Card.Text>
                <Button as="a" href="mailto:support@medconnect.com" variant="outline-primary" className="mt-3">
                  support@medconnect.com
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center py-4 border-0 shadow-sm">
              <div className="text-center mb-3">
                <span style={{ fontSize: '3rem', color: 'var(--primary-blue)' }}>
                  <FaPhone />
                </span>
              </div>
              <Card.Body>
                <Card.Title className="fw-bold">Phone Support</Card.Title>
                <Card.Text>
                  Call us directly for immediate assistance.
                </Card.Text>
                <Button as="a" href="tel:+18001234567" variant="outline-primary" className="mt-3">
                  1-800-123-4567
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center py-4 border-0 shadow-sm">
              <div className="text-center mb-3">
                <span style={{ fontSize: '3rem', color: 'var(--primary-blue)' }}>
                  <FaComments />
                </span>
              </div>
              <Card.Body>
                <Card.Title className="fw-bold">Live Chat</Card.Title>
                <Card.Text>
                  Chat with our support team in real-time.
                </Card.Text>
                <Button variant="outline-primary" className="mt-3">
                  Start Chat
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* FAQ Section */}
        <div className="mb-5">
          <h2 className="text-center mb-4 fw-bold">Frequently Asked Questions</h2>
          <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
              <h5 className="fw-bold mb-3"><FaQuestionCircle className="me-2 text-primary" /> How do I book an appointment?</h5>
              <p className="mb-0">
                You can book an appointment by browsing our doctors list, selecting a doctor, and choosing an available time slot that works for you. Follow the prompts to complete your booking.
              </p>
            </Card.Body>
          </Card>
          <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
              <h5 className="fw-bold mb-3"><FaQuestionCircle className="me-2 text-primary" /> How can I cancel or reschedule an appointment?</h5>
              <p className="mb-0">
                You can cancel or reschedule appointments from your patient dashboard. Navigate to "My Appointments" and use the reschedule or cancel options.
              </p>
            </Card.Body>
          </Card>
          <Card className="border-0 shadow-sm mb-3">
            <Card.Body>
              <h5 className="fw-bold mb-3"><FaQuestionCircle className="me-2 text-primary" /> Is my medical information secure?</h5>
              <p className="mb-0">
                Yes, we take data security very seriously. All your medical information is encrypted and stored securely following industry best practices and compliance standards.
              </p>
            </Card.Body>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="mb-5">
          <h2 className="text-center mb-4 fw-bold">Send Us a Message</h2>
          <Row>
            <Col lg={8} className="mx-auto">
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Your Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter your name" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control type="email" placeholder="Enter your email" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control type="text" placeholder="What is this regarding?" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Message</Form.Label>
                      <Form.Control as="textarea" rows={5} placeholder="How can we help you?" />
                    </Form.Group>
                    <div className="text-center">
                      <Button variant="primary" size="lg" className="px-5">
                        Send Message
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default HelpAndSupport; 