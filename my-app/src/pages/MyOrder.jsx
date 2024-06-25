import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Navb from '../component/Navbar';

const MyOrder = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('https://foodapp-backend-2.onrender.com/api/myorder');
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <>
        <Navb></Navb>
         <div className="container mt-5">
            <h2>My Orders</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Order Date</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order._id}>
                            <td>{order.email}</td>
                            <td>{new Date(order.createdAt).toLocaleString()}</td>
                            <td>
                                <ul>
                                    {order.order_data.map((item, idx) => (
                                        item.map((newitem, idz) => (
                                        <tr key={newitem}>                                        
                                        <td>{newitem.name}</td>
                                        <td>{newitem.qty}</td>
                                        <td>{newitem.size}</td>
                                        <td>{newitem.price}</td>
                                        </tr>
                                        ))                                       
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        </>
       
    );
};

export default MyOrder;
