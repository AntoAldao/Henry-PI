import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { order } from '../../redux/actions/index';
import { useSelector } from 'react-redux';
import {setPage } from "../../redux/actions/index";
const Order = () => {
    const orders = ["Name A-Z", "Name Z-A", "Rating 0-5", "Rating 5-0"];
    const dispatch = useDispatch();
    
    const OrderBy = useSelector((state) => state.OrderBy);
    
    const handleChange = (e) => {
        dispatch(order(e.target.value));
        dispatch(setPage(1));
    }
    
    return (
        <div>
            <select name="order" value={OrderBy} onChange={handleChange}>
                <option value="">Order by ...</option>
                {orders.map((o) => {
                    return <option value={o} key={o}>{o}</option>
                })}
            </select>
        </div>
    )

};
export default Order;