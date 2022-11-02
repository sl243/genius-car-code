import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import login from '../../assets/images/login/login.svg'
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const Signup = () => {

    const {createUser} = useContext(AuthContext)

    const handleSignUp = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user)
            form.reset()
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="hero my-20">
        <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
            <div className="text-center lg:text-left">
                <img className='w-3/4' src={login} alt=''></img>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <h1 className="text-center text-5xl font-bold mt-5">Sign Up</h1>
                <form onSubmit={handleSignUp} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name='name' placeholder="Your Name" className="input input-bordered" required/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" name='email' placeholder="email" className="input input-bordered" required/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name='password' placeholder="password" className="input input-bordered" required/>
                        
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type='submit' value='Login'></input>
                
                    </div>
                    <p>Already have an account? <Link className='text-orange-600 font-bold' to='/login'>Login</Link> </p>
                </form>
            </div>
        </div>
    </div>
    );
};

export default Signup;