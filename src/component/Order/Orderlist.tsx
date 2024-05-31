import React, { useEffect, useState } from 'react';
import { getOrder } from '../../services/adminService';
import { getProfile } from '../../services/authService';

interface OrderList {
  CustomerId: number;
  DateUpdated: string;
  OrderDate: string;
  OrderId: number;
  Status: string;
  StatusId: number;
  TotalAmount: number;
  name: string
}

interface Profile {
  id: number;
}

const OrderList: React.FC = () => {
  const [order, setOrder] = useState<OrderList[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

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
    const fetchOrders = async () => {
      if (profile) {
        try {
          const orders = await getOrder(profile.id); // Assuming this returns an array of Order
          setOrder(orders);
        } catch (error) {
          alert(error);
        }
      }
    };

    fetchOrders();
  }, [profile]);

  useEffect(() => {
    console.log(order);
  }, [order]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white w-4/5 mx-auto my-4">
        <table className="w-full text-base text-left rtl:text-right text-gray-700">
          <thead className="text-sm text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-8 py-4">
                Tên Khách Hàng
              </th>
              <th scope="col" className="px-8 py-4">
                Id đơn hàng
              </th>
              <th scope="col" className="px-8 py-4">
                Trạng thái
              </th>
              <th scope="col" className="px-8 py-4">
                Tổng Giá
              </th>
              <th scope="col" className="px-8 py-4">
                <span className="sr-only">nothing</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {order.map((orderlist: OrderList) => (
              <tr key={orderlist.OrderId} className="bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-8 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {orderlist.name}
                </th>
                <td className="px-8 py-4">
                  {orderlist.OrderId}
                </td>
                <td className="px-8 py-4">
                  {orderlist.Status}
                </td>
                <td className="px-8 py-4">
                  {formatPrice(orderlist.TotalAmount)}
                </td>
                <td className="px-8 py-4 text-right">
                  <a href="#" className="font-medium text-blue-600 hover:underline">Xem Chi Tiet</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderList;
