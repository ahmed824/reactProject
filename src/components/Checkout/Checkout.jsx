import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext';
import { notify } from '../Utils/notify';

export default function Checkout() {
    let { onlinePayment ,caId } = useContext(StoreContext)
    async function handleSubmit(values) {
        let response = await onlinePayment(caId , values)
        if (response?.data?.status ==='success') {
            console.log(response.data.session.url);
            window.location.href=response.data.session.url;
            console.log(response);
            notify('Successful Operation', 'success')
        }
    }
    let checkoutFormik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: '',
        },
        onSubmit: handleSubmit
    })
    return (
        <>
            <div className="w-50 m-auto py-5">
                <form onSubmit={checkoutFormik.handleSubmit} className='bg-light p-4 card-border-ra'>
                    <label htmlFor="details">Details</label>
                    <input onChange={checkoutFormik.handleChange} onBlur={checkoutFormik.handleBlur} type="text" name='details' id='details' className='form-control my-3' />
                    <label htmlFor="phone">Phone</label>
                    <input onChange={checkoutFormik.handleChange} onBlur={checkoutFormik.handleBlur} type="text" name='phone' id='phone' className='form-control my-3' />
                    <label htmlFor="city">City</label>
                    <input onChange={checkoutFormik.handleChange} onBlur={checkoutFormik.handleBlur} type="text" name='city' id='city' className='form-control my-3' />
                    <button type='submit' className='btn bg-main w-100 text-white'>Pay</button>
                </form>
            </div>
        </>
    )
}


