import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { notify } from '../Utils/notify'; 

export default function Product({ Products }) {
    let { addToCart ,getCartCount } = useContext(StoreContext)
    async function addProduct(productId) {
        let token = localStorage.getItem('token')
        if (token) {
            let response = await addToCart(token, productId)
            if (response.status==200) {
                getCartCount()
                notify('Product added successfully' , 'success')
            }
            console.log(response);
        } else {
            alert('You Are Not LoggedIn')
        }

    }

    return (
        <>
            {Products.map((item) => {
                return <div key={item._id} className="col-md-3 my-4 overflow-hidden">
                    <div className="product bg-light p-4 card-border-ra">
                        <Link to={'/product-details/' + item._id}>
                            <img src={item.imageCover} height={330} width={220} className='' alt="" />
                            <h6 className='text-main mt-2'>{item.category.name}</h6>
                            <p className='fw-bolder'>{item.title.split(' ').slice(0, 2).join(' ')} </p>
                            <div className='d-flex justify-content-between align-items-center my-4'>
                                <span>{item.price} EGP</span>
                                <div>
                                    <i className='fas fa-star rating-color'></i>
                                    {item.ratingsAverage}
                                </div>
                            </div>
                        </Link>
                        <button onClick={() => addProduct(item._id)} className='btn bg-main text-white w-100' >Add To Cart</button>
                    </div>
                </div>
            })}
        </>
    )
}
