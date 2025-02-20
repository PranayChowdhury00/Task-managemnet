import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import axios from "axios";

import login from '/login.jpg'

const Register = () => {
    const { newUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Loading state

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        setLoading(true); // Start loading

        try {
            const res = await newUser(email, password);

            // Update user profile
            await updateProfile(res.user, { displayName: name });

            // Create user data object
            const data = {
                name: res.user.displayName,
                email: res.user.email,
                uid: res.user.uid,
            };

            // Send user data to backend and receive JWT
            const response = await axios.post("http://localhost:5000/user", data);
            const { token } = response.data;

            // Store the JWT in local storage
            localStorage.setItem('jwt', token);

            // Show success message
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successful registration",
                showConfirmButton: false,
                timer: 1500,
            });

            e.target.reset();
            navigate("/");
        } catch (err) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: err.message || "Unsuccessful registration",
                showConfirmButton: false,
                timer: 1500,
            });
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content ">
                <div className="w-[600px]">
                    <img className="w-fit rounded-2xl h-[450px]" src={login} alt="" />
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-3xl font-bold text-center mt-5">Register now!</h1>
                    <form onSubmit={handleOnSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name="name" type="text" placeholder="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" disabled={loading}>
                                {loading ? "Registering..." : "Register"}
                            </button>
                        </div>
                    </form>
                    <p className="text-center font-medium py-5">
                        Already have an account?
                        <Link className="text-green-400 ml-3 font-semibold" to='/login'>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
