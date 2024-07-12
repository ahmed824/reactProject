import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext';
import { notify } from '../Utils/notify';
import Loading from '../Loading/Loading';
import { NavLink } from 'react-router-dom';

export default function Cart() {

    const [cart, setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState([])
    let { getUserCart, removeCartItem, updateQty, getCartCount } = useContext(StoreContext)
    async function getCart() {
        let token = localStorage.getItem('token')
        if (token) {
            let response = await getUserCart(token)
            console.log(response);
            setCart(response.data.data.products)
            setTotalPrice(response.data.data.totalCartPrice)
        }
    }

    async function deleteProduct(productId) {
        let token = localStorage.getItem('token')
        if (token) {
            let response = await removeCartItem(token, productId)
            console.log(response);
            setCart(response.data.data.products)
            setTotalPrice(response.data.data.totalCartPrice)
            getCartCount()
            notify('product deleted', 'success')
        }
    }

    async function updateProductQty(productId, count) {
        let token = localStorage.getItem('token')
        if (token) {
            let response = await updateQty(token, productId, count)
            console.log(response);
            setCart(response.data.data.products)
            setTotalPrice(response.data.data.totalCartPrice)

            notify('product updated', 'success')
        }
    }


    useEffect(() => {
        getCart()
    }, [])

    return (
        <>
            {cart.length != 0 ? <div className="container" style={{minHeight:"600px"}}>
                <div className="bg-main-light p-3 my-4" >
                <h3>Shop Cart</h3>
                <h6 className='text-main my-3 fw-bold'>Total cart price:{totalPrice} EGP</h6>
                {cart.map((item) => {
                    return <div key={item._id} className="row my-3 border-bottom">
                        <div className="col-md-1">
                            <img src={item.product.imageCover} className='w-100' alt="" />
                        </div>
                        <div className="col-md-11 d-flex justify-content-between">
                            <div>
                                <h6>{item.product.title}</h6>
                                <h6 className='text-main mx-2 fw-bolder'>{item.price} EGP</h6>
                                <button onClick={() => deleteProduct(item.product._id)} className='text-danger border-0'>Remove <i className="fa-solid fa-trash"></i></button>
                            </div>
                            <div>
                                <button onClick={() => updateProductQty(item.product._id, item.count + 1)} className='btn btn-border'>+</button>
                                <span className='mx-2'> {item.count}</span>
                                <button onClick={() => updateProductQty(item.product._id, item.count - 1)} className='btn btn-border'>-</button>

                            </div>
                        </div>
                    </div>
                })}
                <NavLink to='/checkout' className='btn bg-main text-white'>CHECKOUT</NavLink >
            </div>
            </div > : <Loading />
}
        </>
    )
}
