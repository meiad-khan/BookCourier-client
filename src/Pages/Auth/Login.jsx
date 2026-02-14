import React from "react";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    // console.log('form data is ', data);
    signInUser(data.email, data.password)
      .then(() => {
        // console.log(result);
        toast.success('Login Successful');
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Login Failed");
      });
  };

  return (
    <div className="min-h-screen">
      <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-9">
        <h3 className="text-3xl text-center font-bold pt-8">Please Login</h3>
        <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-600">Email is required</p>
            )}

            {/* password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                maxLength: 20,
              })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
          <p>
            New to Zap Shift.{" "}
            <Link
              state={location.state}
              className="text-primary underline"
              to={"/register"}
            >
              register
            </Link>
          </p>
          <SocialLogin></SocialLogin>
        </form>
      </div>
    </div>
  );
};

export default Login;
