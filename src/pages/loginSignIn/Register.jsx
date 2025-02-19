import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
    const { newUser } = useContext(AuthContext);
const navigate = useNavigate();
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        newUser(email, password)
            .then((res) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "successful register",
                    showConfirmButton: false,
                    timer: 1500
                  });
                console.log(res);
                e.target.reset();
                navigate('/')
            })
            .catch((err) => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: err.message ||"Unsuccessful register",
                    showConfirmButton: false,
                    timer: 1500
                  });
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
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
                            <button className="btn btn-primary">Register</button>
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
