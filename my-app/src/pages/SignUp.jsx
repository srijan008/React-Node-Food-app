import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import Navb from '../component/Navbar';
import { Link } from 'react-router-dom';

const CreateUserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        try {
            const response = await fetch('https://backend-4bulcle1i-srijans-projects-5421643c.vercel.app/api/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, location })
            });

            const data = await response.json();
            

            if (response.ok) {
                setSuccessMessage('User created successfully!');
                setName('');
                setEmail('');
                setPassword('');
                setLocation('');
            } else {
                setError(data.message || 'Failed to create user');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <Navb />
            <Container className="mt-5">
                <Card>
                    <Card.Body>
                        <Card.Title>Create User</Card.Title>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail" className="mt-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formLocation" className="mt-3">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="btn btn-success m-3">
                                Submit
                            </Button>
                            <Link to="/login" className="btn btn-danger m-3">Already a user</Link>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default CreateUserForm;
