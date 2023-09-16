import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Signup from "./Signup";
import Login from "./Login";

export default function Auth({ setAuthPopup }) {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <div
        className="relative z-30"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
        <div className="fixed  bg-white max-w-md mx-auto top-24 left-2 right-2 rounded-xl p-6">
          <MdClose
            onClick={() => setAuthPopup(false)}
            size={36}
            className="cursor-pointer  rounded-tr-xl hover:text-red-400 duration-200 absolute right-0 top-0 bg-primary text-gray-500 bg-gray-100"
          />
          <div>
            {isLogin ? (
              <Login setAuthPopup={setAuthPopup} />
            ) : (
              <Signup setAuthPopup={setAuthPopup} />
            )}
          </div>

          <div className="flex justify-end mt-8">
            {isLogin ? (
              <p>
                Don&apos;t have an account,{"  "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 font-medium hover:scale-105 duration-300"
                >
                  Register here!
                </button>
              </p>
            ) : (
              <p>
                Already have an account,{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 font-medium hover:scale-105 duration-300"
                >
                  Login here!
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
