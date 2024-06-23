import React from 'react';
import { useCart } from './ContextReducer';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Navb from './Navbar';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const email = localStorage.getItem("email");
    const navigate = useNavigate();
    const data = useCart();
    const cartItems = data.state;

    const handleSendData = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("/api/orderdata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                email: localStorage.getItem("email"), 
                order_date: new Date().toISOString(), 
                order_data: cartItems 
            })
        });

        if (!response.ok) {
            console.error('Response not ok:', response.status, response.statusText);
            const errorResponse = await response.text();
            throw new Error(errorResponse);
        }

        const result = await response.json();

        if (result.ok) {
            while (data.state.length > 0) {
                data.dispatch({ type: 'REMOVE', index: 0 });
            }
            navigate('/');
            console.log('Order created successfully');
        } else {
            console.log('Failed to create order:', result.message);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
};


    const handleRemove = (index) => {
        data.dispatch({ type: 'REMOVE', index });
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
    };

    if (cartItems.length === 0) {
        return (
          <div>
            <Navb />
            <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
          </div>
        );
    }

    return (
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            <Navb />

            <div className="container mt-5">
                <h2>Shopping Cart</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Option</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.qty}</td>
                                <td>{item.size}</td>
                                <td>${item.price * item.qty}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleRemove(index)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-between">
                    <h4>Total Price: ${getTotalPrice()}</h4>
                    <Button variant="primary" size="lg" onClick={handleSendData}>
                        Check Out
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
