import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import Navb from '../component/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch('https://backend-4bulcle1i-srijans-projects-5421643c.vercel.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Login successful!');
                setEmail('');
                setPassword('');
                localStorage.setItem("authToken", data.authToken);
                localStorage.setItem("email", email);
                console.log(localStorage.getItem("authToken"))
                navigate('/')
            } else {
                setError(data.message || 'Failed to login');
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
                        <Card.Title>Login</Card.Title>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formEmail">
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
                            <Button variant="primary" type="submit" className="btn btn-success m-3">
                                Login
                            </Button>
                            <Link to="/signup" className="btn btn-danger m-3">Create an Account</Link>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default LoginPage;

