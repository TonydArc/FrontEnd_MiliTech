import React from 'react';

interface Order {
  id: number;
  customerName: string;
  orderDate: string;
  status: string;
  image: string;
}

const orders: Order[] = [
  { id: 1, customerName: 'Alice Johnson', orderDate: '2024-05-01', status: 'Shipped', image: '' },
  { id: 2, customerName: 'Bob Smith', orderDate: '2024-05-02', status: 'Processing', image: '' },
  { id: 3, customerName: 'Charlie Brown', orderDate: '2024-05-03', status: 'Delivered', image: '' },
];

const OrderList: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', fontWeight: 'bold', paddingBottom: '10px', borderBottom: '2px solid #ddd' }}>
        <div>Image</div>
        <div>Order ID</div>
        <div>Customer Name</div>
        <div>Order Date</div>
        <div>Status</div>
      </div>
      {orders.map((order) => (
        <div key={order.id} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', borderBottom: '1px solid #ddd', padding: '10px 0' }}>
          <div style={{ width: '50px', height: '50px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {order.image ? (
              <img src={order.image} alt={`Order ${order.id}`} style={{ width: '50px', height: '50px' }} />
            ) : (
              <span style={{ color: '#ccc' }}>No Image</span>
            )}
          </div>
          <div>{order.id}</div>
          <div>{order.customerName}</div>
          <div>{order.orderDate}</div>
          <div>{order.status}</div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
