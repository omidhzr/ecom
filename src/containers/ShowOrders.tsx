import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchAllOrders } from '../redux/features/admin/adminService';
import moment from 'moment';

const ShowOrders = () => {
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.authReducer.error);


    useEffect(() => {
        dispatch(fetchAllOrders());
    }, []);

    const orders = useAppSelector((state) => state.adminReducer.orders);

    // console.log(orders);

    // get all orderItems from orders
    const orderItems = orders.map((order) => order.orderItems);
    // console.log(orderItems);

    return (
        <div className="container">
            <h1 className="text-center">Orders</h1>
            <hr />
            <div className="col-md-6">
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Order Total</th>
                            <th>Order Status</th>
                            <th>Confirm/Send</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* // display every orderItem in orderItemsList array */
                            orderItems.map((orderItemsList) => {
                                return orderItemsList.map((orderItem: any) => {
                                    return (
                                        <tr key={orderItem.ID}>
                                            <td>{orderItem.ID}</td>
                                            <td>{orderItem.name}</td>
                                            <td>{orderItem.totalPrice}</td>
                                            <td>Pending</td>
                                            <td>
                                                <button className="btn btn-primary" disabled>Show</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default ShowOrders