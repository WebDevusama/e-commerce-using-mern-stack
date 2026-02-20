import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import './ProfileCard.css'
import { useNavigate } from "react-router-dom";

export default function CardGroup() {
    const navigate = useNavigate();

  return (
    <Container fluid="lg" className="mt-4">

      <div className="homepage-wrapper">

        <Row className="gy-4 align-items-start">

          {/* Categories */}
          <Col xs={12} md={3} lg={3}>
            <Card className="h-100">
              <Card.Header className="fw-bold">
                Featured Categories
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>Automobiles</ListGroup.Item>
                <ListGroup.Item>Clothes & Wearables</ListGroup.Item>
                <ListGroup.Item>Home & Kitchen</ListGroup.Item>
                <ListGroup.Item>Computers & Tech</ListGroup.Item>
                <ListGroup.Item>Tools & Equipment</ListGroup.Item>
                <ListGroup.Item>Sports & Outdoors</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>

          {/* Home Image */}
          <Col xs={12} md={6} lg={6} className="text-center">
            <img
              src="/assets/Images/homeimage.jpg"
              alt="Home"
              className="img-fluid rounded w-100"
            />
          </Col>

          {/* Profile Card */}
          <Col xs={12} md={3} lg={3} className="d-flex justify-content-center">
            <Card className="text-center shadow-sm w-100 h-100">
              <Card.Body className="d-flex flex-column align-items-center">

                {/* Profile Image: scales with screen */}
                <img
                  src="/assets/Images/profile-image.jpg"
                  alt="User Profile"
                  className="rounded-circle mb-3 profile-img"
                />

                {/* User Info */}
                <Card.Title className="fw-bold text-center">Guest User</Card.Title>
                <Card.Text className="text-muted small text-center">
                  Please login to continue
                </Card.Text>

                {/* Buttons */}
                <div className="d-grid gap-2 mb-2 w-100">
                  <Button  onClick={() => navigate("/Login")} variant="primary" size="sm">Login</Button>
                  <Button  onClick={() => navigate("/Signup")} variant="outline-secondary" size="sm">Sign-up</Button>

                </div>

                {/* Offers */}
                <p className="p-1 rounded text-white mb-1 w-100" style={{ backgroundColor: '#ff9800', fontSize: '0.8rem' }}>
                  Get US $10 off with a new Supplier
                </p>
                <p className="p-1 rounded mb-0 w-100" style={{ backgroundColor: '#fff176', fontSize: '0.8rem' }}>
                  Send quotes with Supplier Preferences
                </p>

              </Card.Body>
            </Card>
          </Col>

        </Row>
      </div>
    </Container>
    
    
  )
}
