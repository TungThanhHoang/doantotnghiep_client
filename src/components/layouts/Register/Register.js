import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import SelectCountry from "../SelectCountry";
import { AuthContext } from "../../../contexts/AuthContext";
import DISTINCT_WARD from "../../../db/city.json"
import { toast } from 'react-toastify';


export default function Register({ changeStateModal }) {
  const [selectDistinct, setSelectDistinct] = useState(null);
  const [selectWard, setSelectWard] = useState(null);
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: 0,
    password: "",
    confirmPassword: "",
    street: "",
  });

  const { registerUser, loading } = useContext(AuthContext);

  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    confirmPassword,
    street,
  } = registerForm;

  const handleOnChange = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value
    });
  };
  const handleSelectDistinct = (e) => {
    setSelectWard(null);
    setSelectDistinct(e.target.value);
  };
  const handleSelectWard = (e) => {
    setSelectWard(e.target.value);
  };

  const handleRegisterForm = async (event) => {
    event.preventDefault();
    if (firstName === "" || lastName === "" || phone === "" || password === "" || email === "" ||
      confirmPassword === "" || selectDistinct === "" || selectDistinct === null || selectWard === "" ||
      selectWard === null || street === "") {
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
    } else if (password !== confirmPassword) {
      toast.error('❗ Mật khẩu không khớp!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return null;
    } else if (`${phone}`.length < 10 || `1${phone}`.length > 11) {
      toast.error('❗ Độ dài số điện thoại từ 10 - 11 số !', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return null;
    }
    try {
      let splitCharater = street?.split(" ");
      splitCharater.splice(1, 0, "Đường");
      const sendData = await registerUser({ ...registerForm, city: "Đà Nẵng", distinct: selectDistinct, ward: selectWard, street: splitCharater.join(" "), username: `username${Math.random() * 1000}` });
      console.log(sendData);
      if (sendData?.error) {
        toast.error(`❗ ${sendData?.error?.message}`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return null;
      } else if (!sendData.user.confirmed) {
        changeStateModal(true);
      }
      toast.success('🎉 Đăng ký thành công!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container-login">
      <div className="flex items-center p-0 md:p-5  dark:bg-gray-900">
        <div className="flex-1 h-full mx-auto overflow-hidden  bg-white rounded-lg dark:bg-gray-800 p-4 md:p-0">
          <form onSubmit={handleRegisterForm} className="flex flex-col overflow-y-auto md:flex-row">
            <div className="flex items-center justify-center mx-auto py-10">
              <div className="w-full">
                <h1 className="mb-4 text-2xl font-semibold text-slate-700">
                  Đăng ký tài khoản
                </h1>

                {/* Name */}
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-3' >
                  <div>
                    <label className="block">
                      <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Tên
                      </span>
                      <input
                        type="text"
                        name="firstName"
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Tên"
                        onChange={handleOnChange}
                      />
                    </label>
                  </div>
                  <div>
                    <label className="block">
                      <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Họ
                      </span>
                      <input
                        type="text"
                        name="lastName"
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        placeholder="Họ"
                        onChange={handleOnChange}
                      />
                    </label>
                  </div>
                  <div>
                    <label className="block">
                      <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Số điện thoại
                      </span>
                      <input
                        type="number"
                        name="phone"
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        placeholder="0123456798"
                        onChange={handleOnChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Email */}
                <div className='mt-3'>
                  <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                      Email
                    </span>
                    <input
                      type="email"
                      name="email"
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="you@gmail.com"
                      onChange={handleOnChange}
                    />
                  </label>
                </div>

                {/* Password */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-3'>
                  <div className=''>
                    <label className="block">
                      <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Mật khẩu
                      </span>
                      <input
                        type="password"
                        name="password"
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        placeholder="Mật khẩu"
                        onChange={handleOnChange}
                      />
                    </label>
                  </div>
                  <div className=''>
                    <label className="block">
                      <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Xác nhận mật khẩu
                      </span>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        placeholder="Xác nhận mật khẩu"
                        onChange={handleOnChange}
                      />
                    </label>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4 mt-3'>
                  <label className=''>
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                      Quận/Huyện
                    </span>
                    <SelectCountry
                      name="distinct"
                      options={DISTINCT_WARD.distinct}
                      onChangeSelectValue={handleSelectDistinct}
                      onChangeValue={handleOnChange}
                      value={selectDistinct}
                      title="Chọn Quận/Huyện"
                    />
                  </label>
                  <label className=''>
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                      Phường/Xã
                    </span>
                    <SelectCountry
                      name="ward"
                      options={DISTINCT_WARD.ward?.filter(item => item.wardId === selectDistinct)}
                      onChangeSelectValue={handleSelectWard}
                      onChangeValue={handleOnChange}
                      value={selectWard}
                      title="Chọn Phường/Xã"
                    />
                  </label>
                </div>
                <div className='mt-3'>
                  <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                      Số nhà
                    </span>
                    <input
                      type="text"
                      name="street"
                      className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 block w-full rounded-md sm:text-sm focus:ring-1"
                      placeholder="Số nhà"
                      onChange={handleOnChange}
                    />
                  </label>
                </div>
                {loading
                  ? (
                    <button type="button" className="inline-flex items-center justify-center rounded-md p-2 px-10 font-medium mt-4 text-white text-md bg-green-500 hover:bg-green-600 " disabled>
                      <svg role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                      </svg>
                      loading...
                    </button>
                  )
                  :
                  (
                    <button type="submit" className="rounded-md p-2 px-10 font-medium mt-4 text-white text-md bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300">
                      Đăng ký
                    </button>
                  )}
                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-green-600 hover:underline"
                    to='/login'
                  >
                    Bạn đã có tài khoản? Đăng nhập
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
