import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddBook = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm({
    shouldUnregister: true,
  });

  const handleAddBook = (data) => {
   
    // console.log(typeof(data));
    data.librarianEmail = user.email;

    axiosSecure.post("/books", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Congrates",
          text: "Book added Successfully.",
          icon: "success",
        });
        reset();
      }
    });
  };

  return (
    <div className="min-h-screen p-6 bg-base-200 transition-colors duration-300">
      <div className="max-w-4xl mx-auto mt-10 p-4  bg-white  shadow-md rounded-lg">
        <h2 className="text-5xl text-center text-primary font-bold mb-5 ">
          Add A Book
        </h2>

        <form onSubmit={handleSubmit(handleAddBook)}>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-gray-700 text-2xl">
              Enter your Book details
            </legend>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                {/* book name.. */}
                <label className="label text-gray-500">Book Name</label>
                <input
                  type="text"
                  {...register("bookName")}
                  className="input w-full"
                  placeholder="Book Name"
                />
              </div>

              <div className="flex-1">
                {/* book author.. */}
                <label className="label text-gray-500">Book Author</label>
                <input
                  type="text"
                  {...register("bookAuthor")}
                  className="input w-full"
                  placeholder="Book Author"
                />
              </div>
            </div>

            {/* book image.. */}
            <label className="label text-gray-500">Book Image</label>
            <input
              type="text"
              {...register("bookImage")}
              className="input w-full"
              placeholder="Book Image"
            />

            <div className="flex flex-col lg:flex-row gap-5">
              <div className="flex-1">
                {/* book price.. */}
                <label className="label text-gray-500">Book Price</label>
                <input
                  type="number"
                  {...register("bookPrice")}
                  className="input w-full"
                  placeholder="Book Price"
                />
              </div>

              <div className="flex-1">
                <label className="label text-gray-500">Book Status</label>
                {/* <select
              {...register("bookStatus")}
              defaultValue="Pick a status"
              className="select w-full"
            >
              <option disabled={true}>Pick a Status</option>
              <option>Published</option>
              <option>Unpublished</option>
            </select> */}
                <select
                  {...register("bookStatus", { required: true })}
                  defaultValue=""
                  className="select w-full"
                >
                  <option value="" disabled>
                    Pick a Status
                  </option>
                  <option value="Published">Published</option>
                  <option value="Unpublished">Unpublished</option>
                </select>
              </div>
            </div>
            <input
              type="submit"
              value="Send Percel"
              className="btn btn-primary mt-8 text-white"
            />
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
