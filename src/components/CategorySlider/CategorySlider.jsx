import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../Utils/baseUrl'
import Slider from "react-slick";



export default function CategorySlider() {
    const [categories, setCategories] = useState([])
    const getAllCategories = async () => {
        let { data } = await axios.get(`${baseUrl}/categories`)
        setCategories(data.data)
    }
    useEffect(() => {
        getAllCategories()
    }, [])

    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: false,
        autoplay:true,
    };

    return (
        <>
            <div className='my-5 container'>
                <h3>Shop Popular Categories</h3>
                <Slider {...settings} autoplaySpeed={3000}>
                    {categories.map((item) => {
                        return <div key={item._id}>
                            <img src={item.image} className='w-100' height={220} alt='' />
                            <h6 className='my-2'>{item.name}</h6>
                        </div>
                    })}
                </Slider>

            </div>
        </>
    )
}
