import React from 'react'
import Slider from "react-slick";
import slide1 from "../../images/sliders/grocery-banner.png";
import slide2 from "../../images/sliders/grocery-banner-2.jpeg";
import slide3 from "../../images/sliders/slider-2.jpeg";
export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };
    return (
        <>
            <div className="my-3 container-fluid radios">
                <Slider {...settings}>
                    <img  src={slide1} alt="" />
                    <img src={slide2} alt="" />
                    <img className='sider-img' src={slide3} alt="" />
                </Slider>
            </div>
        </>
    )
}
