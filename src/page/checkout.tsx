/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { createOrder } from '../services/adminService';
import { getProfile } from '../services/authService';

interface CartItem {
    CustomerId: number;
    OrderDate: any;
    StatusId: number;
    ProductId: string;
    TotalAmount: number;
    Quantity: number;
    Price: number;
    MethodId: number;
    Address: string;
}

interface Profile {
    id: number;
}

export default function Checkout() {
    const [auth, setAuth] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState<CartItem[]>([]);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const cookieName = 'access_token';

    useEffect(() => {
        const checkAuth = async () => {
            const cookies = document.cookie.split('; ');
            const cookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));
            setAuth(!!cookie);
            setCheckingAuth(false);
        };
        checkAuth();
    }, []);

    useEffect(() => {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        }
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getProfile();
                setProfile(profileData);
            } catch (err) {
                alert(err);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        const calculatedSubtotal = items.reduce((acc, item) => acc + item.Price * item.Quantity, 0);
        setTotal(calculatedSubtotal + 5); // Giả định phí vận chuyển là 5$
    }, [items]);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const handleCheckOut = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!profile) {
            alert('Không thể tải thông tin người dùng');
            return;
        }

        const CustomerId = profile.id;
        const StatusId = 1;
        const OrderDate = new Date().toISOString().split('T')[0];
        const TotalAmount = total;

        const orderData = {
            CustomerId,
            OrderDate,
            StatusId,
            TotalAmount,
            OrderDetails: items.map(item => ({
                ProductId: Number(item.ProductId),
                Quantity: Number(item.Quantity),
                Price: Number(item.Price),
                MethodId: 1,
                Address: address
            }))
        };

        console.log(JSON.stringify(orderData));

        try {
            await createOrder(orderData);
            alert('Đặt hàng thành công');
            navigate('/');
        } catch (error) {
            alert('Đặt hàng thất bại');
        }
    };

    if (checkingAuth) {
        return <p>Đang tải...</p>; // Hoặc một spinner tải
    }

    if (!auth) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="font-[sans-serif] bg-white-50 p-6 min-h-screen mt-10">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold text-[#333] text-center">Thanh toán</h2>
                <div className="grid lg:grid-cols-3 gap-8 mt-12">
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-bold text-[#333]">Chọn phương thức thanh toán</h3>
                        <div className="grid gap-4 sm:grid-cols-2 mt-6">
                            <div className="flex items-center">
                                <input type="radio" name="pay" className="w-5 h-5 cursor-pointer" id="card" />
                                <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                                    <img src="https://readymadeui.com/images/visa.webp" className="w-12" alt="card1" />
                                    <img src="https://readymadeui.com/images/american-express.webp" className="w-12" alt="card2" />
                                    <img src="https://readymadeui.com/images/master.webp" className="w-12" alt="card3" />
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input type="radio" name="pay" className="w-5 h-5 cursor-pointer" id="paypal" />
                                <label htmlFor="paypal" className="ml-4 flex gap-2 cursor-pointer">
                                    <img src="https://readymadeui.com/images/paypal.webp" className="w-20" alt="paypalCard" />
                                </label>
                            </div>
                        </div>
                        <form className="mt-8" onSubmit={handleCheckOut}>
                            <div className="grid gap-6">
                                <div className="grid sm:grid-cols-3 gap-6">
                                    <input type="number" placeholder="Số thẻ" className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                    <input type="number" placeholder="Ngày hết hạn" className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                    <input type="number" placeholder="CVV" className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                </div>
                                <div className="sm:col-span-2 grid sm:grid-cols-2 gap-6">
                                    <input type="text" placeholder="Tên chủ thẻ" className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                    <input type="number" placeholder="Mã bưu chính" className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                    <input type="text" placeholder="Địa chỉ" onChange={handleAddressChange} value={address} required className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-10">
                                <button type="button" className="px-6 py-3.5 text-sm bg-transparent border text-[#333] rounded-md hover:bg-gray-100">Thanh toán sau</button>
                                <button type="submit" className="px-6 py-3.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">Gửi</button>
                            </div>
                        </form>
                    </div>
                    <div className="lg:border-l lg:pl-8">
                        <h3 className="text-xl font-bold text-[#333]">Tóm tắt</h3>
                        <ul className="text-[#333] mt-6 space-y-4">
                            <li className="flex flex-wrap gap-4 text-base font-bold border-t pt-4">Tổng cộng <span className="ml-auto">{total}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
