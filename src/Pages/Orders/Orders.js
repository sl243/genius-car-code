import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import OrdersDetails from './OrdersDetails';

const Orders = () => {
    const { user } = useContext(AuthContext)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [user?.email])

     // delete
     const handleDelete = id => {
        const procced = window.confirm('Are you sure, you want to cancle your order')
        if(procced) {
            fetch(`http://localhost:5000/orders/${id}`, {
                method: 'DELETE'
            })
            .then( res => res.json())
            .then( data => {
                console.log(data)
                if(data.deletedCount > 0){
                    alert('Your Order Deleted Successfully')
                    const remaining = orders.find( order => order._id !== id)
                    setOrders(remaining)
                }
            })
            
        }
    }

    // update
    const handleStatusUpdate = id => {
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify({status: 'Approved'})
        })
        .then( res => res.json())
        .then( data => {
            console.log(data)
            if(data.modifiedCount > 0){
                const remaining = orders.filter(order => order._id !== id)
                const approving = orders.find(order => order._id ===id)
                approving.status = 'Approved'

                const newOrder = [approving,...remaining]
                setOrders(newOrder)
            }
        })
    }

    return (
        <div className='mt-20'>
            <h1 className='text-3xl text-center mb-2'>You have {orders.length} orders</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>Services</th>
                            <th>Customer Name</th>
                            <th>Price</th>
                            <th>Message</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            orders.map(order => <OrdersDetails
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                                handleStatusUpdate={handleStatusUpdate}
                            ></OrdersDetails>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Orders;