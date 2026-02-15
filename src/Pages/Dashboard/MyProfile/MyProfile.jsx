import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";

const MyProfile = () => {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setUpdating(true);

    try {
      await updateUser({
        displayName: name,
        photoURL: photo,
      });

      setSuccess("Profile updated successfully ");
    } catch (err) {
      setError("Failed to update profile ");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 pt-5 pb-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 transition-colors duration-300">
        <h2 className="text-4xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-8">
          My Profile
        </h2>

      
        <div className="flex flex-col items-center space-y-4 mb-8">
          <img
            src={user?.photoURL}
            alt="User"
            className="w-28 h-28 rounded-full border-4 border-primary shadow-md"
          />
          <h3 className="text-xl text-primary font-semibold">
            {user?.displayName}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
        </div>

        {/* Update Form */}
        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
              Update Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 
             bg-white dark:bg-gray-700 
             text-gray-900 dark:text-white
             placeholder-gray-400 dark:placeholder-gray-400
             rounded-lg px-4 py-2 
             focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
              Update Photo URL
            </label>

            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="Enter photo URL"
              className="
                      w-full 
                      border border-gray-300 dark:border-gray-600
                      bg-white dark:bg-gray-700
                      text-gray-900 dark:text-white
                      placeholder-gray-400 dark:placeholder-gray-400
                      rounded-lg px-4 py-2
                      focus:outline-none focus:ring-2 focus:ring-primary
                      transition duration-200
                        "
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {success && (
          <p className="text-green-600 mt-4 text-center font-medium">
            {success}
          </p>
        )}

        {error && (
          <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
