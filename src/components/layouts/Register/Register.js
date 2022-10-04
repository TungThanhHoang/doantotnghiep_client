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

  const { registerUser } = useContext(AuthContext);

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
      const sendData = await registerUser({ ...registerForm, username: `"username" ${Math.random() * 1000}` });
      console.log(sendData);
      if (sendData?.error?.status === 400) {
        toast.error('❗ Email hoặc mật khẩu không đúng !', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (!sendData.user.confirmed) {
        changeStateModal(true);
        return null;
      }
    } catch (error) {
      console.error(error);
    } finally {
      toast.success('🎉 Đăng nhập thành công!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
                <button type="submit" className="rounded-md p-2 px-10 font-medium mt-4 text-white text-md bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300">
                  Đăng ký
                </button>
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
      </div>
    </div>
  );
}
