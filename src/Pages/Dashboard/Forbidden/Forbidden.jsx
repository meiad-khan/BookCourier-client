import { FaLock } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">
        
        <h1 className="text-6xl font-extrabold text-red-500 mb-4">403</h1>

        
        <h2 className="text-2xl flex items-center justify-center gap-2 font-semibold text-gray-800 mb-3">
         <FaLock></FaLock> Access Forbidden
        </h2>

       
        <p className="text-gray-600 mb-6">
          You do not have permission to access this page. Please contact the
          administrator if you believe this is a mistake.
        </p>

       
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
