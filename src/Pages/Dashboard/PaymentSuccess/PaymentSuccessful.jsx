import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { FaCheckCircle } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";

const PaymentSuccessful = () => {

  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [sessionId, axiosSecure]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-lg bg-white shadow-2xl rounded-2xl">
        <div className="card-body text-center">
          
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="text-6xl text-success animate-bounce" />
          </div>

          
          <h2 className="text-3xl font-bold text-primary mb-3">
            Payment Successful
          </h2>

          <p className="text-gray-600 mb-6">
            Thank you for your payment. Your book order has been confirmed
            successfully.
          </p>

          
          <div className="bg-base-200 p-5 rounded-xl text-left space-y-3 mb-6">
            <p className="text-sm text-gray-500">Transaction ID</p>
            <p className="font-semibold text-lg break-all text-secondary">
              {paymentInfo.transactionId}
            </p>

            <p className="text-sm text-gray-500 mt-4">Tracking ID</p>
            <p className="font-semibold text-lg text-secondary">
              {paymentInfo.trackingId}
            </p>
          </div>

          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard/my-orders"
              className="btn bg-primary text-white hover:bg-primary/90 px-6"
            >
              View My Orders
            </Link>

            <Link
              to="/all-books"
              className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white px-6"
            >
              Browse More Books
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessful;
