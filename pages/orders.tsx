import Layout from '@/components/Layout';
import { IOrder } from '@/models/Order';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';

interface ordersProps {

}

const Orders: FC<ordersProps> = ({ }) => {
  const [orders, setOrders] = useState<IOrder[]>();
  useEffect(() => {
    axios.get('/api/orders').then((res) => {
      setOrders(res.data);
    });
  }, []);
  return <Layout>
    <h1>Orders</h1>

    <table className='basic'>
      <thead>
        <tr>
          <th>Date</th>
          <th>Recipient</th>
          <th>Products</th>
        </tr>
      </thead>
      <tbody>
        {orders && orders?.length > 0 && orders?.map((order) => (
          <tr key={order._id}>
            <td>{new Date(order.createdAt).toLocaleString("en-NZ")}</td>
            <td>
              {order.name}, {order.email} <br />
              {order.city}, {order.postalCode} <br />
              {order.country} <br />
              {order.streetAddress}
            </td>
            <td>
              {order.items.map((p: any) => (
                <>
                  {(p.product_data.title as string).substring(0, 30)}
                  {" "}
                  x{p.quantity}
                  <br />
                </>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Layout>;
};

export default Orders;