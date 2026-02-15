import React from "react";
import { Link, useSearchParams } from "react-router";
import { FaTimesCircle } from "react-icons/fa";

const PaymentFailed = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-lg bg-white shadow-2xl rounded-2xl">
        <div className="card-body text-center">
          
          <div className="flex justify-center mb-6">
            <FaTimesCircle className="text-6xl text-error animate-pulse" />
          </div>

          <h2 className="text-3xl font-bold text-error mb-3">Payment Failed</h2>

          <p className="text-gray-600 mb-6">
            Unfortunately, your payment could not be processed. Please try again
            or choose a different payment method.
          </p>

          
          {orderId && (
            <div className="bg-base-200 p-4 rounded-xl mb-6">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-semibold text-lg text-secondary break-all">
                {orderId}
              </p>
            </div>
          )}

         
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {orderId && (
              <Link
                to={`/dashboard/payment/${orderId}`}
                className="btn bg-primary text-white hover:bg-primary/90 px-6"
              >
                Retry Payment
              </Link>
            )}

            <Link
              to="/dashboard/my-orders"
              className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white px-6"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
