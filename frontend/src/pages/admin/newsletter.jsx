import React from "react";
import { useState } from "react";
import ProfileCard from "../../components/profileCard";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "../../components/loading";
const backendURL = import.meta.env.VITE_BACKEND_URL;

function Newsletter() {
  const [loading, setLoading] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    const data = { ...Object.fromEntries(formData.entries()) };
    try {
      const response = await axios.post(
        `${backendURL}/api/v1/admin/send-newsletter`,
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      if (response.data.success == true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err);
      console.log(err);
    }
    setLoading(false);
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <ProfileCard>
          <div className="flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit}
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="subject"
                  >
                    Subject
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="Newsletter Subject"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="message"
                    placeholder="Type your message here"
                    rows="4"
                    name="message"
                  ></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Launch Newsletter
                  </button>
                </div>
              </form>
              <p className="text-center bg-gray-200 border-t-2 border-gray-300 text-gray-600 py-2 px-4 rounded">
                Ensure the message is clear and concise before sending.
              </p>
            </div>
          </div>
        </ProfileCard>
      )}
    </div>
  );
}

export default Newsletter;
