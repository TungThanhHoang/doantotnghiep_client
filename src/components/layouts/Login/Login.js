import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { toast } from 'react-toastify';

export default function Login() {
  const { loginUser, getLatLngLocation, loading } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState({
    identifier: "",
    password: "",
  });
  const { identifier, password } = loginForm;
  const handleOnChange = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };
  const handleLoginForm = async (event) => {
    event.preventDefault();
    if (identifier === "" || password === "") {
      toast.error('❗ Vui lòng nhập đúng định dạng!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return null;
    }
    try {
      const sendData = await loginUser(loginForm);
      console.log(sendData)
      if (sendData?.error) {
        toast.error(`❗${sendData?.error?.message}`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return null;
      }
      await getLatLngLocation(`${sendData?.user?.street}, ${sendData?.user?.ward}, ${sendData?.user?.distinct}, ${sendData?.user?.city}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="">
      <div className="flex items-center p-0 md:p-5 ">
        <div className="flex-1 h-full mx-auto overflow-hidden bg-white rounded-lg p-4 md:p-0">
          <form onSubmit={handleLoginForm} className="flex flex-col overflow-y-auto md:flex-row">
            <div className="flex items-center justify-center mx-auto py-10">
              <div className="">
                <h1 className="mb-4 text-2xl font-semibold text-gray-700 ">
                  Đăng nhập tài khoản
                </h1>

                {/* Email */}
                <div className='mt-3'>
                  <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                      Email
                    </span>
                    <input
                      type="email"
                      name="identifier"
                      className="w-80 sm:w-96 h-12 mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 block  rounded-md sm:text-sm focus:ring-1"
                      placeholder="you@gmail.com"
                      onChange={handleOnChange}
                    />
                  </label>
                </div>

                {/* Password */}
                <div className='mt-3'>
                  <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                      Mật khẩu
                    </span>
                    <input
                      type="password"
                      name="password"
                      className="h-12 mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="Mật khẩu"
                      onChange={handleOnChange}
                    />
                  </label>
                </div>

                {/* Button */}
                {loading ? (
                  <button type="button" class="inline-flex items-center justify-center h-12 w-full rounded-md p-2 px-10 font-medium mt-4 text-white text-md bg-green-500 " disabled>
                    <svg role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>
                    loading...
                  </button>
                ) : (<button type="submit" className="h-12 w-full rounded-md p-2 px-10 font-medium mt-4 text-white text-md bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300">
                  Đăng nhập
                </button>)}

                {/* Link to Register */}
                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-green-600 hover:underline hover:text-green-700"
                    to='/register'
                  >
                    Bạn đã chưa có tài khoản? Đăng ký
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div >
    </div >
  );
}
