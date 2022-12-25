import React, { useEffect, useState } from 'react'
import { useMetaMask } from "metamask-react";
import ShortenAddress from '../../utils/ShortenAddress';
import { ethers } from "ethers";
import Web3 from 'web3';
import { toast } from 'react-toastify';
import { X } from 'react-feather'
import useSWR from "swr";

// import MetaMaskIcon from '../../../src/assets/meta-mask-icon.svg'
import { ReactComponent as MetaMaskIcon } from '../../../src/assets/meta-mask-icon.svg';
import axios from 'axios';

// const fetcher  = async () => {
//     await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=vnd&ids=binancecoin`)
//     .then(res => res.data);
// };
let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=vnd&ids=binancecoin';

const fetcher = async () => {
    const response = await fetch(url);
    return await response.json();
};

const MetaMaskModal = ({ totalPrice, paymentCash, onHide }) => {
    const [balance, setBalance] = useState(0);
    const [isLoadingState, setIsLoading] = useState(false);
    const { status, connect, account, chainId, ethereum, switchChain } = useMetaMask();
    const [priceTranfer, setPriceTransfer] = useState(0);
    const [coinMarket, setCoinMarket] = useState(null);

    const web3 = new Web3(Web3.givenProvider);

    const getUserBalance = () => {
        try {
            window.ethereum.request({ method: 'eth_getBalance', params: [String(account), 'latest'] })
                .then(balances => {
                    setBalance(ethers.utils.formatEther(balances));
                })
        } catch (error) {
            console.log(error);
        }
    }

    const tranferPrice = async () => {
        await axios.get(url).then(res => {
            let current_price = res.data[0].current_price;
            let tranferPrice = (Number(totalPrice) / Number(current_price)).toFixed(5);
            setPriceTransfer(tranferPrice);
            setCoinMarket(res.data?.[0])
        })
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'unset';
    }, [])

    useEffect(() => {
        try {
            getUserBalance();
            tranferPrice();
        } catch (error) {
            console.log(error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account])

    // const { data } = useSWR(url, fetcher);
    // console.log(data);    

    const sendTransaction = async () => {
        if (Number(balance)?.toFixed(5) <= Number(priceTranfer)) {
            toast.error('Số dư không đủ !', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        setIsLoading(true);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        ethers.utils.getAddress(account);
        await signer.sendTransaction({
            to: '0xAFBE11B598A56b067FA5B3f6362F1BaD74fC810A',
            value: ethers.utils.parseEther(priceTranfer)
        }).then(async (res) => {
            toast.success('Giao dịch thành công !', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            await paymentCash();
            setIsLoading(false)
        }).catch((err) => {
            toast.error('❗Giao dịch không thành công !', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setIsLoading(false)
            console.log(err)
        })
    }

    const checkStatusConnect = () => {
        switch (status) {
            case 'initializing':
                return 'Đang đồng bộ với ví MetaMask'
            case 'unavailable':
                return 'Ví MetaMask không có sẵn'
            case 'notConnected':
                return 'Bạn chưa kết nối ví MetaMask ! Vui lòng bấm nút ở bên dưới để tiến hành kết nối'
            case 'connecting':
                return 'Đang kết nối...'
            case 'connected':
                return `${account}`
            default:
                return;
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-10 sm:items-center sm:justify-center appear-done enter-done">
            <div className="px-5 w-full box-border h-3/5 py-4 overflow-hidden bg-white rounded-t-lg  sm:rounded-lg sm:m-4 sm:max-w-md appear-done enter-done">
                <div className='relative h-full'>
                    <div>
                        <div>
                            <div className="flex justify-between mb-5 mt-2 items-center">
                                <div className="capitalize font-bold text-slate-700 text-lg">
                                    Thanh toán bằng ví MetaMask
                                </div>
                                <div className='cursor-pointer' onClick={() => onHide(false)}>
                                    <X size={22} />
                                </div>
                            </div>
                            <div className='flex justify-center flex-col'>
                                {status === 'connected' ? (
                                    <>
                                        <div className='flex flex-row items-center'>
                                            <span className='text-md font-semibold'>Đã kết nối đến ví</span>
                                            <button className='shadow-sm ml-5 text-gray-500 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:text-white'>{ShortenAddress(checkStatusConnect())}</button>
                                        </div>
                                        <div className='mt-4'>
                                            <span className='text-md font-semibold mr-4'>Số dư ví: </span>
                                            <span className='font-bold back text-xl text-gray-600'>{Number(balance)?.toFixed(5)}</span>
                                        </div>
                                        <div className='mt-4 flex items-center'>
                                            <span className='text-md font-semibold mr-4'>Số tiền cần phải thanh toán: </span>
                                            <div className='flex items-center'>
                                                <span className='font-bold back text-xl text-gray-600 mr-2'>{priceTranfer}</span>
                                                <img src={coinMarket?.image} alt="" className='w-8 h-8' />
                                                <span className='font-medium text-lg ml-2 text-gray-600'>{coinMarket?.name}</span>
                                            </div>
                                        </div>
                                    </>
                                ) : (<h3 className='text-md font-semibold'>{checkStatusConnect()}</h3>)}
                                {status === 'notConnected' && (<button type="button" onClick={connect} className="shadow-sm absolute w-full left-0 right-0 bottom-5 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
                                    <MetaMaskIcon />
                                    Connect with MetaMask
                                </button>)}
                                {account && (
                                    <button disabled={isLoadingState} className={` ${isLoadingState ? 'disabled:pointer-events-none disabled:opacity-50' : ''} shadow-sm absolute w-full left-0 right-0 bottom-5 text-gray-600 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center mr-2 mb-2`}
                                        onClick={sendTransaction}>
                                        <MetaMaskIcon />
                                        Thanh toán đơn hàng
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MetaMaskModal
