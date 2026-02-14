import React, { useRef } from "react";
import { useParams} from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";
import { CgShoppingCart } from "react-icons/cg";
import { BiHeart } from "react-icons/bi";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Logo from "../../Components/Logo/Logo";
import Swal from "sweetalert2";

const BookDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const modalRef = useRef();

  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-books/${id}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm({
    shouldUnregister: true,
  });

  const handleOrder = (data) => {
    data.bookId = book._id;
    data.bookName = book.bookName;
    data.bookPrice = book.bookPrice;
    data.librarianEmail = book.librarianEmail;
    // console.log("order placed", { data });
    axiosSecure.post("/orders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Congrates",
          text: "Order Placed Successfully.",
          icon: "success",
        });
         modalRef.current.close();
         reset();
      }
    });
   
  };

  if (isLoading) return <Loading></Loading>;
  if (isError)
    return (
      <div className="text-red-500 text-center mt-10">
        Error: {error.message}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 lg:mt-8 lg:mb-10">
      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Column: Image Section */}
            <div className="md:w-1/2 bg-gray-200 flex items-center justify-center p-8">
              <img
                src={book.bookImage}
                alt={book.BookName}
                className="w-full max-w-sm h-auto object-cover rounded-md shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Right Column:  */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      book.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {book.bookStatus}
                  </span>
                  <p className="text-gray-400 text-sm italic">
                    Posted: {new Date(book.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <h1 className="text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                  {book.bookName}
                </h1>
                <p className="text-xl text-slate-500 mb-6 italic">
                  by{" "}
                  <span className="text-[#0F766E] font-semibold">
                    {book.bookAuthor}
                  </span>
                </p>

                <div className="border-t border-b border-gray-100 py-6 mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    ${book.bookPrice}
                  </span>
                  <p className="mt-2 text-gray-500 leading-relaxed">
                    Dive into a world of knowledge and imagination. This title
                    has been carefully curated for our collection, ensuring
                    high-quality content for our readers. Whether you are
                    looking to expand your professional skills or escape into a
                    compelling narrative, this book offers a unique perspective
                    that resonates with readers of all backgrounds
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    modalRef.current.showModal();
                  }}
                  className="flex-[2] flex items-center justify-center bg-[#0F766E] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0D635D] transition-all shadow-lg shadow-[#0F766E]/30 active:scale-95 cursor-pointer"
                >
                  <CgShoppingCart className="w-5 h-5 mr-2" />
                  Order Now
                </button>
                <button className="flex-1 flex items-center justify-center border-2 border-slate-200 text-slate-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-95 cursor-pointer">
                  <BiHeart className="w-5 h-5 mr-2" />
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">
              <Logo></Logo>
            </h3>
            <div className="modal-action -mt-1.5">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-secondary text-black">Close</button>
              </form>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit(handleOrder)}>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-2xl">
                  Enter your details
                </legend>
                {/* your name.. */}
                <label className="label">Your Name</label>
                <input
                  type="text"
                  {...register("customerName")}
                  className="input w-full"
                  placeholder="Your Name"
                  defaultValue={user?.displayName}
                  readOnly
                />

                {/* Your Email.. */}
                <label className="label">Your Email</label>
                <input
                  type="text"
                  {...register("customerEmail")}
                  className="input w-full"
                  placeholder="Your Email"
                  defaultValue={user?.email}
                  readOnly
                />

                {/* your phone.. */}
                <label className="label">Phone</label>
                <input
                  type="text"
                  {...register("customerPhone", { required: true })}
                  className="input w-full"
                  placeholder="Phone"
                />

                {/* your address.. */}
                <label className="label">Address</label>
                <input
                  type="text"
                  {...register("customerAddress", { required: true })}
                  className="input w-full"
                  placeholder="Address"
                />

                <input
                  type="submit"
                  value="Place Order"
                  className="btn btn-primary mt-8 text-white"
                />
              </fieldset>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BookDetails;
