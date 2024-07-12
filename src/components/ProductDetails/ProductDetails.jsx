import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../Utils/baseUrl'
import Slider from 'react-slick'


export default function ProductDetails() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,

    };

    let { id } = useParams()

    const [Product, setProduct] = useState([])
    const getProduct = async () => {
        let { data } = await axios.get(`${baseUrl}/products/${id}`)
        setProduct(data.data)
    }
    useEffect(() => {
        getProduct()
    }, [])

    return (
        <>

            <div className="container">
                <div className="row product-detail">
                    <div className="col-md-4">

                        <Slider {...settings}>
                            {Product?.images?.map((img) => <img className='product-detail-img overflow-hidden' src={img} />)}
                        </Slider>
                    </div>
                    <div className="col-md-8 p-5">
                        <h3 className='fw-bold'>{Product.title}</h3>
                        <h5 className='text-main'>{Product.description}</h5>
                        <div className='d-flex justify-content-between align-items-center my-4'>
                            <span>{Product.price} EGP</span>
                            <div>
                                <i className='fas fa-star rating-color'></i>
                                {Product.ratingsAverage}
                            </div>
                        </div>
                        <span className='product-detail-quantity '>There are:  {Product.quantity} of pieces</span>
                    </div>
                </div>
            </div>
        </>
    )
}
