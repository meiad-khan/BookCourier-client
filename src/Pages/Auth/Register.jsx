import React from "react";
import { useForm } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegister = (data) => {
    // console.log('data is ', data.photo[0]);
    registerUser(data.email, data.password)
      .then(() => {
        // console.log(result);
        //get the image and store and get url
        const profileImg = data.photo[0];
        const formData = new FormData();
        formData.append("image", profileImg);

        const postUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_api}`;

        axios.post(postUrl, formData).then((res) => {
          const photoURL = res.data.data.url;

          //create user to DB
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            // console.log('user created ',res.data);
            if (res.data.insertedId) {
              Swal.fire({
                title: "Hurray",
                text: "Registration Successful.",
                icon: "success",
              });
            }
          });
          const profile = {
            displayName: data.name,
            photoURL,
          };
          //update profile
          updateUser(profile)
            .then(() => {
              // console.log('succesfull');
              navigate(location.state || "/");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-10 mb-20">
      <h3 className="text-3xl text-center font-bold pt-9">Please Register</h3>
      <form className="card-body" onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
          {/* name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Name"
          />

          {errors.name?.type === "required" && (
            <p className="text-red-600">Name is required</p>
          )}

          {/* photo upload */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            placeholder="You can't touch this"
            className="file-input"
          />

          {errors.photo?.type === "required" && (
            <p className="text-red-600">Photo is required</p>
          )}

          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
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
              minLength: 6,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
            })}
            className="input"
            placeholder="Password"
          />

          {errors.password?.type === "required" && (
            <p className="text-red-600">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600">Password must be 6 character</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-600">
              At least one upperCase, one lowerCase, one digit and one special
              character
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>
          Already Have a account.{" "}
          <Link
            state={location.state}
            className="text-primary underline"
            to={"/login"}
          >
            login
          </Link>
        </p>
        <SocialLogin></SocialLogin>
      </form>
    </div>
  );
};

export default Register;
