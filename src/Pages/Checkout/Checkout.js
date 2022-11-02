import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const { _id, title, price } = useLoaderData();
    const { user } = useContext(AuthContext)


    const handlePlaceOrder = event => {
        event.preventDefault()
        const form = event.target;

        const name = `${form.firstName.value} ${form.lastName.value}`;
        const phone = form.phone.value;
        const email = user?.email || 'unregistered';
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.acknowledged === true){
                    alert('Your order placed successfully');
                    form.reset();
                }
            })
            .catch(error => console.error(error))

    }


    return (
        <div className='mt-20'>
            <form onSubmit={handlePlaceOrder}>
                <h1 className='text-3xl font-bold text-center mb-3'>Your are about to order: {title}</h1>
                <h1 className='text-2xl font-bold text-center mb-3'>Price: {price}</h1>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    <input
                        name='firstName'
                        type="text"
                        placeholder="First Name"
                        className="input input-bordered w-full"
                    />
                    <input
                        name='lastName'
                        type="text"
                        placeholder="Last Name"
                        className="input input-bordered w-full"
                    />
                    <input
                        name='phone'
                        type="text"
                        placeholder="Phone Number"
                        className="input input-bordered w-full"
                        required
                    />
                    <input
                        name='email'
                        type="text"
                        defaultValue={user?.email}
                        readOnly
                        placeholder="Email"
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <textarea
                    name='message'
                    className="textarea textarea-bordered h-40 w-full mt-3"
                    placeholder="Your Message"
                    required
                ></textarea>
                <input
                    type="submit"
                    value="Order Confirm"
                    className="btn w-1/2 mx-auto mt-3 mb-5"
                />

            </form>
        </div>
    );
};

export default Checkout;