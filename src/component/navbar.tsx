import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Dropdown from './dropdown';
import { isLoggedIn } from '../services/untils';
import { logout } from '../services/authService';
import { getCatalog } from '../services/adminService';

interface Catalog {
    CatalogId: number;
    CatalogName: string;
    Description: string
}

export default function Navbar() {
    const [auth, setAuth] = useState(false);
    const [catalog, setCatalog] = useState([]);
    const navigate = useNavigate();
    const cookieName = 'access_token';

    useEffect(() => {
        const checkCookie = () => {
            const cookies = document.cookie.split('; ');
            const cookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));
            if (cookie) {
                setAuth(true);
            }
        };
        checkCookie();
    }, []);

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const catalogData = await getCatalog();
                setCatalog(catalogData);
                // console.log(productsData);

            } catch (err) {
                alert(err);
            }
        };

        fetchCatalog();
    }, []);

    useEffect(() => {
        console.log("auth", auth);
    }, [auth]);

    const handleLogout = () => {
        logout();
        if (!isLoggedIn) {
            navigate("/");
        }
        alert('Logged out successfully');
    };

    return (
        <>
            <section
                className='flex items-center lg:justify-center relative py-3 sm:px-10 px-4 border-gray-200 border-b min-h-[75px]'>
                <div className='left-10 absolute z-50 bg-gray-100 flex px-4 py-3 rounded max-lg:hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="20px"
                        className="cursor-pointer fill-gray-400 mr-6 rotate-90 inline-block">
                        <path
                            d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                        </path>
                    </svg>
                    <input type='text' placeholder='Search...' className="outline-none bg-transparent w-full text-sm" />
                </div>
                {/* logo */}
                <a href="/"><img src="src/assets/militech (1).png" alt="logo"
                    className='md:w-[170px] w-36 size-56' />
                </a>
                {/* user && cart */}
                <div className="absolute sm:right-10 right-4 flex items-center">
                    <span className="relative sm:mr-8 mr-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px"
                            className="cursor-pointer fill-[#333] hover:fill-[#007bff] inline-block" viewBox="0 0 64 64">
                            <path
                                d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                                data-original="#000000" />
                        </svg>
                        <span className="absolute left-auto -ml-1 top-0 rounded-full bg-black px-1 py-0 text-xs text-white">1</span>
                    </span>
                    {/* cart */}
                    <span onClick={() => { navigate('/cart') }} className="relative sm:mr-8 mr-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
                            className="cursor-pointer fill-[#333] hover:fill-[#007bff] inline-block" viewBox="0 0 512 512">
                            <path
                                d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                                data-original="#000000"></path>
                        </svg>
                        {/* <span className="absolute left-auto -ml-1 top-0 rounded-full bg-black px-1 py-0 text-xs text-white">4</span> */}
                    </span>
                    {/* login / user */}
                    {auth ? (
                        <Dropdown
                            button={
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src={'src/assets/tringuyen.jpg'}
                                    alt="Account"
                                />
                            }
                            children={
                                <div className="flex h-36 w-56 flex-col justify-start rounded-[20px] bg-gray-200 bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                                    <div className="mt-3 ml-4">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                                                {/* Hey, {profile} */}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />
                                    <div className="mt-3 ml-4 flex flex-col">
                                        <a
                                            href="/order"
                                            className=" flex mt-3 text-sm font-medium text-black hover:text-blue-600"
                                        >
                                            Đơn hàng
                                            <svg className='mx-2' width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="2" y="3" width="20" height="18" rx="2" fill="#e0e0e0" stroke="#000" stroke-width="2" />
                                                <rect x="6" y="6" width="12" height="1" fill="#000" />
                                                <rect x="6" y="10" width="12" height="1" fill="#000" />
                                                <rect x="6" y="14" width="8" height="1" fill="#000" />
                                            </svg>
                                        </a>
                                        <div className='h-3'></div>
                                        <a
                                            onClick={handleLogout}
                                            href=""
                                            className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                                        >
                                            Đăng xuất
                                        </a>
                                    </div>
                                </div>
                            }
                            classNames={"py-2 top-8 -left-[180px] w-max"}
                        />
                    ) : (
                        <div onClick={() => { navigate('/login') }} className="inline-block cursor-pointer border-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"
                                className="hover:fill-[#007bff]">
                                <circle cx="10" cy="7" r="6" data-original="#000000" />
                                <path
                                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                    data-original="#000000" />
                            </svg>
                        </div>
                    )}
                    {/* <div onClick={() => { navigate('/login') }} className="inline-block cursor-pointer border-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"
                            className="hover:fill-[#007bff]">
                            <circle cx="10" cy="7" r="6" data-original="#000000" />
                            <path
                                d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                data-original="#000000" />
                        </svg>
                    </div> */}
                </div>
            </section>
            <div className='flex flex-wrap justify-center px-10 py-3 relative'>
                <div id="toggle" className='flex ml-auto lg:order-1 lg:hidden relative z-50'>
                    <button className='ml-7'>
                        <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <ul id="collapseMenu" className='lg:!flex lg:space-x-10 max-lg:space-y-3 max-lg:hidden max-lg:w-full max-lg:my-4'>
                    <li className='max-lg:border-b max-lg:py-2'><a href='/'
                        className='hover:text-[#007bff] text-[#007bff] font-semibold block text-[15px]'>Trang Chủ</a></li>
                    <li className='group max-lg:border-b max-lg:py-2 relative'>
                        <a href='javascript:void(0)'
                            className='hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block'>Danh Mục<svg
                                xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" className="ml-1 inline-block" viewBox="0 0 24 24">
                                <path
                                    d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                                    data-name="16" data-original="#000000" />
                            </svg>
                        </a>
                        <ul
                            className='absolute hidden group-hover:block shadow-lg bg-white space-y-2 px-6 pb-4 pt-6 lg:top-5 max-lg:top-8 left-0 min-w-[250px] z-50'>
                            {/* catalog list */}
                            {catalog.map((catalogs: Catalog) => (
                                <Link to={`/product/catalog/${catalogs.CatalogName}`}>
                                    <li className='border-b py-3'>
                                        <a href='javascript:void(0)'
                                            className='hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" className="mr-4 inline-block"
                                                viewBox="0 0 1700 1700">
                                                <path
                                                    d="M916.7 1269.4c-10.7 0-20.4-7.2-23.2-18l-29.9-114.7c-3.3-12.8 4.3-25.9 17.2-29.3 12.8-3.3 25.9 4.3 29.3 17.2l29.9 114.7c3.3 12.8-4.3 25.9-17.2 29.3-2 .5-4.1.8-6.1.8zm-169.4 0c-2 0-4-.3-6.1-.8-12.8-3.3-20.5-16.4-17.2-29.3l29.9-114.7c3.3-12.8 16.4-20.5 29.3-17.2 12.8 3.3 20.5 16.4 17.2 29.3l-29.9 114.7c-2.8 10.8-12.6 18-23.2 18z"
                                                    data-original="#000000" />
                                                <path
                                                    d="M1066.6 1358.8H597.4c-13.3 0-24-10.7-24-24 0-62.6 50.9-113.5 113.5-113.5h290.4c62.6 0 113.5 50.9 113.5 113.5-.2 13.3-10.9 24-24.2 24zm-440.7-48H1038c-9.6-24.3-33.3-41.5-60.9-41.5H686.8c-27.6.1-51.3 17.3-60.9 41.5zM276.4 762.7c-13.3 0-24-10.7-24-24V395c0-29.7 24.2-53.9 53.9-53.9h1051.4c29.7 0 53.9 24.2 53.9 53.9v297.8c0 13.3-10.7 24-24 24s-24-10.7-24-24V395c0-3.2-2.6-5.9-5.9-5.9H306.3c-3.2 0-5.9 2.6-5.9 5.9v343.7c0 13.2-10.7 24-24 24zm904.5 392H446.5c-13.3 0-24-10.7-24-24s10.7-24 24-24h734.3c13.3 0 24 10.7 24 24s-10.6 24-23.9 24zm0-120.8H446.5c-13.3 0-24-10.7-24-24s10.7-24 24-24h734.3c13.3 0 24 10.7 24 24s-10.6 24-23.9 24z"
                                                    data-original="#000000" />
                                                <path
                                                    d="M424.1 1358.8H128.4c-25.6 0-46.4-20.8-46.4-46.4V761.1c0-25.6 20.8-46.4 46.4-46.4h295.7c25.6 0 46.4 20.8 46.4 46.4v551.3c0 25.6-20.8 46.4-46.4 46.4zm-294.1-48h292.5V762.7H130z"
                                                    data-original="#000000" />
                                                <path
                                                    d="M446.5 853.6H106c-13.3 0-24-10.7-24-24s10.7-24 24-24h340.5c13.3 0 24 10.7 24 24s-10.7 24-24 24zm0 414.4H106c-13.3 0-24-10.7-24-24s10.7-24 24-24h340.5c13.3 0 24 10.7 24 24s-10.7 24-24 24zm1125.1 90.8h-368.3c-25.6 0-46.4-20.8-46.4-46.4V715.2c0-25.6 20.8-46.4 46.4-46.4h368.3c25.6 0 46.4 20.8 46.4 46.4v597.2c0 25.6-20.8 46.4-46.4 46.4zm-366.7-48H1570v-594h-365.1z"
                                                    data-original="#000000" />
                                                <path
                                                    d="M1594 811.8h-413.1c-13.3 0-24-10.7-24-24s10.7-24 24-24H1594c13.3 0 24 10.7 24 24s-10.7 24-24 24zm0 452h-413.1c-13.3 0-24-10.7-24-24s10.7-24 24-24H1594c13.3 0 24 10.7 24 24s-10.7 24-24 24z"
                                                    data-original="#000000" />
                                            </svg>
                                            {catalogs.CatalogName}
                                        </a>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </li>
                    {/* <li className='max-lg:border-b max-lg:py-2'><a href='javascript:void(0)'
                        className='hover:text-[#007bff] text-gray-600 font-semibold text-[15px] block'>Nam</a></li>
                    <li className='max-lg:border-b max-lg:py-2'><a href='javascript:void(0)'
                        className='hover:text-[#007bff] text-gray-600 font-semibold text-[15px] block'>Nu</a></li> */}

                    <li className='max-lg:border-b max-lg:py-2'><a href='/about'
                        className='hover:text-[#007bff] text-gray-600 font-semibold text-[15px] block'>About</a></li>
                </ul>
            </div>
        </>
    )
}
