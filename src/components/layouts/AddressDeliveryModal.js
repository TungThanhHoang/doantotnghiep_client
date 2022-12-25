import React, { useEffect, useState, useContext } from 'react'
import DISTINCT_WARD from "../../db/city.json"
import { toast } from 'react-toastify';
import SelectCountry from './SelectCountry';
import { AuthContext } from '../../contexts/AuthContext';
import { getDistance } from './Navbar/navSlice';
import { useDispatch, useSelector } from 'react-redux';
import { LATITUDE, LONGITUDE, MARKET } from '../../contexts/constants';
import { getMarkerSelector } from '../../redux/selector';
import { X } from "react-feather";


const AddressDeliveryModal = ({ setAddressForm, onHide, setRoutes }) => {
    const dispatch = useDispatch();
    const [selectDistinct, setSelectDistinct] = useState(null);
    const [selectWard, setSelectWard] = useState(null);
    const [street, setStreet] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const marker = useSelector(getMarkerSelector);
    const { getLatLngLocation } = useContext(AuthContext);

    const handleSelectDistinct = (e) => {
        setSelectWard(null);
        setSelectDistinct(e.target.value);
    };
    const handleSelectWard = (e) => {
        setSelectWard(e.target.value);
    };

    const submitChange = async () => {
        setIsLoading(true)
        if (selectDistinct === null || selectWard === null || street === '' || name === '' || phone === 0) {
            toast.error('Vui lòng điền thông tin !', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setIsLoading(false);
            return;
        }
        let splitCharater = street?.split(" ");
        splitCharater.splice(1, 0, "Đường");
        const getLatLng = await getLatLngLocation(`${splitCharater.join(" ")}, ${selectDistinct}, ${selectWard}, Đà Nẵng`);
        const distance = await dispatch(getDistance(`${getLatLng.Results[0].longitude},${getLatLng.Results[0].latitude};${JSON.parse(localStorage.getItem(MARKET))?.attributes.longitude},${JSON.parse(localStorage.getItem(MARKET))?.attributes.latitude}`));
        const results = distance.payload?.[0];
        setRoutes({ distance: results.distance, duration: results.duration })
        onHide(false);
        toast.success('Thay đổi thành công !', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setAddressForm({ distinct: selectDistinct, ward: selectWard, street: street, name: name, phone: phone })
        setIsLoading(false);
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'unset';
    }, [])

    return (
        <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-10 sm:items-center sm:justify-center appear-done enter-done">
            <div className="px-5 w-full box-border h-3/5 py-4 overflow-hidden bg-white rounded-t-lg  sm:rounded-lg sm:m-4 sm:max-w-sm appear-done enter-done">
                <div className='relative h-full'>
                    <div>
                        <div>
                            <div className="flex justify-between mb-5 mt-2 items-center">
                                <div className="capitalize font-bold text-slate-700 text-lg">
                                    Thay đổi địa chỉ giao hàng
                                </div>
                                <div className='cursor-pointer' onClick={() => onHide(false)}>
                                    <X size={22} />
                                </div>
                            </div>
                            <div>
                                <div className='grid grid-cols-2 gap-4' >
                                    <div>
                                        <label className="block">
                                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                                Tên người nhận
                                            </span>
                                            <input
                                                type="text"
                                                name="firstName"
                                                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="Tên"
                                                onChange={(e) => setName(e.target.value)}
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
                                                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                                placeholder="0123456798"
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-4 mt-6'>
                                    <label className=''>
                                        <span className="mb-3 after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                            Quận/Huyện
                                        </span>
                                        <SelectCountry
                                            name="distinct"
                                            options={DISTINCT_WARD.distinct}
                                            onChangeSelectValue={handleSelectDistinct}
                                            value={selectDistinct}
                                            title="Chọn Quận/Huyện"
                                        />
                                    </label>
                                    <label className=''>
                                        <span className="mb-3 after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                            Phường/Xã
                                        </span>
                                        <SelectCountry
                                            name="ward"
                                            options={DISTINCT_WARD.ward?.filter(item => item.wardId === selectDistinct)}
                                            onChangeSelectValue={handleSelectWard}
                                            value={selectWard}
                                            title="Chọn Phường/Xã"
                                        />
                                    </label>
                                </div>
                                <div className='mt-6'>
                                    <label className="block">
                                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                            Số nhà
                                        </span>
                                        <input
                                            type="text"
                                            name="street"
                                            className="mt-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                            placeholder="Số nhà"
                                            onChange={(e) => setStreet(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className='mt-8'>
                                    <button disabled={isLoading} type="button" onClick={submitChange} class={`${isLoading ? 'disabled:pointer-events-none disabled:opacity-50' : ''} w-full py-2.5 px-5 mr-2 mb-2 text-sm font-normal shadow-sm text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-50 focus:z-10 focus:ring-4 focus:ring-gray-200`}
                                    >
                                        Thay đổi địa chỉ giao hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressDeliveryModal
